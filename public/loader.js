(function () {
  var launcherImage = document.createElement("img");
  launcherImage.id = "widget-launcher";
  launcherImage.src = "http://localhost:3000/widget-icon.png";
  launcherImage.alt = "Open Widget";
  launcherImage.style.position = "fixed";
  launcherImage.style.bottom = "20px";
  launcherImage.style.right = "20px";
  launcherImage.style.width = "50px";
  launcherImage.style.height = "50px";
  launcherImage.style.cursor = "pointer";
  launcherImage.style.zIndex = "10000";
  launcherImage.style.filter = "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))";
  launcherImage.style.transition = "opacity 0.4s ease, transform 0.3s ease";
  launcherImage.style.objectFit = "contain";
  launcherImage.style.overflow = "hidden";
  launcherImage.style.opacity = "1"; // Default opacity is set to 1

  var wrapperDiv = document.createElement("div");
  wrapperDiv.style.position = "fixed";
  wrapperDiv.style.bottom = "20px";
  wrapperDiv.style.right = "20px";
  wrapperDiv.style.width = "457px";
  wrapperDiv.style.height = "643px";
  wrapperDiv.style.display = "none";
  wrapperDiv.style.zIndex = "9999";
  wrapperDiv.style.background =
    "linear-gradient(153.56deg, #F91163 -14.71%, #000000 48.28%, #984965 61.64%, #FFFFFF 97.07%)";
  wrapperDiv.style.borderRadius = "20px";
  wrapperDiv.style.boxSizing = "border-box";
  wrapperDiv.style.padding = "2px";
  wrapperDiv.style.transformOrigin = "bottom right";
  wrapperDiv.style.transform = "scale(0)";
  wrapperDiv.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  wrapperDiv.style.opacity = "0";
  wrapperDiv.style.boxShadow = "0 0px 50px rgba(255, 200, 200, 0.65)"; //uncomment for the daramfon's effect

  var launcherImageInIframe = document.createElement("img");
  launcherImageInIframe.id = "widget-launcher-iframe";
  launcherImageInIframe.src = "http://localhost:3000/widget-icon.png";
  launcherImageInIframe.alt = "Close Widget";
  launcherImageInIframe.style.position = "absolute";
  launcherImageInIframe.style.bottom = "10px";
  launcherImageInIframe.style.right = "10px";
  launcherImageInIframe.style.width = "50px";
  launcherImageInIframe.style.height = "50px";
  launcherImageInIframe.style.cursor = "pointer";
  launcherImageInIframe.style.filter =
    "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))";
  launcherImageInIframe.style.transition =
    "opacity 0.4s ease, transform 0.3s ease";
  launcherImageInIframe.style.objectFit = "contain";
  launcherImageInIframe.style.opacity = "0"; // Initially hidden

  launcherImageInIframe.addEventListener("click", function () {
    window.dispatchEvent(
      new MessageEvent("message", {
        data: { type: "WIDGET_CLOSE" },
      })
    );
  });

  wrapperDiv.appendChild(launcherImageInIframe);

  var iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3000";
  iframe.title = "Calnta Beauty Assistant Widget";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.borderTopLeftRadius = "20px";
  iframe.style.borderTopRightRadius = "20px";
  iframe.style.borderBottomLeftRadius = "20px";
  iframe.style.borderBottomRightRadius = "0px";
  //iframe.style.boxShadow = "0px 0px 15px rgba(0,0,0,0.2)"; //no need for this if and only if daramfon's effect is active(reason:redundant)...or move the box shadowing to the wrapper
  iframe.style.background = "#FAF6F6";
  iframe.style.overflow = "hidden";

  wrapperDiv.appendChild(iframe);
  document.body.appendChild(launcherImage);
  document.body.appendChild(wrapperDiv);

  function updateIframeDimensions() {
    if (window.innerWidth < 768) {
      wrapperDiv.style.width = "90%";
      wrapperDiv.style.height = "80%";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      launcherImageInIframe.style.width = "40px";
      launcherImageInIframe.style.height = "40px";
    } else {
      wrapperDiv.style.width = "457px";
      wrapperDiv.style.height = "643px";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      launcherImageInIframe.style.width = "50px";
      launcherImageInIframe.style.height = "50px";
    }
  }

  updateIframeDimensions();
  window.addEventListener("resize", updateIframeDimensions);

  launcherImage.addEventListener("click", function () {
    launcherImage.style.opacity = "0"; // Fade out effect
    setTimeout(() => {
      launcherImage.style.display = "none"; // Hide launcher after fade-out
    }, 400); // Wait for opacity transition to complete (400ms)

    // Show and animate the wrapper div
    wrapperDiv.style.display = "block"; // Show the wrapper
    setTimeout(() => {
      wrapperDiv.style.transform = "scale(1)";
      wrapperDiv.style.opacity = "1"; // Fade in
      launcherImageInIframe.style.opacity = "1"; // Fade in the second image smoothly
    }, 10);
  });

  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "WIDGET_CLOSE") {
      wrapperDiv.style.transform = "scale(0)";
      wrapperDiv.style.opacity = "0";
      launcherImageInIframe.style.opacity = "0"; // Fade out the second image
      setTimeout(() => {
        wrapperDiv.style.display = "none";
        launcherImage.style.display = "block";
        launcherImage.style.opacity = "1"; // Reset launcher image opacity
      }, 400);
    }
  });

  launcherImage.addEventListener("mouseenter", () => {
    launcherImage.style.transform = "scale(1.1)";
  });
  launcherImage.addEventListener("mouseleave", () => {
    launcherImage.style.transform = "scale(1)";
  });
})();
