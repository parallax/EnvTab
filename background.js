/* global browser,URL */
var theme = {
  'colors': {
    'accentcolor': 'rgba(22, 22, 22)',
    'textcolor': 'black',
    'popup': "#4a4a4f",
    'popup_text': "rgb(249, 249, 250)",
    'popup_border': "#27272b",
    'toolbar_field_text': "black",
  }
}


browser.tabs.onActivated.addListener(async (activeInfo) => {
  await browser.tabs.get(activeInfo.tabId, async (tab) => {
    let host = new URL(tab.url)
    host = host.hostname.toString()
    var tabColor = ''
    if (host.includes('.localhost') || host.includes('.expose.app') || host.includes('.local')) {
      tabColor = '#C8E6C9'
    }
    if (host.includes('.qa.prlx.io') || host.includes('.qa.parall.ax')) {
      tabColor = '#BBDEFB'
    }
    if (host.includes('.production.prlx.io') || host.includes('.exposecms.com') || host.includes('.prod.prlx.io')) {
      tabColor = '#FFCCBC'
    }
    theme.colors.accentcolor = tabColor
    if (tabColor == '') {
        await browser.theme.reset(tab.windowId)
    } else {
        await browser.theme.update(tab.windowId, theme)
    }
  })
})
