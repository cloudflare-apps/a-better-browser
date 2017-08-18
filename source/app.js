import browser from 'detect-browser'
import translations from './translations'

(function () {
  let options = INSTALL_OPTIONS
  let appElement
  const {localStorage = {}} = window
  const DAY_DURATION = 1000 * 60 * 60 * 24
  const now = new Date()
  const weekAgo = new Date(now - DAY_DURATION * 7)
  const seenRecently = localStorage.cfBetterBrowserDismissedAt && new Date(parseInt(localStorage.cfBetterBrowserDismissedAt, 10)) >= weekAgo

  const browserVersion = parseFloat(browser.version.match(/^(\d+\.?\d*)/))
  const browserMinimum = options[browser.name] || 0

  const legacyBodyClass = 'cloudflare-old-browser-body'

  function removeBodyClass () {
    document.body.className = document.body.className.replace(new RegExp(`(?:^|s)${legacyBodyClass}(?!S)`, 'g'), '')
  }

  function updateElement () {
    const outdated = browserVersion < browserMinimum
    let visibility = !seenRecently && outdated ? 'visible' : 'hidden'

    removeBodyClass()
    if (INSTALL_ID === 'preview') visibility = 'visible'
    if (visibility !== 'visible') return

    const language = window.navigator.language || window.navigator.userLanguage || 'en'
    const [messageLabel, moreLabel] = translations[language] || translations[language.substring(0, 2)] || translations.en

    appElement = appElement || document.createElement('cloudflare-app')
    appElement.setAttribute('app', 'a-better-browser')
    appElement.id = 'cloudflare-old-browser' // Legacy ID

    appElement.innerHTML = `
      <cloudflare-app-message>
        ${messageLabel}
        <a href="https://www.whatbrowser.org/intl/${language}/" target="_blank">${moreLabel}</a>
        </cloudflare-app-message>
      <cloudflare-app-close>&times;</cloudflare-app-close>
    `
    const closeButton = appElement.querySelector('cloudflare-app-close')
    closeButton.id = 'cloudflare-old-browser-close' // Legacy ID

    closeButton.addEventListener('click', () => {
      appElement.setAttribute('data-visibility', 'hidden')
      localStorage.cfBetterBrowserDismissedAt = now.getTime()
      removeBodyClass()
    })

    appElement.setAttribute('data-visibility', visibility)
    document.body.appendChild(appElement)

    document.body.className += legacyBodyClass
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
