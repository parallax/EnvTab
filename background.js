/* global browser,URL */
var theme = {
  'images': {
    'headerURL': ''
  },
  'colors': {
    'accentcolor': '#fff',
    'textcolor': '#000',
    'toolbar': 'rgba(255,0,0, 1)'
  }
}

browser.tabs.onActivated.addListener(async (activeInfo) => {
  await browser.tabs.get(activeInfo.tabId, async (tab) => {
    let host = new URL(tab.url)
    host = host.hostname.toString()
    var tabColor = ''
    if (host.includes('.localhost') || host.includes('.expose.app') || host.includes('.local')) {
      tabColor = 'rgb(0, 255, 0, 0.1)'
    }
    if (host.includes('.qa.prlx.io') || host.includes('.qa.parall.ax')) {
      tabColor = 'rgb(0, 0, 255, 0.1)'
    }
    if (host.includes('.production.prlx.io') || host.includes('.exposecms.com') || host.includes('.prod.prlx.io')) {
      tabColor = 'rgb(255, 0, 0, 0.1)'
    }
    theme.colors.toolbar = tabColor
    await browser.theme.update(tab.windowId, theme)
  })
})
