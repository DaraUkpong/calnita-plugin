(function () {
  // Create the launcher image element
  var launcherImage = document.createElement("img");
  launcherImage.id = "widget-launcher";
  launcherImage.src = "http://localhost:3000/widget-icon.png"; // Adjust the icon URL as needed
  launcherImage.alt = "Open Widget";
  launcherImage.style.position = "fixed";
  launcherImage.style.bottom = "20px";
  launcherImage.style.right = "20px";
  launcherImage.style.width = "50px";
  launcherImage.style.height = "50px";
  launcherImage.style.cursor = "pointer";
  launcherImage.style.zIndex = "10000"; // Set launcher image z-index higher
  launcherImage.style.filter = "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))";
  launcherImage.style.transition = "transform 0.3s ease";
  launcherImage.style.objectFit = "contain";
  launcherImage.style.overflow = "hidden";

  // Create a wrapper div for the gradient border
  var wrapperDiv = document.createElement("div");
  wrapperDiv.style.position = "fixed";
  wrapperDiv.style.bottom = "20px";
  wrapperDiv.style.right = "20px";
  wrapperDiv.style.width = "457px"; // Width adjusted to accommodate the border
  wrapperDiv.style.height = "643px"; // Height adjusted to accommodate the border
  wrapperDiv.style.display = "none"; // Initially hidden
  wrapperDiv.style.zIndex = "9999"; // Ensure wrapper div z-index is lower
  wrapperDiv.style.background =
    "linear-gradient(153.56deg, #F91163 -14.71%, #000000 48.28%, #984965 61.64%, #FFFFFF 97.07%)"; // Gradient background
  wrapperDiv.style.borderRadius = "20px"; // Rounded corners for visual effect
  wrapperDiv.style.boxSizing = "border-box"; // Include padding in width/height
  wrapperDiv.style.padding = "2px"; // Padding for border effect
  wrapperDiv.style.transformOrigin = "bottom right"; // Origin for scaling
  wrapperDiv.style.transform = "scale(0)"; // Initial scale for animation
  wrapperDiv.style.transition = "transform 0.4s ease, opacity 0.4s ease"; // Transition effects
  wrapperDiv.style.opacity = "0"; // Start hidden

  // Create the second launcher image for the bottom right of the iframe
  var launcherImageInIframe = document.createElement("img");
  launcherImageInIframe.id = "widget-launcher-iframe";
  launcherImageInIframe.src = "http://localhost:3000/widget-icon.png"; // Same icon URL
  launcherImageInIframe.alt = "Close Widget";
  launcherImageInIframe.style.position = "absolute";
  launcherImageInIframe.style.bottom = "10px"; // Distance from the bottom
  launcherImageInIframe.style.right = "10px"; // Distance from the right
  launcherImageInIframe.style.width = "50px"; // Width
  launcherImageInIframe.style.height = "50px"; // Height
  launcherImageInIframe.style.cursor = "pointer"; // Pointer cursor
  launcherImageInIframe.style.filter =
    "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))";
  launcherImageInIframe.style.transition = "transform 0.3s ease";
  launcherImageInIframe.style.objectFit = "contain";

  // Add event listener to close the iframe when clicked
  launcherImageInIframe.addEventListener("click", function () {
    window.dispatchEvent(
      new MessageEvent("message", {
        data: { type: "WIDGET_CLOSE" },
      })
    );
  });

  // Append the second launcher image to the wrapper div
  wrapperDiv.appendChild(launcherImageInIframe);

  // Create the iframe
  var iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3000"; // Your Next.js app URL
  iframe.style.width = "100%"; // Width of iframe
  iframe.style.height = "100%"; // Height of iframe
  iframe.style.border = "none"; // Remove default border
  iframe.style.borderTopLeftRadius = "20px"; // Rounded top left corner
  iframe.style.borderTopRightRadius = "20px"; // Rounded top right corner
  iframe.style.borderBottomLeftRadius = "20px"; // Rounded bottom left corner
  iframe.style.borderBottomRightRadius = "0px"; // Sharp bottom right corner
  iframe.style.boxShadow = "0px 0px 15px rgba(0,0,0,0.2)"; // Box shadow for the iframe
  iframe.style.background = "#FAF6F6"; // Solid color for the iframe

  // Append the iframe to the wrapper div
  wrapperDiv.appendChild(iframe);
  document.body.appendChild(launcherImage);
  document.body.appendChild(wrapperDiv);

  // Responsive adjustments for the wrapper dimensions
  function updateIframeDimensions() {
    if (window.innerWidth < 768) {
      wrapperDiv.style.width = "90%"; // Mobile width
      wrapperDiv.style.height = "80%"; // Mobile height
      iframe.style.width = "100%"; // Make iframe fill wrapper width
      iframe.style.height = "100%"; // Make iframe fill wrapper height
      launcherImageInIframe.style.width = "40px"; // Smaller size for mobile
      launcherImageInIframe.style.height = "40px"; // Smaller size for mobile
    } else {
      wrapperDiv.style.width = "457px"; // Reset to original width
      wrapperDiv.style.height = "643px"; // Reset to original height
      iframe.style.width = "100%"; // Reset to original iframe width
      iframe.style.height = "100%"; // Reset to original iframe height
      launcherImageInIframe.style.width = "50px"; // Reset size for desktop
      launcherImageInIframe.style.height = "50px"; // Reset size for desktop
    }
  }

  // Call the function initially and on window resize
  updateIframeDimensions();
  window.addEventListener("resize", updateIframeDimensions);

  // Show the wrapper and iframe on launcher image click
  launcherImage.addEventListener("click", function () {
    wrapperDiv.style.display = "block"; // Show the wrapper
    setTimeout(() => {
      wrapperDiv.style.transform = "scale(1)"; // Scale to full size
      wrapperDiv.style.opacity = "1"; // Fade in
    }, 10);
    launcherImage.style.display = "none"; // Hide launcher image
  });

  // Close the iframe on receiving the `WIDGET_CLOSE` message
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "WIDGET_CLOSE") {
      wrapperDiv.style.transform = "scale(0)"; // Scale down
      wrapperDiv.style.opacity = "0"; // Fade out
      setTimeout(() => {
        wrapperDiv.style.display = "none"; // Hide the wrapper
        launcherImage.style.display = "block"; // Show launcher image
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
