import React from "react";
import style from "./CartItem.module.css";

class CartItem extends React.Component {
  render() {
    const {
      description,
      price,
      totalPrice,
      src,
      alt,
      selectName,
      selectId,
      productHeader,
      priceHeader,
      imgClassName,
      selectorOnChange,
      quantity,
      removeItem,
    } = this.props;
    return (
      <div className={style.item}>
        <div className={style.imageAndInfo}>
          <div className={style.exit} onClick={removeItem}>
            X
          </div>
          <div className={style.imgWrapper}>
            <img src={src} alt={alt} />
          </div>
          <div className={style.description}>{description}</div>
        </div>
        <div className={style.numbers}>
          <div className={style.price}>{price}</div>
          <select
            defaultValue="1"
            name={selectName}
            id={selectId}
            onChange={selectorOnChange}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <div className={style.totalPrice}>{quantity * price}</div>
        </div>
      </div>
    );
  }
}

export default CartItem;