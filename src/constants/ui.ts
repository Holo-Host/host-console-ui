import type { MappedHApp } from '@/types/types'
import { Error } from '@/types/types'

export const kSortOptions = {
  alphabetical: {
    label: 'Alphabetical',
    value: 'alphabetical'
  },
  earnings: {
    label: 'Highest earnings',
    value: 'earnings'
  }
}

export interface PricesProp {
  cpu: number | null
  dataTransfer: number | null
}

export interface HAppsProp {
  hApps: MappedHApp[]
}

export interface ProgressProp {
  progressValue: number
}

export interface PaidHostingWizardStep {
  id: number
  title?: string
  description?: string
  backButtonLabel?: string
  nextButtonLabel?: string
  props: PricesProp | HAppsProp | ProgressProp
  isDismissible: boolean
  hasCloseButton: boolean
}

export function isPricesPropPredicate(target: PricesProp | unknown): target is PricesProp {
  return target !== undefined
}

export function isHAppsPropPredicate(target: HAppsProp | unknown): target is HAppsProp {
  return target !== undefined
}

export function isProgressPropPredicate(target: ProgressProp | unknown): target is ProgressProp {
  return target !== undefined
}

export enum EModal {
  welcome = 'welcome',
  redemption_initiated = 'redemption_initiated',
  go_to_springboard = 'go_to_springboard',
  error_modal = 'error_modal',
  loading_modal = 'loading_modal'
}

export const kMsInSecond = 1000
export const kDefaultDateTimeFormat = 'DD MMM YYYY hh:mm UTC'

export const kDefaultAnimationDuration = 300
