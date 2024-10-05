(function () {
  // Create a script tag to load React and ReactDOM
  var reactScript = document.createElement("script");
  reactScript.src = "https://unpkg.com/react@18/umd/react.production.min.js";

  var reactDomScript = document.createElement("script");
  reactDomScript.src =
    "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js";

  // Create a container for the widget
  var widgetContainer = document.createElement("div");
  widgetContainer.id = "my-widget-container";
  widgetContainer.style.position = "fixed";
  widgetContainer.style.bottom = "20px"; // default positioning
  widgetContainer.style.right = "20px"; // default positioning
  widgetContainer.style.zIndex = "10000"; // high z-index
  document.body.appendChild(widgetContainer);

  // Load React and ReactDOM, then load the widget component
  reactScript.onload = function () {
    reactDomScript.onload = function () {
      // Create the widget component using React.createElement
      const Widget = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        return React.createElement(
          "div",
          { className: "fixed bottom-4 right-4 z-50" },
          React.createElement("img", {
            src: "http://localhost:3000/widget-icon.png",
            alt: "Open Widget",
            className: "cursor-pointer",
            onClick: () => setIsOpen(!isOpen),
          }),
          isOpen &&
            React.createElement(
              "div",
              {
                style: {
                  position: "absolute", // Change to absolute positioning
                  bottom: "100%", // Position it above the icon
                  right: 0, // Align it with the right side of the icon
                  zIndex: 1001, // Ensure it's above other content
                  backgroundColor: "white", // Add background for better visibility
                  padding: "1rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                },
              },
              React.createElement(
                "h2",
                { className: "text-lg font-bold" },
                "Widget Content"
              ),
              React.createElement("p", null, "This is your plugin content."),
              React.createElement(
                "button",
                {
                  onClick: () => setIsOpen(false),
                  className: "text-gray-500 hover:text-gray-700",
                },
                "Close"
              )
            )
        );
      };

      // Create a root and render the widget component
      const root = ReactDOM.createRoot(widgetContainer);
      root.render(React.createElement(Widget));
    };

    document.body.appendChild(reactDomScript);
  };

  document.body.appendChild(reactScript);
})();
