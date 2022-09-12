import commonTranslations from '@uicommon/locales/en'

const translations = {
  $: {
    ...commonTranslations.$,
    app_name: 'Host Console',
    identicon_explanation:
      'This Identicon design and hash ID are both unique representations of this Host Console and associated HoloFuel address. Consider this address like a bank account, or crypto wallet. When you see this identicon, you know it’s your account.'
  },
  holofuel_modal: {
    ...commonTranslations.holofuel_modal
  },
  login: {
    ...commonTranslations.login,
    title: 'Host Console Login'
  },
  settings: {
    account_display_name: 'Account Display Name',
    device_name: 'Device Name',
    device_name_placeholder: 'Enter Account Device Name',
    factory_reset: 'Factory Reset',
    holofuel_address: 'HoloFuel Address',
    hpos_version: 'HPOS Version',
    ssh_access: 'Access for HoloPort support (SSH)'
  },
  usage: {
    daily_snapshot: 'Daily Snapshot',
    title: 'Usage',
    total_happs_hosted: 'Total hApps hosted',
    total_source_chains_hosted: 'Total source chains hosted'
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
    error: 'Oops, looks like we could not update the display name. Please try again.'
  }
}

export default translations
