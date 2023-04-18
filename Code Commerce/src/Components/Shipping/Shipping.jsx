import React from "react";
import "./Shipping.css";

class Shipping extends React.Component {
  render() {
    return (
      <div className="orange">
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
