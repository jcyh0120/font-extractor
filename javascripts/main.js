var convertButton = document.getElementById("convert");
var downloadButton = document.getElementById("download");
var fileInput = document.getElementById("fileInput");
var filetypeJson = { checked: true };

var font;

window.onload = function() {};

downloadButton.onclick = function() {
  var charset = document.getElementById("charset");
  if (charset.textContent === "輸出結果") return;

  exportString(charset.textContent, font.familyName + "_" + font.styleName + ".txt");
};

convertButton.onclick = function() {
  [].forEach.call(fileInput.files, function(file) {
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function(event) {
        font = opentype.parse(event.target.result);
        var result = convert(font);

        var totalCount = document.getElementById("totalCount");
        totalCount.textContent = result.length;

        var charset = document.getElementById("charset");
        charset.textContent = result;

        // exportString(
        //   result,
        //   font.familyName +
        //     "_" +
        //     font.styleName +
        //     (filetypeJson.checked ? ".json" : ".js")
        // );
      },
      false
    );
    reader.readAsArrayBuffer(file);
  });
};

var exportString = function(output, filename) {
  var blob = new Blob([output], { type: "text/plain" });
  var objectURL = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = objectURL;
  link.download = filename || "data.json";
  link.target = "_blank";
  //link.click();

  var event = document.createEvent("MouseEvents");
  event.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  link.dispatchEvent(event);
};

var convert = function(font) {
  var result = "";

  font.glyphs.forEach(function(glyph) {
    if (glyph.unicode !== undefined) {
      result += String.fromCharCode(glyph.unicode);
    }
  });

  return result;
};
