import { Select } from "antd";
function SortItem({ title, data, handle }) {
  return (
    <div className="Sort__item">
      <div className="Sort__item_title">{title}</div>
      <Select
        bordered={false}
        defaultValue={data[0].value}
        onChange={handle}
        options={data}
        style={{ color: "#1677FF" }}
      />
    </div>
  );
}

export default SortItem;
