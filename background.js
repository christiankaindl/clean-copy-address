async function copyCleanAddressUrl (tabId) {
  const currentTab = await browser.tabs.query({
    currentWindow: true,
    active: true
  })

  // Regex from https://stackoverflow.com/questions/8206269/how-to-remove-http-from-a-url-in-javascript
  let cleanUrl = currentTab[0].url.replace(/(^\w+:|^)\/\//, '')

  if (cleanUrl.startsWith('www.')) {
    cleanUrl = cleanUrl.replace('www.', '')
  }

  try {
    console.log('Copying URL...', cleanUrl)
    await navigator.clipboard.writeText(cleanUrl)
    console.log('Done!')
  } catch (error) {
    console.error('Could not copy to clipboard', error)
  }
}

browser.pageAction.onClicked.addListener(copyCleanAddressUrl)
