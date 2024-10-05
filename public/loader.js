(function () {
  // Create the launcher image element (unchanged from previous version)
  var launcherImage = document.createElement("img");
  launcherImage.id = "widget-launcher";
  launcherImage.src = "http://localhost:3000/widget-icon.png";
  launcherImage.alt = "Open Widget";
  launcherImage.style.position = "fixed";
  launcherImage.style.bottom = "20px";
  launcherImage.style.right = "20px";
  launcherImage.style.width = "72px";
  launcherImage.style.height = "72px";
  launcherImage.style.cursor = "pointer";
  launcherImage.style.zIndex = "9999";
  launcherImage.style.filter = "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))";
  launcherImage.style.transition = "transform 0.3s ease";
  launcherImage.style.objectFit = "contain";
  launcherImage.style.overflow = "hidden";
  // Create the iframe with modified corner styles
  var iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3000"; // Your Next.js app URL
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "340px";
  iframe.style.height = "400px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.display = "none";
  iframe.style.boxShadow = "0px 0px 15px rgba(0,0,0,0.2)";
  iframe.style.transformOrigin = "bottom right";
  iframe.style.transform = "scale(0)";
  iframe.style.opacity = "0";
  iframe.style.transition = "transform 0.4s ease, opacity 0.4s ease";

  // Define the specific corner radius for each corner
  iframe.style.borderTopLeftRadius = "10px"; // Rounded top-left
  iframe.style.borderTopRightRadius = "10px"; // Rounded top-right
  iframe.style.borderBottomLeftRadius = "10px"; // Rounded bottom-left
  iframe.style.borderBottomRightRadius = "0px"; // No rounding for bottom-right
  // Append elements to the document body
  document.body.appendChild(launcherImage);
  document.body.appendChild(iframe);
  // Responsive iframe dimension function (unchanged)
  function updateIframeDimensions() {
    if (window.innerWidth < 768) {
      iframe.style.width = "90%";
      iframe.style.height = "80%";
      iframe.style.bottom = "20px";
      iframe.style.right = "20px";
      //iframe.style.left = "0px";
    } else {
      iframe.style.width = "340px";
      iframe.style.height = "400px";
      iframe.style.bottom = "20px";
      iframe.style.right = "20px";
    }
  }
  // Call the function initially and on window resize
  updateIframeDimensions();
  window.addEventListener("resize", updateIframeDimensions);
  // Show the iframe when the launcher image is clicked
  launcherImage.addEventListener("click", function () {
    iframe.style.display = "block";
    setTimeout(() => {
      iframe.style.transform = "scale(1)";
      iframe.style.opacity = "1";
    }, 10);
    launcherImage.style.display = "none";
  });
  // Close the iframe and show the launcher when receiving the `WIDGET_CLOSE` message
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "WIDGET_CLOSE") {
      iframe.style.transform = "scale(0)";
      iframe.style.opacity = "0";
      setTimeout(() => {
        iframe.style.display = "none";
        launcherImage.style.display = "block";
      }, 400);
    }
  });
  // Optional hover effect for the launcher image
  launcherImage.addEventListener("mouseenter", () => {
    launcherImage.style.transform = "scale(1.1)";
  });
  launcherImage.addEventListener("mouseleave", () => {
    launcherImage.style.transform = "scale(1)";
  });
})();
