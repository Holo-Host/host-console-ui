const translations = {
  $: {
    app_version: '{app} version {version}',
    cancel: 'Cancel',
    confirm: 'Confirm',
    continue: 'Continue',
    close: 'Close',
    dont_show_this_message_again: "Don't show this message again",
    error: 'Error',
    errors: {
      email: 'Please enter a valid email.',
      email_does_not_exist:
        'The email you provided does not exist in our database. Please register first.',
      generic_header: 'Oops, looks like we can’t fetch this data right now.',
      invalid_email: 'You have entered an invalid e-mail address. Please try again.',
      login_failed:
        'There was a problem logging you in. Please check your credentials and try again.',
      password: 'Password must have at least 6 characters.',
      try_refreshing: 'Try refreshing the page.',
      unexpected: 'An unexpected error occurred{error}'
    },
    go: 'Go',
    go_to_holofuel: 'Go to HoloFuel',
    host_console: 'Host Console',
    hosted_by: 'Hosted by',
    holo: 'HOLO',
    holoport: 'HoloPort',
    holofuel: 'HoloFuel',
    identicon_click:
      'Clicking on an identicon will copy the associated address for easy transacting in HoloFuel.',
    identicon_explanation:
      'This Identicon design and hash ID are both unique representations of this Host Console and associated HoloFuel address. Consider this address like a bank account, or crypto wallet. When you see this identicon, you know it’s your account.',
    language: {
      en: 'English',
      pl: 'Polski'
    },
    learn_more: 'Learn more',
    login: 'Login',
    logging_out: 'Logging out...',
    logout: 'Logout',
    network: 'Network',
    page_not_found: "Hmm... We're unable to find that page.",
    tip: 'TIP:',
    try_again: 'Try again',
    your_email: 'Your email'
  },
  holofuel_modal: {
    description:
      'HoloFuel will open in another tab, and you will already be logged in since it uses your same hash ID as Host Console. If you log out of one, you log out of both.'
  },
  login: {
    controlling_your_data: 'about controlling your own data.',
    email: 'Email:',
    password: 'Password:',
    password_reminder:
      '*Remember, Holo doesn’t store your password so we can’t recover it for you. Please save your password securely!',
    subtitle: 'published by Holo',
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
  welcome_modal: {
    first_paragraph:
      'When you registered and configured your HoloPort, that included coupling it with an associated HoloFuel account.',
    input_placeholder: 'Enter Account Display Name',
    second_paragraph:
      'Give these associated accounts an Account Display Name. This will show up on invoices and transactions between you and other HoloFuel users. You will NOT be able to change the name once saved.',
    step_one_button_label: 'Save',
    step_one_title: 'Welcome to Host Console',
    step_two_button_label: 'I understand',
    step_two_title: 'Your Address & Identity'
  }
}

export default translations
