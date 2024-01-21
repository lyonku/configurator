import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Input, Checkbox, Select } from "antd";
function Filter({ title, array, setDataFilter, dataFilter }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleData = (event) => {
    let copy = Object.assign([], dataFilter);
    copy.push(event);
    setDataFilter(copy);
  };

  return (
    <div className="Filter">
      <DownOutlined onClick={handleOpen} /> {title}
      <div className={`Filter__array ${!open && "close"}`}>
        {array.map((item, index) => {
          return (
            <div className="Filter__item" key={index}>
              <Checkbox
                onChange={() => handleData(item)}
                className="Filter_big_text"
              >
                {item.value}
              </Checkbox>

              <span className="count">{`(${item.count})`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Filter;
