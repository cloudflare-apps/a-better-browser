import browser from 'detect-browser'
import translations from './translations'

(function () {
  let options = INSTALL_OPTIONS
  let appElement
  const {localStorage} = window
  const DAY_DURATION = 1000 * 60 * 60 * 24
  const now = new Date()
  const weekAgo = new Date(now - DAY_DURATION * 7)
  const language = window.navigator.language || window.navigator.userLanguage || 'en'
  const [messageLabel, moreLabel] = translations[language] || translations[language.substring(0, 2)] || translations.en

  function updateElement () {
    const browserVersion = parseFloat(browser.version.match(/(\d.)\./))
    const browserMinimum = options[browser.name] || 0
    const outdated = browserVersion < browserMinimum
    const seenRecently = localStorage.dismissedAt && weekAgo >= new Date(parseInt(localStorage.dismissedAt, 10))
    let visibility = !seenRecently && outdated ? 'visible' : 'hidden'

    appElement = INSTALL.createElement({selector: 'body', method: 'prepend'}, appElement)
    appElement.setAttribute('app-id', 'a-better-browser')
    appElement.innerHTML = `
      <cloudflare-app-message>
        ${messageLabel}
        <a href="https://www.whatbrowser.org/intl/${language}/" target="_blank">${moreLabel}</a>
        </cloudflare-app-message>
      <cloudflare-app-close>&times;</cloudflare-app-close>
    `

    const closeButton = appElement.querySelector('cloudflare-app-close')

    closeButton.addEventListener('click', () => {
      appElement.setAttribute('data-visibility', 'hidden')
      localStorage.dismissedAt = now.getTime()
    })

    if (INSTALL_ID === 'preview') visibility = 'visible'

    appElement.setAttribute('data-visibility', visibility)

    document.body.setAttribute('data-cf-browser-state', outdated ? 'outdated' : 'modern')
    document.body.setAttribute('data-cf-browser-version', browserVersion)
    document.body.setAttribute('data-cf-browser-name', browser.name)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
  }

  window.INSTALL_SCOPE = {
    setOptions (nextOptions) {
      options = nextOptions
      updateElement()
    }
  }
}())
