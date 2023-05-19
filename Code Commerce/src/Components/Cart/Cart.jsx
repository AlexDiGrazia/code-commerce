import React from "react";
import style from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import { PHOTOS } from "../../Photos/photos";

class Cart extends React.Component {
  state = {
    quantity: {
      guitar: 1,
      picks: 1,
      cable: 1,
      wah: 1,
      marshall: 1,
    },
    display: {
      guitar: "visible",
      picks: "visible",
      cable: "visible",
      wah: "visible",
      marshall: "visible",
    },
    price: {
      guitar: 3000,
      picks: 25,
      cable: 30,
      wah: 200,
      marshall: 3100,
    },
    emptyCartError: "",
  };

  setQuantity = (e, product) => {
    this.setState((prevState) => ({
      quantity: {
        ...prevState.quantity,
        [product]: +e.target.value,
      },
      emptyCartError: "",
    }));
  };

  removeItem = (product) => {
    this.setState({
      display: {
        ...this.state.display,
        [product]: "none",
      },
      quantity: {
        ...this.state.quantity,
        [product]: 0,
      },
    });
  };

  getCartTotal = () => {
    return Object.values(this.state.quantity).reduce((a, b) => a + b);
  };

  setErrorMessage = () => {
    const errorMessage = this.getCartTotal() === 0 && "No items in cart";
    this.setState({ emptyCartError: errorMessage });
  };

  render() {
    const itemsArray = [
      {
        photo: "LesPaul",
        alt: "Gibson Les Paul",
        headerSixText: "Gibson Les Paul",
        paraText: "Color: Cherry Burst",
        price: 3000,
        product: "guitar",
      },
      {
        photo: "Picks",
        alt: "Dunlop Guitar Picks",
        headerSixText: "Dunlop Guitar Picks",
        paraText: "Color: Assorted",
        price: 25,
        product: "picks",
      },
      {
        photo: "QuarterInchCable",
        alt: "Quarter Inch Cable",
        headerSixText: "Quarter Inch Guitar Cable",
        paraText: "Length: 6ft",
        price: 30,
        product: "cable",
      },
      {
        photo: "Wah",
        alt: "Ernie Ball Wah Pedal",
        headerSixText: "Ernie Ball",
        paraText: "Wah Pedal",
        price: 200,
        product: "wah",
      },
      {
        photo: "Marshall",
        alt: "Marshall Combo Amp",
        headerSixText: "Marshall",
        paraText: "JVM210C 100W Combo Amp",
        price: 3100,
        product: "marshall",
      },
    ];

    return (
      <div className={style.cart}>
        <input
          type="button"
          onClick={() => this.props.nextPage("home-page")}
          value="back to Home"
        />
        <div className={style.flexContainer}>
          <div className={style.left}>
            <div className={style.item}>
              <div className={style.imageAndInfo}>
                <h2>Product</h2>
              </div>
              <div className={style.numbers}>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Total Price</h2>
              </div>
            </div>

            {itemsArray.map(
              (item) =>
                this.state.display[item.product] === "visible" && (
                  <CartItem
                    key={`key-${item.product}`}
                    src={PHOTOS[item.photo]}
                    alt={item.alt}
                    description={
                      <div>
                        <h6>{item.headerSixText}</h6>
                        <p>{item.paraText}</p>
                      </div>
                    }
                    price={item.price}
                    selectName="item-quantity"
                    selectId="item-quantity"
                    selectorOnChange={(e) => this.setQuantity(e, item.product)}
                    quantity={this.state.quantity[item.product]}
                    removeItem={() => this.removeItem(item.product)}
                    setErrorMessage={() => this.setErrorMessage()}
                  />
                )
            )}
          </div>
          <div className={style.right}>
            <p className={style.totalItems}>{`Items in Cart: ${Object.values(
              this.state.quantity
            ).reduce((a, b) => a + b)}`}</p>
            <p className={style.totalPrice}>
              {`
                  Total: 
                    ${Object.entries(this.state.quantity).reduce(
                      (total, [key, value]) => {
                        return total + value * this.state.price[key];
                      },
                      0
                    )}
                `}
            </p>
            <input
              name="checkout"
              type="button"
              onClick={() => {
                this.setErrorMessage();
                this.getCartTotal() > 0 && this.props.nextPage("shipping");
              }}
              value="next to shipping"
            />
            <br />
            <label className={style.errorMessage} htmlFor="checkout">
              {this.state.emptyCartError}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
