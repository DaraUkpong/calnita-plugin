(function() {
  // Create styles
  var style = document.createElement('style');
  style.textContent = `
    .calnita-widget-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      cursor: pointer;
      z-index: 9999;
      padding: 0;
      border: none;
      background: none;
    }
    .calnita-widget-button img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .calnita-widget-container {
      position: fixed;
       bottom: 3rem;
      right: 2rem;
      width: 450px;
      height: 600px;
      padding: 2px;
      border-radius: 20px;
      background: linear-gradient(90deg,  #f92a63, #000, #000);
       box-shadow: 0 0px 50px rgba(255, 200, 200, 0.65);
      transition: all 0.3s ease;
      z-index: 9998;
    }
    .calnita-widget-iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 20px;
      background: #FAF6F6;
    }
    .calnita-widget-container.collapsed {
      transform: scale(0);
      opacity: 0;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  // Create button
  var button = document.createElement('button');
  button.className = 'calnita-widget-button';
  var buttonImg = document.createElement('img');
  buttonImg.src = `${process.env.APP_URL}/widget-icon.png`;
  buttonImg.alt = 'Open Widget';
  button.appendChild(buttonImg);
  document.body.appendChild(button);

  // Create container and iframe
  var container = document.createElement('div');
  container.className = 'calnita-widget-container collapsed';
  var iframe = document.createElement('iframe');
  iframe.src = `${process.env.APP_URL}/widget`;
  iframe.className = 'calnita-widget-iframe';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'no');
  container.appendChild(iframe);
  document.body.appendChild(container);

  // Toggle widget visibility
  function toggleWidget() {
    container.classList.toggle('collapsed');
  }

  // Add click event to button
  button.addEventListener('click', toggleWidget);

  // Set up message listener
  window.addEventListener('message', function(event) {
    if (event.origin !== `${process.env.APP_URL}`) return;
    
    if (event.data.type === 'GOOGLE_SIGN_IN_RESULT') {
      if (event.data.success) {
        // Authentication successful
        iframe.contentWindow.postMessage({ type: 'REFRESH_AUTH', session: event.data.session }, '*');
      } else {
        // Authentication failed or was cancelled
        console.log('Google sign-in was unsuccessful');
      }
    }
  });

  // ... rest of the code ...
})();