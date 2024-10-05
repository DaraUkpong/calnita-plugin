import { NextResponse } from "next/server";

// Expose the ClientWidget and render it on the client
export async function GET() {
  const script = `
    // The ClientWidget definition as a function
    function ClientWidget() {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        React.createElement("div", { className: "fixed bottom-4 right-4 z-50" },
          isOpen ? (
            React.createElement("div", { className: "bg-white rounded-lg shadow-lg p-4 w-64" },
              React.createElement("button", { onClick: () => setIsOpen(false), className: "float-right text-gray-500 hover:text-gray-700" }, "Close"),
              React.createElement("h2", { className: "text-lg font-bold mb-2" }, "Widget Content"),
              React.createElement("p", null, "This is your widget content. Add your functionality here.")
            )
          ) : (
            React.createElement("button", { onClick: () => setIsOpen(true), className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" }, "Open Widget")
          )
        )
      );
    }

    // Now expose it globally
    window.WidgetComponent = ClientWidget;

    // Create a container for the widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'react-widget-container';
    document.body.appendChild(widgetContainer);

    // Load React and ReactDOM from CDN
    var reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
    
    reactScript.onload = function() {
      var reactDomScript = document.createElement('script');
      reactDomScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
      
      reactDomScript.onload = function() {
        // Now render the widget component
        const WidgetComponent = window.WidgetComponent;
        if (WidgetComponent) {
          ReactDOM.render(React.createElement(WidgetComponent), widgetContainer);
        }
      };

      document.body.appendChild(reactDomScript);
    };

    document.body.appendChild(reactScript);
  `;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
