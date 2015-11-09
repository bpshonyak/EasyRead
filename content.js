// Written by Bogdan Pshonyak & Mark Muego
// for CodeDay Seattle, Fall 2015.

console.log("content initiated");
var head = document.getElementsByTagName('head')[0];
var style = document.createElement("style");
style.innerHTML = ".lmaoTooltip{display: inline;position: relative;}.lmaoTooltip:hover:after{background: #333;background: rgba(0,0,0,.8);border-radius: 5px;bottom: 26px;color: #fff;content: attr(title);left: 20%;padding: 5px 15px;position: absolute;z-index: 98;width: 220px;}.lmaoTooltip:hover:before{border: solid;border-color: #333 transparent;border-width: 6px 6px 0 6px;bottom: 20px;content: '';left: 50%;position: absolute;z-index: 99;}";
head.appendChild(style);

//Gets the text selection as well as the deepest HTML node shared between text
function getSel() {
  // get selection text
  var sel = window.getSelection().toString();
  // get all text in element
  var all = window.getSelection().getRangeAt(0).commonAncestorContainer;
  var words;

  $.post("https://rewordify.com/rwprocess.php", { //magic
      s: sel
    },
    function(data, status) {
      console.log(JSON.parse(data));
      words = JSON.parse(data).UniqueList1;
      replaceText(all, sel, words);
    });
}

// The replace text method
function replaceText(allText, sel, replacement) {

  var processedText = null;

  if (allText.nodeType === 3) {
    processedText = allText.data;
  } else {
    processedText = allText.innerHTML;
  }
  for (var i = 0; i < replacement.length; i++) {
    var twoWords = replacement[i].split("=");
    var re = new RegExp(twoWords[0],"gi");

    if (twoWords[1].search("/") !== -1) {
      //console.log("before:");
      //console.log(twoWords[1]);
      // a slash was found!
      var temp = twoWords[1].split("/");
      if (temp[0].charAt(0) === "(") {
        temp[0] += ')';
      }
      twoWords[1] = temp[0];
      //console.log('after:');
      //console.log(twoWords[1]);
    }

    var newText =
      "<span class='lmaoTooltip' style='background-color: #FFFF00' title='" + twoWords[0] + "'>" + twoWords[1] + "</span>";
    processedText = processedText.replace(re, newText);
  }

  //console.log( processedText );
  allText.parentNode.innerHTML = processedText;
}
