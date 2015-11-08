//Creaters: Bogdan Pshonyak & Mark Muego

console.log("content initiated");

function getSel() {
  // get selection text
  var sel = window.getSelection().toString();
  // get all text in element
  var all = window.getSelection().getRangeAt(0).commonAncestorContainer;

  // change shit
  // all.data = sel;

  var words;

  $.post("https://rewordify.com/rwprocess.php", {
      s: sel
    },
    function(data, status) {
      console.log(JSON.parse(data));
      words = JSON.parse(data).UniqueList1;
      replaceText(all, sel, words);
    });

  // if (all) {
  //   chrome.extension.sendRequest({
  //     msg: 'data',
  //     sel: sel
  //   });
  // }
}

// The replace text method
function replaceText(allText, sel, replacement) {

  var processedText = null;

  if (allText.nodeType === 3) {
    processedText = allText.data;
  } else {
    processedText = allText.innerHTML;
  }


  //search for replacement text!
  // console.log(allText);
  // console.log(sel);
  // console.log(replacement);

  for (var i = 0; i < replacement.length; i++) {
    // console.log(replacement[i]);
    var twoWords = replacement[i].split("=");
    // console.log(twoWords);
    var re = new RegExp(twoWords[0],"gi");
    var newText =
      "<span style='background-color: #FFFF00'>" + twoWords[1] + "</span>";
    processedText = processedText.replace(re, newText);
  }

  // search DOM and replace text with easy to read text
  // console.log(processedText);
  // allText.data = processedText;
  console.log( processedText );
  allText.parentNode.innerHTML = processedText ;
  // allText.parentNode.innerHTML =  "testing <strong>" + sel + "</strong>";

  // var elements = document.getElementsByTagName('*');
  //
  // for (var i = 0; i < elements.length; i++) {
  //   var element = elements[i];
  //
  //   for (var j = 0; j < element.childNodes.length; j++) {
  //     var node = element.childNodes[j];
  //
  //     if (node.nodeType === 3) {
  //       var text = node.nodeValue;
  //
  //       // all matching words
  //       var replacedText = text.replace(/searchText/gi, ' Bogdan ');
  //
  //       if (replacedText !== text) {
  //         element.replaceChild(document.createTextNode(replacedText), node);
  //       }
  //     }
  //   }
  // }
}
