import React from "react";
import style from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import { PHOTOS } from "../../Photos/photos";
import { formatToUSDCurrency } from "../../JS/functions";
import InputBase from "../InputBase/InputBase";
import InvoiceLine from "../InvoiceLine/InvoiceLine";

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
    discountPercentage: "",
    promoCode: "",
  };

  setQuantity = (e, product) => {
    this.setState((prevState) => ({
      quantity: {
        ...prevState.quantity,
        [product]: +e.target.value,
      },
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

    const promoInputs = [
      {
        id: "promo",
        type: "text",
        name: "promo",
        placeholder: "Code",
        classList: style.promoCodeInput,
        onChange: (e) => this.setState({ promoCode: e.target.value }),
      },
      {
        id: "applyPromo",
        type: "button",
        name: "applyPromo",
        value: "APPLY",
        placeholder: null,
        classList: style.applyPromoButton,
        onClick: () => {
          const percent = this.state.promoCode === "TWENTY" && 0.2;
          this.setState({ discountPercentage: percent });
        },
      },
    ];

    const subTotal = Object.entries(this.state.quantity).reduce(
      (total, [key, value]) => {
        return total + value * this.state.price[key];
      },
      0
    );

    const discount = this.state.discountPercentage
      ? subTotal * this.state.discountPercentage
      : "-";

    const total = Number.isInteger(discount) ? subTotal - discount : subTotal;  

    const invoiceInfo = [
      {
        name: "Cart Subtotal:",
        price: formatToUSDCurrency(subTotal),
      },
      {
        name: "Shipping & Handling:",
        price: "-",
      },
      {
        name: "Discount:",
        price: formatToUSDCurrency(discount),
      },
      {
        name: "Cart Total:",
        price: formatToUSDCurrency(total),
      },
    ];

    return (
      <div className={style.cart}>
        <input
          className={style.returnHome}
          type="button"
          onClick={() => this.props.nextPage("home-page")}
          value="back to Home"
        />
        <div className={style.flexContainer}>
          <div className={style.left}>
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
                        <p>{formatToUSDCurrency(item.price)}</p>
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
            <h2 className={style.summary}>Summary</h2>
            {/*  <p className={style.totalItems}>{`Cart: ${Object.values(
              this.state.quantity
            ).reduce((a, b) => a + b)} items`}</p> */}
            <h5 className={style.promoPrompt}>Do you have a Promo Code?</h5>
            <div className={style.promoContainer}>
              {promoInputs.map((obj) => (
                <InputBase
                  id={obj.id}
                  type={obj.type}
                  name={obj.name}
                  value={obj.value}
                  placeholder={obj.placeholder}
                  classList={obj.classList}
                  onClick={obj.onClick}
                  onChange={obj.onChange}
                />
              ))}
            </div>
            <div className={style.cartInvoice}>
              {invoiceInfo.map((obj) => (
                <InvoiceLine name={obj.name} price={obj.price} />
              ))}
            </div>

            <input
              className={style.nextShipping}
              name="checkout"
              type="button"
              onClick={() => {
                this.setErrorMessage();
                this.getCartTotal() > 0 && this.props.nextPage("shipping");
              }}
              onBlur={() => this.setState({ emptyCartError: "" })}
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
