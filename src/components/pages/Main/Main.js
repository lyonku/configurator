import React, { useState, useEffect, useRef } from "react";
import "./Main.css";
import ProductItem from "./components/ProductItem";
import categoryMass from "./categoryMass.json";
import categoryPerMass from "./categoryPerMass.json";
import { Progress } from "antd";

const Main = ({}) => {
  const [config, setConfig] = useState({ processor: {}, motherboard: {} });
  const [price, setPrice] = useState();
  const [count, setCount] = useState();

  const addConfig1 = (val, el) => {
    let copy = Object.assign({}, config);
    copy[el] = val;
    setConfig(copy);
  };

  const handleDelete = (el) => {
    let copy = Object.assign({}, config);
    copy[el] = {};
    setConfig(copy);
  };

  useEffect(() => {
    let totalPrice = 0;
    let totalCount = 0;

    for (const item in config) {
      if (config[item].name) {
        totalPrice += +config[item]._price;
        if (
          ["22", "21", "211", "251", "26", "284", "210"].includes(
            config[item]._category_id
          )
        ) {
          totalCount += 1;
        }
      }
    }

    setPrice(totalPrice);
    setCount(totalCount);
  }, [config]);

  return (
    <div className="Main">
      <div className="Main__wrap">
        <div className="MainHeader">
          <div className="MainHeader__title">Конфигуратор компьютера</div>
          <div className="MainHeader__nav">
            <div className="MainHeader__navItem">Инструкция по сборке</div>
            <div className="MainHeader__navItem">Справка</div>
            <div className="MainHeader__navItem">Обратная связь</div>
          </div>
        </div>
        <div className="MainBody">
          <div className={`HintBlock ${price && "active"}`}>
            {price ? (
              <div className="HintBlock__wrap">
                <div className="HintBlock__left">
                  <Progress
                    type="circle"
                    percent={((count / 7) * 100).toFixed()}
                  />
                  <div className="HintBlock__body">
                    <div className="Hint">
                      Добавьте все обязательные комплектующие (отмечены
                      звездочкой *) в конфигуратор
                    </div>
                    <div className="HintBlock__btns">
                      <div className="HintBlock__leftBtns">
                        <div className="ProductItem__btn">Сохранить</div>
                        <div className="ProductItem__btn">Поделиться</div>
                      </div>
                      <div className="HintBlock__rightBtns">
                        <div
                          className={`ProductItem__btn ProductItem__btn_blue ${
                            count < 7 && "unActive"
                          }`}
                        >
                          Купить со сборкой
                        </div>
                        <div className="ProductItem__btn">
                          Купить без сборкой
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="HintBlock__right">
                  <div className="TotalPrice__price">
                    <div className="TotalPrice__text">Цена без сборки:</div>
                    <div className="TotalPrice__title">{price + " ₽"}</div>
                    {count == 7 && (
                      <div className="TotalPrice__build">
                        Сборка:
                        <span> 800 ₽</span>
                      </div>
                    )}
                  </div>
                  <div className="TotalPrice__date">Забрать заказ: 17 июня</div>
                </div>
              </div>
            ) : (
              <div className={`Hint `}>
                Добавьте все обязательные комплектующие (отмечены звездочкой *)
                в конфигуратор
              </div>
            )}
          </div>
          <div className="Products">
            <div className="Products__title">Системный блок</div>
            <div className="Products__wrap">
              {categoryMass.map((item, index) => {
                return (
                  <ProductItem
                    key={index}
                    title={item.title}
                    img={item.img}
                    parametrId={item._attribute_group_id}
                    secondTitle={item.secondTitle}
                    id={item.id}
                    config={config}
                    addConfig1={addConfig1}
                    name={item.name}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          </div>
          <div className="Products">
            <div className="Products__title">Периферия</div>
            <div className="Products__wrap">
              {categoryPerMass.map((item, index) => {
                return (
                  <ProductItem
                    key={index}
                    title={item.title}
                    img={item.img}
                    parametrId={item._attribute_group_id}
                    secondTitle={item.secondTitle}
                    config={config}
                    id={item.id}
                    addConfig1={addConfig1}
                    name={item.name}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
