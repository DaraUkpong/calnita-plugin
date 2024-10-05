(function () {
  var iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3000";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "340px";
  iframe.style.height = "400px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.background = "transparent";
  document.body.appendChild(iframe);
})();
