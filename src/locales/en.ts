import commonTranslations from '@uicommon/locales/en'

export default {
  $: {
    ...commonTranslations.$,
    app_name: 'Host Console',
    back: 'Back',
    bandwidth: 'Bandwidth',
    cpu: 'CPU',
    dashboard: 'Dashboard',
    date: 'Date',
    days: 'days',
    description: 'Description',
    earnings: 'Earnings',
    generic_error: 'Sorry, we couldn’t fetch this data.',
    happs: 'hApps',
    holo: 'HOLO',
    hosting_preferences: 'Hosting Preferences',
    identicon_explanation:
      'This Identicon design and hash ID are both unique representations of this Host Console and associated HoloFuel address. Consider this address like a bank account, or crypto wallet. When you see this identicon, you know it’s your account.',
    learn_more: 'Learn more',
    logout: 'Logout',
    next: 'Next',
    storage: 'Storage',
    terms_of_service: 'Terms of Service',
    try_again: 'Try again'
  },
  earnings: {
    exceptions: 'Exceptions',
    last_30_days: 'Last 30 days',
    last_7_days: 'Last 7 days',
    last_day: 'Last day',
    paid_invoices: 'Paid Invoices',
    payments: 'Payments',
    redeemable_holofuel: 'Redeemable HoloFuel',
    redeem_holofuel: 'Redeem HoloFuel',
    redemption_history: 'Redemption History',
    title: 'Earnings',
    transfer_holofuel: 'Transfer HoloFuel',
    unpaid_and_late: 'Unpaid & Late Invoices',
    unpaid_invoices: 'Unpaid Invoices',
    weekly_earnings: 'Weekly Earnings'
  },
  happ_details: {
    disable_hosting: 'Disable Hosting',
    disable_hosting_warning:
      'Disabling hosting of a hApp will remove it and all associated data from your HoloPort.',
    disable_hosting_modal: {
      success: {
        title: 'This hApp has been removed from hosting.',
        description:
          'Please note it may take some time for the hApp to be fully removed from your HoloPort. Any hosting provided for storage during that time will be billed to the manager.'
      },
      confirmation_button: 'Yes, disable',
      description_one:
        'It will be removed from your HoloPort and will not be available for you to host again for 30 days.',
      description_two:
        'All invoices, logs and payments associated with this hApp will remain available to you.',
      title: 'Are you sure you want to disable this hApp?'
    },
    enable_hosting: 'Enable Hosting',
    earnings: {
      total: 'Total Earnings',
      last_7_days: 'Earned in last 7 days',
      average_weekly: 'Average weekly earnings'
    },
    seven_day_usage: '7 day usage',
    stop_hosting: 'Stop Hosting',
    stop_hosting_warning:
      'Stopping hosting of a hApp will remove it and all associated data from your HoloPort.',
    total_source_chains: 'Total source chains',
    total_usage: 'Total usage'
  },
  holofuel: {
    balance: 'Balance',
    go_to_holofuel: 'Open HoloFuel',
    redeemable: 'Redeemable',
    redeem_holofuel: 'Redeem HoloFuel',
    title: 'HoloFuel'
  },
  holofuel_modal: {
    ...commonTranslations.holofuel_modal
  },
  hosted_happs: {
    hosted_for: 'Hosted for',
    no_active_happs: 'You’re not hosting any hApps',
    no_inactive_happs: 'You do not have any inactive hApps',
    no_filtered_happs: 'No hApps match your search',
    title: 'Top Hosted hApps'
  },
  hosting_preferences: {
    header: 'Hosting Preferences',
    happ_selection: {
      header: 'hApp Selection',
      jurisdiction_exclusions: 'Jurisdiction Exclusions',
      category_tags: 'Category Tags',
      exclude: 'Exclude',
      include: 'Include'
    },
    invoices: {
      header: 'Invoice & Payment Terms',
      frequency: {
        label: 'Frequency of Invoicing',
        part_one: 'Invoice hApp publishers the earlier of every',
        part_two: 'or when an invoice amount reaches'
      },
      due: {
        label: 'Payment Terms (Net)',
        part_one: 'Payment is due',
        part_two: 'after invoice date'
      },
      note_one: {
        part_one: '*hApps will be paused from hosting if payment is not received',
        part_two: 'after invoice date'
      },
      note_two: {
        part_one: '*hApps will be removed if payment is not received',
        part_two: 'after invoice date'
      }
    },
    prices: {
      header: 'Price Configuration',
      subheader: 'Default Rates'
    }
  },
  invoices: {
    errors: {
      no_paid_invoices: 'You have no paid invoices.',
      no_unpaid_invoices: 'You have no unpaid invoices.'
    },
    headers: {
      amount: 'Amount',
      completed: 'Date Paid',
      created: 'Date Created',
      due: 'Date Due',
      happ: 'hApp',
      invoice: 'Transaction Hash',
      payment_status: 'Payment Status',
      publisher: 'Publisher'
    },
    status: {
      paid: 'Paid',
      unpaid: 'Unpaid'
    }
  },
  login: {
    ...commonTranslations.login,
    title: 'Host Console Login',
    errors: {
      frozen_holochain: 'Holochain appears frozen, try re-loading the page and logging in again'
    }
  },
  recent_payments: {
    title: 'Recent Payments',
    no_payments: 'You have no payments'
  },
  redemption: {
    transaction_price: 'Transaction Price: {hf} HF = {hot} HOT',
    history: {
      errors: {
        no_redemptions: 'You have no redemptions.'
      },
      headers: {
        created: 'Date Submitted',
        hf_amount: 'HF Amount',
        redemption_amount: 'Redemption Amount',
        transaction_id: 'Transaction ID',
        status: 'Status'
      },
      original_requested_amount: 'Original Requested Amount: {amount}'
    },
    redeem_holofuel: {
      available_to_redeem: 'available to redeem.',
      amount_input_label: 'Redemption Amount',
      amount_input_placeholder: 'Enter HF amount',
      amount_input_error: 'Amount exceeds redeemable balance.',
      amount_input_error_minimum_value: 'Minimum redeemable amount is 10 HF',
      amount_input_tip: '*Note: HoloFuel and HOT are currently 1:1',
      confirm_and_redeem: 'Confirm & Redeem',
      errors: {
        redemption_failed: 'Something went wrong, please try again.'
      },
      holo_fuel_amount: 'HF Amount',
      kyc_level_one_notice_part_one: 'Please complete your Level 2 KYC to redeem HoloFuel.',
      kyc_level_one_notice_part_two: 'Upgrade to Level 2',
      partial_redemption_terms:
        'Redemptions are processed first come, first serve. By checking this box, you accept a partial redemption if 1) there isn’t enough HOT in the reserve to fulfill your entire request or 2) the price surpasses the minimum you have chosen.',
      recipient_address_input_label: 'Recipient HOT Address',
      recipient_address_input_placeholder: 'Enter HOT wallet address',
      recipient_address_input_error: 'HOT address not valid, please check it and try again.',
      redemption_amount: 'Redemption Amount',
      redemption_currency: 'Redemption Currency',
      redemption_initiated: 'Redemption Initiated!',
      redemption_price: 'Redemption Price',
      request_id: 'Request ID',
      review_and_confirm: 'Please review and confirm:',
      title: 'Redeem HoloFuel',
      you_have: 'You have'
    }
  },
  settings: {
    account_display_name: 'Account Display Name',
    device_name: 'Device Name',
    device_name_placeholder: 'Enter Account Device Name',
    factory_reset: 'Factory Reset',
    holofuel_address: 'HoloFuel Address',
    hpos_version: 'HPOS Version',
    ssh_access: 'Access for HoloPort support (SSH)',
    header: 'Account Settings',
    verification: {
      current_level: 'Level {level} Verified',
      description:
        'Level 2 verification is required for transactions larger than ~10,000 GBP and other special uses of HoloFuel.',
      holo_kyc_1: 'Level 1',
      holo_kyc_2: 'Level 2',
      label: 'Verification',
      link: 'Complete level {level} verification',
      next_level_descriptions: {
        two: 'As a level 1 user, you are limited to <500 GBP of transactions per month. update your KYC to make more transactions.'
      }
    }
  },
  sidebar: {
    alpha: {
      description:
        'Host Console is in Alpha testing. All references to HF should be interpreted as Test Fuel.',
      short: 'HF = Test Fuel',
      title: 'ALPHA: HoloFuel = Test Fuel'
    }
  },
  springboard: {
    go_to_springboard: 'Go to Springboard',
    description:
      'You’re leaving Host Console to go to Holo Springboard, where you can upgrade your verification.',
    title: 'Holo Springboard'
  },
  usage: {
    daily_snapshot: 'Daily Snapshot',
    title: 'Usage',
    total_happs_hosted: 'Total hApps hosted',
    total_users_hosted: 'Total users hosted',
    users: '{count} user | {count} users'
  },
  welcome_modal: {
    first_paragraph:
      'When you registered and configured your HoloPort, that included coupling it with an associated HoloFuel account.',
    input_placeholder: 'Enter Account Display Name',
    second_paragraph:
      'Give these associated accounts an Account Display Name. This will show up on invoices and transactions between you and other HoloFuel users. You will NOT be able to change the name once saved.',
    step_one_button_label: 'Save',
    step_one_title: 'Welcome to Host Console',
    step_two_button_label: 'I understand',
    step_two_title: 'Your Address & Identity',
    error:
      'Oops, looks like we could not update your display name. Try refreshing this page and if the problem persists, please contact support.'
  }
}
