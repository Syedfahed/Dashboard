import { CloseOutlined } from '@ant-design/icons';
import React from 'react';

const Widget = ({ widget, category, removeWidget }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{widget.name}</h3>
          <p className="text-gray-600">{widget.text}</p>
        </div>
        <button
          className="text-red-500 hover:text-red-700 "
          onClick={() => removeWidget(category, widget.id)}
        >
         <CloseOutlined/>
        </button>
      </div>
    </div>
  );
};

export default Widget;
