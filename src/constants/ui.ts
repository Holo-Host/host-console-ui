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

export interface PaidHostingWizardStep {
  id: number
  title: string
  description: string
  backButtonLabel?: string
  nextButtonLabel?: string
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
