function ProductBodyItem({ item, addConfig }) {
  return (
    <div className="ProductBody__item">
      <div className="ProductBody__item_leftBlock">
        <div className="ProductBody__item_img">
          <img src={item?.imgs} />
        </div>
        <div className="ProductBody__item_text">{item.name}</div>
      </div>
      <div className="ProductBody__item_block">
        <div className="block__header">
          <div className="block__price">{item._price + " ₽"}</div>
          <div className="block__stock">
            {item._count >= 1 ? "В наличии" : "Нет в наличии"}
          </div>
        </div>

        <div className="block__btn" onClick={() => addConfig(item)}>
          В комплект
        </div>
      </div>
    </div>
  );
}

export default ProductBodyItem;
