const q = s => document.querySelector(s)
const qa = s => Array.from(document.querySelectorAll(s))
const click = s =>
  qa(s).forEach(el => el.dispatchEvent(new MouseEvent('click')))
const input = (s, value) => qa(s).forEach(el => (el.value = value))
const scrollIntoView = selector =>
  qa(selector).forEach(element => element.scrollIntoView())

const inputDefs = [
  {
    key: 'start',
    name: 'selectStartStation',
  },
  {
    key: 'dest',
    name: 'selectDestinationStation',
  },
  {
    key: 'date',
    name: 'toTimeInputField',
  },
  {
    key: 'time',
    name: 'toTimeTable',
  },
  {
    key: 'numberTickets',
    name: 'ticketPanel:rows:0:ticketAmount',
  },
  {
    key: 'captcha',
    name: 'homeCaptcha:securityCode',
  },
  {
    key: 'nationalId',
    id: 'idNumber',
  },
  {
    key: 'phoneNumber',
    id: 'mobilePhone',
  },
  {
    key: 'email',
    name: 'email',
  },
  {
    type: 'checkbox',
    key: 'member',
    name: 'memberSystemCheckBox',
  },
  {
    key: 'memberId',
    id: 'msNumber',
  },
  {
    type: 'checkbox',
    key: 'agreeTerms',
    name: 'agree',
  },
  {
    type: 'submit',
    key: 'confirmBooking',
    selector: '[value="完成訂位"]',
  },
]

const secrets = {
  nationalId: 'A123456789',
  phone: '0987654321',
  mail: 'thsrc@thsrc.com.tw',
  memberId: 'A123456789',
}

const data = [
  {
    start: 12,
    dest: 2,
    date: '2020/11/15',
    time: '100P',
    numberTickets: '2F',
    ...secrets,
  },
  {
    start: 1,
    dest: 12,
    date: '2020/11/13',
    time: '630P',
    numberTickets: '2F',
    ...secrets,
  },
]

const getSelector = ({id, name, selector}) =>
  id ? `#${id}` : name ? `[name="${name}"]` : selector

const fillForm = (definitions, data) => {
  definitions.forEach(({type, key, ...args}) => {
    const selector = getSelector(args)
    if (type === 'checkbox') {
      click(selector)
    } else if (type === 'submit') {
      scrollIntoView(selector)
    } else if (data[key]) {
      input(selector, data[key])
    }
  })
}

const state = {
  index: 0,
}

const alternate = () => {
  fillForm(inputDefs, data[state.index])
  state.index = (state.index + 1) % data.length
}

const autoSubmit = ({target: {value}}) =>
  value.length == 5 && click(`[name="SubmitButton"]`)

const main = () => {
  alternate()
  window.addEventListener('keypress', e => {
    if (e.key === '`') alternate()
  })

  const captcha = q(`[name="homeCaptcha:securityCode"]`)
  Object.assign(captcha.style, {
    fontSize: '700%',
    position: 'fixed',
    top: '10%',
    left: '40%',
  })
  captcha.addEventListener('input', autoSubmit)
  captcha.focus()
}
main()
