<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import BaseSearchInput from '@uicommon/components/BaseSearchInput.vue'
import BaseTable from '@uicommon/components/BaseTable.vue'
import CircleSpinner from '@uicommon/components/CircleSpinner.vue'
import { useFilter } from '@uicommon/composables/useFilter'
import { useModals } from '@uicommon/composables/useModals'
import { ESpinnerSize } from '@uicommon/types/ui'
import { encodeAgentId, decodeAgentId } from '@uicommon/utils/agent'
import { formatCurrency } from '@uicommon/utils/numbers'
import dayjs from 'dayjs'
import { unparse } from 'papaparse'
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import InvoicesTableRow from '@/components/invoices/InvoicesTableRow.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { EModal } from '@/constants/ui'
import { useHposInterface } from '@/interfaces/HposInterface'
import { kRoutes } from '@/router'
import { useDashboardStore } from '@/store/dashboard'
import { useEarningsStore } from '@/store/earnings'
import { isError as isErrorPredicate } from '@/types/predicates'
import type { BreadCrumb } from '@/types/types'
import { saveCsvToClient } from '@/utils/csvExportUtils'
import { formatDate } from '@/utils/dateUtils'

const { t } = useI18n()
const router = useRouter()

const isLoading = ref(false)
const isError = ref(false)
const isDownloadingServiceLogs = ref(false)

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal, hideModal } = useModals()

const earningsStore = useEarningsStore()
const dashboardStore = useDashboardStore()
const { getServiceLogs } = useHposInterface()

const isPaidInvoices = computed(() => router.currentRoute.value.name === kRoutes.paidInvoices.name)

const headersMap = computed(
  () =>
    new Map([
      [
        'happ',
        {
          key: 'happ',
          label: t('invoices.headers.happ'),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'string'
        }
      ],
      [
        'counterparty',
        {
          key: 'counterparty',
          label: t('invoices.headers.publisher'),
          isVisibleOnMobile: false,
          isSortable: true,
          type: 'string'
        }
      ],
      [
        isPaidInvoices.value ? 'completedDate' : 'createdDate',
        {
          key: isPaidInvoices.value ? 'completedDate' : 'createdDate',
          label: t(
            isPaidInvoices.value ? 'invoices.headers.completed' : 'invoices.headers.created'
          ),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'date'
        }
      ],
      [
        'expirationDate',
        {
          key: 'expirationDate',
          label: t('invoices.headers.due'),
          isVisibleOnMobile: false,
          isSortable: true,
          type: 'date'
        }
      ],
      [
        'formattedId',
        {
          key: 'formattedId',
          label: t('invoices.headers.invoice'),
          isVisibleOnMobile: false,
          isSortable: true,
          type: 'string'
        }
      ],
      [
        'amount',
        {
          key: 'amount',
          label: t('invoices.headers.amount'),
          isVisibleOnMobile: true,
          isSortable: true,
          align: 'end'
        }
      ],
      [
        'status',
        {
          key: 'payment_status',
          label: t('invoices.headers.payment_status'),
          isVisibleOnMobile: true,
          isSortable: false,
          type: 'string'
        }
      ]
    ])
)

const kMsInSecond = 1000
const kDefaultDateFormat = 'DD MMM YYYY'
const kVisibleHashLength = 6

const invoices = computed(() => {
  const rawInvoices = isPaidInvoices.value
    ? earningsStore.paidInvoices
    : earningsStore.unpaidInvoices

  return Array.isArray(rawInvoices)
    ? rawInvoices.map((invoice) => ({
        ...invoice,
        formattedId: `...${invoice.id.substring(invoice.id.length - kVisibleHashLength)}`,
        happ: invoice.happ.name,
        formattedExpirationDate: dayjs(new Date(invoice.expirationDate / kMsInSecond)).format(
          kDefaultDateFormat
        ),
        amount: Number(invoice.amount),
        formattedCompletedDate: dayjs(invoice.completedDate / kMsInSecond).format(
          kDefaultDateFormat
        ),
        formattedCreatedDate: dayjs(invoice.createdDate / kMsInSecond).format(kDefaultDateFormat),
        formattedAmount:
          invoice.amount && Number(invoice.amount) ? formatCurrency(Number(invoice.amount)) : 0,
        status: t(isPaidInvoices.value ? 'invoices.status.paid' : 'invoices.status.unpaid')
      }))
    : []
})

// Filtering
const isFilteringEnabled = computed(
  (): boolean => !isLoading.value && !isError.value && invoices.value.length > 0
)

enum EFilterType {
  string,
  number
}

interface FilterCriteria {
  key: string
  type: EFilterType
  minLength: number
  exact: boolean
}

const kFilterCriteria: FilterCriteria[] = [
  {
    key: 'happ',
    type: EFilterType.string,
    minLength: 3,
    exact: false
  },
  {
    key: 'counterparty',
    type: EFilterType.string,
    minLength: 15,
    exact: true
  },
  {
    key: 'id',
    type: EFilterType.string,
    minLength: 15,
    exact: true
  },
  {
    key: 'amount',
    type: EFilterType.number,
    minLength: 3,
    exact: false
  }
]

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { filteredData, setFilter, filterValue } = useFilter({
  data: invoices,
  criteria: kFilterCriteria
})

const pageHeaderTranslationKey = computed((): string =>
  isPaidInvoices.value ? 'earnings.paid_invoices' : 'earnings.unpaid_invoices'
)

