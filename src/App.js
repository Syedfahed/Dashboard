import React, { useState, useEffect } from "react";
import { Alert, Button, message, Select, Tabs } from "antd";
import Widget from "./components/UI/Widget";
import AddWidget from "./components/UI/AddWidget";
import { CloseOutlined } from "@ant-design/icons";

const initialData = [
  {
    category: "CSPM Executive Dashboard",
    key: "cspm",
    widgets: [
      { id: 1, name: "Widget 1", text: "Random Text 1" },
      { id: 2, name: "Widget 2", text: "Random Text 2" },
    ],
  },
  {
    category: "CWPP Dashboard",
    key: "cwpp",
    widgets: [{ id: 3, name: "Widget 3", text: "Random Text 3" }],
  },
];

if (!localStorage.getItem("dashboardData")) {
  localStorage.setItem("dashboardData", JSON.stringify(initialData));
}
const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [tabValue, setTabValue] = useState("cspm");
  const [sideBar, setSideBar] = useState(false);
  const [filteredWidgets, setFilteredWidgets] = useState([]);
  const [checkBoxValue, setCheckBoxValue] = useState([]);
// message
const [messageApi, contextHolder] = message.useMessage();

  const serchList = categories?.reduce(
    (acc, cur) => [...acc, ...cur.widgets],
    []
  );
  const storedData = JSON.parse(localStorage.getItem("dashboardData"));

  useEffect(() => {
    if (storedData) {
      setCategories(storedData);
      setFilteredWidgets(storedData);
    }
  }, []);

  const updateLocalStorage = (updatedCategories) => {
    localStorage.setItem("dashboardData", JSON.stringify(updatedCategories));
  };

  const addWidget = (category, widget) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.category === category) {
        // console.log(cat.category)
        return { ...cat, widgets: [...cat.widgets, widget] };
      }
      return cat;
    });
    setCategories(updatedCategories);
    setFilteredWidgets(updatedCategories);
    updateLocalStorage(updatedCategories);
    messageApi.open({
      type: 'success',
      content: 'Updated',
    });
  };

  const removeWidget = (category, widgetId) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.category === category) {
        return {
          ...cat,
          widgets: cat.widgets.filter((w) => w.id !== widgetId),
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
    setFilteredWidgets(updatedCategories);
    updateLocalStorage(updatedCategories);
  };

  const handleSearch = (value) => {
    const searchResults = categories.map((cat) => ({
      ...cat,
      widgets: cat.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(value.toLowerCase())
      ),
    }));
    setFilteredWidgets(searchResults);
  };

  // tab
  const onChange = (key) => {
    // console.log(key);
    setTabValue(key);
  };
  const removeWidgetFromList = (category, id) => {
    if(checkBoxValue.length>0){
    const updatedCategories = categories.map((cat) => {
      if (cat.category === category) {
        return {
          ...cat,
          widgets: cat.widgets.filter((w) => !checkBoxValue.includes(w.id)),
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
    setFilteredWidgets(updatedCategories);
    updateLocalStorage(updatedCategories);
    messageApi.open({
      type: 'success',
      content: 'Updated',
    });
  }else{
    messageApi.open({
      type: 'warning',
      content: 'Select chechbox',
    });

  }

  };
  const getCheckList = (value, val) => {
    // console.log(val,value);
    const isChecked = checkBoxValue.includes(value);
    if (isChecked) {
      setCheckBoxValue(
        checkBoxValue.filter((selectedBox) => selectedBox !== value)
      );
    } else {
      setCheckBoxValue([...checkBoxValue, value]);
    }
  };

  const CheckBoxForm = ({ value }) => {
    return (
      <div className="flex flex-col justify-between pb-5 gap-2">
         <h3 className=" text-md font-medium">To remove widget select widget</h3>
        <div className="h-[30vh] overflow-auto flex flex-col gap-3">
          {value?.widgets.map((data, index) => {
            return (
              <div
                key={index}
                className="flex gap-3 items-center border p-2 rounded-md"
              >
                <input
                  id={data.name}
                  type="checkbox"
                  value={data.name}
                  checked={checkBoxValue.includes(data.id)}
                  // onChange={(val)=>removeWidgetFromList(data.id,value.category)}
                  onChange={(val) => getCheckList(data.id, val)}
                />
                <label htmlFor={data.name}>{data.name}</label>
              </div>
            );
          })}
         <div className="flex gap-3 justify-center">
          <Button  onClick={()=>setSideBar(false)}>Cancel</Button>
         <Button
            type="primary"
            onClick={() => removeWidgetFromList(value.category)}
          >
            Confirm
          </Button>
         </div>
        </div>

        <div className="mt-10">
          <h3 className=" text-md font-medium">Add New Widget</h3>
          <AddWidget category={value?.category} addWidget={addWidget} />
        </div>
      </div>
    );
  };

  const items = [
    {
      key: "cspm",
      label: "CSPM",
      children: <CheckBoxForm value={categories[0]} />,
    },
    {
      key: "cwpp",
      label: "CWPP",
      children: <CheckBoxForm value={categories[1]} />,
    },
  ];

  return (
    <div>
         {contextHolder}
      <div className="bg-white p-4">
        <div className="grid grid-cols-3">
          <div className=" col-span-2">
            <p className=" font-semibold text-gray-200 inline">Home </p>{" "}
            <p className="text-blue-600 inline cursor-pointer underline">
              Dashboard
            </p>
          </div>
          <div className="col-span-1">
            <Select
              style={{ width: "220px" }}
              showSearch
              allowClear
              onSelect={handleSearch}
              onClear={() => setFilteredWidgets(storedData)}
              options={serchList?.map((e) => {
                return { label: e?.name, value: e?.name, key: e.id };
              })}
              placeholder="Seacrch"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <div className="my-2 flex justify-between gap-5 items-center">
          <h1 className="text-xl font-bold">CNAPP Dashboard</h1>
          <div>
            <Button type="primary" onClick={() => setSideBar((prv) => !prv)}>
              Creat widget
            </Button>
          </div>
        </div>
        {filteredWidgets.map((category) => (
          <div key={category.category} className="mb-6">
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <div className="grid grid-cols-3 gap-5 items-center">
              {category.widgets.map((widget) => (
                <Widget
                  key={widget.id}
                  widget={widget}
                  category={category.category}
                  removeWidget={removeWidget}
                />
              ))}
              {!sideBar && (
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                  <Button
                    type="primary"
                    onClick={() => {
                      setSideBar(true);
                      setTabValue(category.key);
                    }}
                  >
                    Creat Widget
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {sideBar && (
        <div className="bg-white absolute right-0 top-0 w-96 h-[100vh]">
          <div className="bg-blue-600 text-white flex justify-between gap-4 p-4">
            <h2>Add Widget</h2>
            <button onClick={() => setSideBar(false)}>
              {" "}
              <CloseOutlined />
            </button>
          </div>
          <div className="p-2">
            <Tabs
              defaultActiveKey={tabValue}
              items={items}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
