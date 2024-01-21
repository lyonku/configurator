import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Input, Checkbox, Select } from "antd";
import Filter from "./Filter";
import SortItem from "./SortItem";
import sortData from "../sortData.json";
import groupData from "../groupData.json";
import ProductBodyItem from "./ProductBodyItem";
import data from "../data.json";

function ProductItem({
  title,
  img,
  parametrId,
  secondTitle,
  id,
  config,
  addConfig1,
  name,
  handleDelete,
}) {
  const [openProduct, setOpenProduct] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [compatible, setCompatible] = useState(true);
  const [sort, setSort] = useState("firstCheap");
  const [group, setGroup] = useState("not");
  const [currentData, setCurrentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState();
  const [dataFilter, setDataFilter] = useState([]);

  const { Search } = Input;

  const onSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const onChangeCompatible = (e) => {
    setCompatible((prev) => !prev);
  };

  const onChangeInStock = (e) => {
    setInStock((prev) => !prev);
  };

  const onChangeAll = (e) => {
    setCompatible(false);
    setInStock(false);
  };

  const handleOpenProduct = () => {
    setOpenProduct((prevOpen) => !prevOpen);
  };

  const handleSort = (val) => {
    setSort(val);
  };

  const handleGroup = (val) => {
    setGroup(val);
  };

  const addConfig = (item) => {
    setOpenProduct(false);
    addConfig1(item, name);
  };

  useEffect(() => {
    let filterss = [];

    {
      data.attributes.map((item, index) => {
        if (parametrId?.includes(item._attribute_group_id)) {
          item.array = [];
          filterss.push(item);
        }
      });
    }

    let copy = [];
    data.products.forEach((item) => {
      if (item._category_id == id) {
        let att = item?.attributes?.attribute;
        for (const key in att) {
          const attribute = att[key];
          const desiredObject = filterss.find(
            (obj) => obj._attribute_id === attribute._attribute_id
          );
          if (desiredObject) {
            const array = desiredObject.array;
            if (array.length < 1) {
              attribute.count = 1;
              array.push(attribute);
            } else {
              const foundElement = array.find(
                (elem) => elem.value === attribute.value
              );
              if (foundElement) {
                foundElement.count += 1;
              } else {
                attribute.count = 1;
                array.push(attribute);
              }
            }
          }
        }
        copy.push(item);
      }
    });

    setCurrentData(copy);
    setFilters(filterss);
  }, []);

  return (
    <div
      className={`Product ${openProduct && "open"} ${
        config[name]?.name && "chosen"
      }`}
    >
      <div className="ProductItem">
        <div className="ProductItem__info">
          <div className="ProductItem__check">
            <CheckOutlined
              style={{
                color: config[name]?.name ? "#1677ff" : "#000",
              }}
            />
          </div>
          <div className="ProductItem__title">{title}</div>
          {config[name]?.name ? (
            <div className="Item">
              <div className="Item__img">
                {config[name].imgs ? (
                  <img src={config[name]?.imgs} />
                ) : (
                  <img src={img} />
                )}
              </div>
              <div className="Item__info">
                <div className="Item__title">{config[name].name}</div>
                <div className="Item__id">{`Код товара: ${config[name]._product_id}`}</div>
              </div>
              <div className="Item__price">{config[name]._price + " ₽"}</div>
            </div>
          ) : (
            <div className="ProductItem__img">
              <img src={img} />
            </div>
          )}
        </div>
        {config[name]?.name ? (
          <div className="ProductItem__btns">
            <div className="ProductItem__btnChange" onClick={handleOpenProduct}>
              <img src="/images/btn.svg" />
            </div>
            <div
              className="ProductItem__btnDelete"
              onClick={() => handleDelete(name)}
            >
              x <span>Убрать</span>
            </div>
          </div>
        ) : (
          <div className="ProductItem__btn" onClick={handleOpenProduct}>
            {openProduct ? "- Свернуть" : "+ Добавить"}
          </div>
        )}
      </div>
      {openProduct && (
        <div className="ProductWrap">
          <div className="Filters">
            <div className="Filters__search">
              <Search
                placeholder="Поиск по категории"
                onChange={onSearch}
                bordered={false}
                style={{ border: "0px" }}
              />
            </div>
            <div className="Filters__body">
              <div className="Filters__wrap">
                <div className="Filter_big">
                  <Checkbox
                    onChange={onChangeInStock}
                    className="Filter_big_text"
                    checked={inStock}
                  >
                    В наличии
                  </Checkbox>
                </div>

                <div className="Filter_big">
                  <Checkbox
                    onChange={onChangeCompatible}
                    className="Filter_big_text"
                    checked={compatible}
                  >
                    Совместимые товары
                  </Checkbox>
                </div>
                <div className="Categories">
                  {filters.map((item, index) => {
                    if (parametrId.includes(item._attribute_group_id)) {
                      return (
                        <Filter
                          title={item.name}
                          key={index}
                          array={item.array}
                          setDataFilter={setDataFilter}
                          dataFilter={dataFilter}
                        />
                      );
                    }
                  })}
                </div>
              </div>
              <div className="Filters__btns">
                <div className="Filters__btn_blue">Применить</div>
                <div className="Filters__btn">Сбросить</div>
              </div>
            </div>
          </div>
          <div className="ProductBody">
            <div className="ProductBody__title">
              <span>{secondTitle}</span>

              <div className="count">{`${currentData.length} товаров`}</div>
            </div>
            <div className="ProductBody__header">
              <div className="ProductBody__header_sort">
                <SortItem
                  title={"Сортировка:"}
                  data={sortData}
                  handle={handleSort}
                />
                <SortItem
                  title={"Группировка:"}
                  data={groupData}
                  handle={handleGroup}
                />
              </div>
              <div className="ProductBody__header_filter">
                {compatible && (
                  <div className="Filter__item Filter__item_blue">
                    Совместимые товары
                    <CloseOutlined onClick={onChangeCompatible} />
                  </div>
                )}
                {inStock && (
                  <div className="Filter__item Filter__item_blue">
                    В наличии
                    <CloseOutlined onClick={onChangeInStock} />
                  </div>
                )}
                {(inStock || compatible) && (
                  <div className="Filter__item" onClick={onChangeAll}>
                    Сбросить фильтры
                    <CloseOutlined />
                  </div>
                )}
              </div>
            </div>
            <div className="ProductBody__main">
              {currentData
                .filter((element) => (inStock ? element._count >= 1 : true)) // Фильтрация по наличию товара
                .sort((a, b) =>
                  sort == "firstCheap"
                    ? a._price - b._price
                    : b._price - a._price
                ) // Сортировка по цене
                .filter((element) => {
                  const lowerCaseQuery = searchQuery.toLowerCase();
                  const lowerCaseName = element?.name?.toLowerCase();
                  return lowerCaseName?.includes(lowerCaseQuery);
                })
                .map((element, index) => {
                  return (
                    <ProductBodyItem
                      item={element}
                      key={index}
                      addConfig={addConfig}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
