//Creaters: Bogdan Pshonyak & Mark Muego

var selText;

// The onClicked callback function.
function onClickHandler(info, tab) {

  chrome.tabs.executeScript(
    tab.id, {
      code: 'getSel()',
      allFrames: true
    },
    function() {
      //do anything with selText
      //console.log("selText: " + selText);
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

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  // console.log("About to try creating an invalid item - an error about " +
  //   "duplicate item child1 should show up");
  // chrome.contextMenus.create({
  //   "title": "Oops",
  //   "id": "child1"
  // }, function() {
  //   if (chrome.extension.lastError) {
  //     console.log("Got expected error: " + chrome.extension.lastError.message);
  //   }
  // });
});
