import { Button } from "antd";
import React, { useState } from "react";

const AddWidget = ({ category, addWidget }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [onSubmit, setOnsubmit] = useState(false);
  const handleAddWidget = () => {
    setOnsubmit(true);
    if (widgetName && widgetText) {
      const newWidget = { id: Date.now(), name: widgetName, text: widgetText };
      addWidget(category, newWidget);
      setWidgetName("");
      setWidgetText("");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2 justify-center">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md w-full"
        placeholder="Name"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
      />
      {onSubmit && !widgetName && (
        <p className="text-red-600 text-sm">Required</p>
      )}
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md w-full"
        placeholder="Text"
        value={widgetText}
        onChange={(e) => setWidgetText(e.target.value)}
      />
      {onSubmit && !widgetText && (
        <p className="text-red-600 text-sm">Required</p>
      )}
      <Button size="large" onClick={handleAddWidget}>
        Add Widget
      </Button>
    </div>
  );
};

export default AddWidget;