const emptyMessageTranslationKey = computed((): string =>
  isPaidInvoices.value ? 'invoices.errors.no_paid_invoices' : 'invoices.errors.no_unpaid_invoices'
)

const breadcrumbs = computed((): BreadCrumb[] => [
  {
    label: t('$.earnings'),
    path: '/earnings'
  },
  {
    label: t(isPaidInvoices.value ? 'earnings.paid_invoices' : 'earnings.unpaid_invoices')
  }
])

async function getInvoices(): Promise<void> {
  isError.value = false
  isLoading.value = true

  const rawInvoices = isPaidInvoices.value
    ? await earningsStore.getPaidInvoices()
    : await earningsStore.getUnpaidInvoices()

  isLoading.value = false

  if (!rawInvoices) {
    isError.value = true
  }
}

function createExportFilename(): string {
  const date = formatDate(new Date(), 'YYYY-MM-DD')
  return `service-logs-${date}.csv`
}

function mapActivityLog(log): Record<string, unknown> {
  return {
    // eslint-disable @typescript-eslint/naming-convention
    'request.agent_id': encodeAgentId(log.request.agent_id) || '',
    'request.request.host_id': log.request.request.host_id || '',
    'request.request.timestamp': log.request.request.timestamp,
    'request.request.call_spec.args_hash': `${log.request.request.call_spec.args_hash}` || '',
    'request.request.call_spec.function': log.request.request.call_spec.function || '',
    'request.request.call_spec.hha_hash':
      encodeAgentId(log.request.request.call_spec.hha_hash) || '',
    'request.request.call_spec.role_name': log.request.request.call_spec.role_name || '',
    'request.request.call_spec.zome': log.request.request.call_spec.zome || '',
    'request.request.hha_pricing_pref': encodeAgentId(log.request.request.hha_pricing_pref) || '',
    'request.request.request_signature': encodeAgentId(log.request.request_signature) || '',
    'response.host_metrics.bandwidth': log.response.host_metrics.bandwidth || '',
    'response.host_metrics.cpu': log.response.host_metrics.cpu || '',
    'response.weblog_compat.source_ip': log.response.weblog_compat.source_ip || '',
    'response.weblog_compat.status_code': log.response.weblog_compat.status_code || ''
    // eslint-enable @typescript-eslint/naming-convention
  }
}

async function downloadServiceLogs(): Promise<void> {
  let timeout = null

  isDownloadingServiceLogs.value = true
  timeout = setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    showModal(EModal.loading_modal, { description: t('download_service_logs.loading_message') })
  }, 3000)

  if (dashboardStore.hostedHApps.length === 0) {
    await dashboardStore.getHostedHApps()
  }

  if (isErrorPredicate(dashboardStore.hostedHApps)) {
    isError.value = true
    isDownloadingServiceLogs.value = false
    clearTimeout(timeout)
    timeout = null
    hideModal()
  } else {
    const hAppsIds = dashboardStore.hostedHApps.map((hApp) => hApp.id)
    const rawLogs = await getServiceLogs(hAppsIds)

    const csv = unparse(
      rawLogs.map((log) => {
        return mapActivityLog(Object.values(log)[0])
      })
    )

    saveCsvToClient(createExportFilename(), csv)

    isDownloadingServiceLogs.value = false
    clearTimeout(timeout)
    timeout = null
    hideModal()
  }
}

onMounted(async (): Promise<void> => {
  await getInvoices()
})
</script>

<template>
  <PrimaryLayout
    :title="$t(pageHeaderTranslationKey)"
    :breadcrumbs="breadcrumbs"
    data-test-invoices-page-layout
  >
    <div
      class="controls"
      data-test-invoices-page-filters
    >
      <BaseSearchInput
        :value="filterValue"
        :is-disabled="!isFilteringEnabled"
        label-translation-key="$.filter_by"
        @update="setFilter"
      />

      <div
        class="service-logs-download"
        :class="{ 'service-logs-download--disabled': isDownloadingServiceLogs }"
        @click="downloadServiceLogs"
      >
        <CircleSpinner
          v-if="isDownloadingServiceLogs"
          :scale="ESpinnerSize.xs"
          class="service-logs-download__icon"
        />
        <ArrowTopRightOnSquareIcon
          v-else
          class="service-logs-download__icon"
        />
        <span class="service-logs-download__label">{{ t('download_service_logs.label') }}</span>
      </div>
    </div>

    <div data-test-invoices-page-table>
      <BaseTable
        v-slot="{ items }"
        :is-loading="isLoading"
        :is-error="isError"
        :headers="[...headersMap.values()]"
        :initial-sort-by="isPaidInvoices ? 'completedDate' : 'createdDate'"
        :items="filteredData"
        :empty-message-translation-key="emptyMessageTranslationKey"
        @try-again-clicked="getInvoices"
      >
        <InvoicesTableRow
          v-for="item in items"
          :key="item.id"
          :is-paid="isPaidInvoices"
          :invoice="item"
        />
      </BaseTable>
    </div>
  </PrimaryLayout>
</template>

<style scoped lang="scss">
.controls {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
  padding-right: 16px;

  .service-logs-download {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-left: 12px;
    cursor: pointer;

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &__icon {
      width: 18px;
      height: 18px;
    }

    &__label {
      margin-left: 4px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: underline;
    }

    &__icon {
      width: 18px;
      height: 18px;
    }

    &__label {
      margin-left: 4px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: underline;
    }
  }
}
</style>
