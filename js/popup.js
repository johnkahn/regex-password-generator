var bg = chrome.extension.getBackgroundPage();

chrome.storage.sync.get('regex', function({ regex }) {
  chrome.runtime.sendMessage({ icon: 'lock' });

  var copyPassword = $('#copyPassword')
    .val(new RandExp(new RegExp(regex)).gen())
    .select();

  document.execCommand('copy');

  copyPassword.val('');

  chrome.runtime.sendMessage({ icon: 'unlock', timeout: 500 });

  window.close();
});
