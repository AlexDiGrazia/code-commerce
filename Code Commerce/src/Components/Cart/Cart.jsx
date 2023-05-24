import React from "react";
import style from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import { PHOTOS } from "../../Photos/photos";
import { formatToUSDCurrency } from "../../JS/functions";
import InputBase from "../InputBase/InputBase";
import InvoiceLine from "../InvoiceLine/InvoiceLine";
import Bag from "../Bag/Bag";
import Shipping from "../Shipping/Shipping";


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
    screenOnDisplay: "bag",
    shipping: 'free',
  };

  handleState = (key, value) => {
    this.setState({ [key]: value })
  }

  setDisplayScreen = (component) => {
    this.setState({ screenOnDisplay: component})
  }

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
    const {
      quantity,
      display,
      price,
      emptyCartError,
      discountPercentage,
      promoCode,
      screenOnDisplay,
      shipping
    } = this.state;

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
          const percent = promoCode === "TWENTY" && 0.2;
          this.setState({ discountPercentage: percent });
        },
      },
    ];

    const subTotal = Object.entries(quantity).reduce((total, [key, value]) => {
      return total + value * price[key];
    }, 0);

    const discount = discountPercentage ? subTotal * discountPercentage : "-";

    const shippingPrice = shipping === 'free' ? 0 : 5;
    const total = (Number.isInteger(discount) ? subTotal - discount : subTotal) + shippingPrice;

    const invoiceInfo = [
      {
        name: "Cart:",
        price: `${Object.values(this.state.quantity).reduce(
          (a, b) => a + b
        )} items`,
      },
      {
        name: "Subtotal:",
        price: formatToUSDCurrency(subTotal),
      },
      {
        name: "Shipping & Handling:",
        price: shipping === "$5.00" ? formatToUSDCurrency(shippingPrice) : "-",
      },
      {
        name: "Discount:",
        price: formatToUSDCurrency(discount),
      },
      {
        name: "Total:",
        price: formatToUSDCurrency(total),
      },
    ];

    const componentsObject = {
      bag: (
        <Bag
          display={display}
          quantity={quantity}
          setQuantity={(e, product) => this.setQuantity(e, product)}
          removeItem={(product) => this.removeItem(product)}
        />
      ),
      shipping: (
        <Shipping 
          setDisplayScreen={(component) => this.setDisplayScreen(component)}
          handleState={this.handleState}
          />
        )
    };

    return (
      <div className={style.cart}>
        <input
          className={style.returnHome}
          type="button"
          onClick={() => this.props.nextPage("home-page")}
          value="back to Home"
        />
        <div className={style.flexContainer}>
          <div className={style.left}>{componentsObject[screenOnDisplay]}</div>
          <div className={style.right}>
            <h2 className={style.summary}>Summary</h2>
            
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
                this.getCartTotal() > 0 && this.setDisplayScreen("shipping");
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
