// Written by Bogdan Pshonyak & Mark Muego
// for CodeDay Seattle, Fall 2015.

var selText;

// The onClicked callback function.
function onClickHandler(info, tab) {

  chrome.tabs.executeScript(
    tab.id, {
      code: 'getSel()',
      allFrames: true
    }
  );
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var context = "selection";
  var title = "Simplify Text!";
  var id = chrome.contextMenus.create({
    "title": title,
    "contexts": [context],
    "id": "context" + context
  });
  console.log("'" + context + "' item:" + id);
});
