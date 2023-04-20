import React from "react";
import style from "./Shipping.module.css";

class Shipping extends React.Component {
  render() {
    return (
      <div className={style.orange}>
        <input
          type="button"
          onClick={() => this.props.nextPage("cart")}
          value="back to cart"
        />
        <input
          type="button"
          onClick={() => this.props.nextPage("payment")}
          value="next to payment"
        />
        <p>Shipping</p>
      </div>
    );
  }
}

export default Shipping;
