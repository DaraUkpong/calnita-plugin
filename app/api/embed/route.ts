// app/api/embed/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  const APP_URL = process.env.APP_URL;

  const scriptContent = `
    (function() {
      var style = document.createElement('style');
      style.textContent = \`
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
          width: 90%;
          max-width: 450px;
          height: 80vh;
          max-height: 600px;
          min-height: 400px;
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
        @media (max-width: 768px) {
          .calnita-widget-container {
            bottom: 5vh;
            right: 10%;
            width: 80%;
            height: 70vh;
            min-height: 50vh;
            max-height: 80vh;
          }
          .calnita-widget-button {
            bottom: 10px;
            right: 10px;
            width: 50px;
            height: 50px;
          }
        }
      \`;
      document.head.appendChild(style);

      var button = document.createElement('button');
      button.className = 'calnita-widget-button';
      var buttonImg = document.createElement('img');
      buttonImg.src = '${APP_URL}/widget-icon.png';
      buttonImg.alt = 'Open Widget';
      button.appendChild(buttonImg);
      document.body.appendChild(button);

      var container = document.createElement('div');
      container.className = 'calnita-widget-container collapsed';
      var iframe = document.createElement('iframe');
      iframe.src = '${APP_URL}/widget';
      iframe.className = 'calnita-widget-iframe';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
      container.appendChild(iframe);
      document.body.appendChild(container);

      function toggleWidget() {
        container.classList.toggle('collapsed');
        if (!container.classList.contains('collapsed')) {
          iframe.contentWindow.postMessage({ type: 'WIDGET_OPENED' }, '*');
        }
      }

      button.addEventListener('click', toggleWidget);

      window.addEventListener('message', function(event) {
        if (event.origin !== '${APP_URL}') return;

        if (event.data.type === 'GOOGLE_SIGN_IN_RESULT') {
          if (event.data.success) {
            iframe.contentWindow.postMessage({ type: 'REFRESH_AUTH', session: event.data.session }, '*');
          } else {
            console.log('Google sign-in was unsuccessful');
          }
        }
      });
    })();
  `;

  return new NextResponse(scriptContent, {
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
}