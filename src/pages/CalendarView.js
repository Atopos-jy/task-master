import React from "react";
import { Calendar, Badge, Modal } from "antd";

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "Design meeting" },
        { type: "success", content: "Code review" },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "Deadline: Q3 Report" },
        { type: "success", content: "Team Lunch" },
        { type: "error", content: "Server maintenance" },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "Client call" },
        { type: "success", content: "Product demo" },
        { type: "error", content: "Bug fix deployment" },
      ];
      break;
    default:
  }
  return listData || [];
};

const CalendarView = () => {
  const cellRender = (value, info) => {
    if (info.type === "date") {
      const listData = getListData(value);
      return (
        <>
          {info.originNode}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {listData.map((item) => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))}
          </ul>
        </>
      );
    }
    return info.originNode;
  };

  return (
    <div style={{ background: "#fff", padding: 24 }}>
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default CalendarView;
