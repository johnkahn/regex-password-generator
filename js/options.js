chrome.storage.sync.get('regex', function({ regex }) {
  $('#regex').val(regex);
});

$('#regex').keydown(function() {
  $('.error').css('opacity', '0');
  $('.success').css('opacity', '0');
});

$('#submit').click(function() {
  const regex = $('#regex').val();

  if (regex.length === 0) {
    $('.error').css('opacity', '1');
    return;
  }

  chrome.storage.sync.set({ regex }, function() {
    $('.success').css('opacity', '1');
  });
});
