chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'I\'m Feeling Lucky',
    contexts:['selection'],
    id: 'im-feeling-lucky'
  })
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  var url = "http://www.google.com/search?q=" + encodeURI(text) + "&btnI=Im+Feeling+Lucky";
  navigate(url, {newtab: false});
});

chrome.contextMenus.onClicked.addListener(function(info) {
  var url = 'http://www.google.com/search?q=' + encodeURI(info.selectionText) +'&btnI=Im+Feeling+Lucky';
  navigate(url, {newtab: true});
})

function navigate(url, opts) {
  if(opts.newtab) {
    chrome.tabs.create({
      url: url,
      active: false
    })
  } else if (!opts.newtab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.update(tabs[0].id, {url: url});
    });
  }
}
