chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ regex: '[a-z0-9]{6}-[a-z0-9]{6}-[a-z0-9]{6}' });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '.*' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

function setIcon(icon, tabId) {
  chrome.pageAction.setIcon({
    tabId,
    path: 'icons/' + icon + '-icon32.png',
  });
}

chrome.runtime.onMessage.addListener(function(req) {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },
    function(tabs) {
      setTimeout(function() {
        setIcon(req.icon, tabs[0].id);
      }, req.timeout || 0);
    }
  );
});
