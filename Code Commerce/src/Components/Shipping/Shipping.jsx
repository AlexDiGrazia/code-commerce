import React from "react";
import style from "./Shipping.module.css";
import InputBase from "../InputBase/InputBase";
import { countryList, states, cities } from "../../JS/constants";
import Select from "../Select/Select";
import { formatPhoneNumber } from "../../JS/functions";

class Shipping extends React.Component {
  mapInputBase = (array) => {
    return array.map((obj) => (
      <InputBase
        id={obj.id}
        type={obj.type}
        text={obj.text}
        classList={obj.classList}
        labelClassList={obj.labelClassList}
        inputBaseClass={style.inputBaseClass}
        shortDiv={obj.shortDiv}
        onChange={obj.onChange}
        value={obj.value}
        maxLength={obj.maxLength}
      />
    ));
  };

  // mapPhoneInputs = (array) => {
  //   return array.map((obj) => (
  //     <div className={style.flex}>{obj.map((item) => mapInputBase(item))}</div>
  //   ));
  // };

  handleChange = (e, value) => {
    this.setState((prev) => ({
      allFields: {
        ...prev.allFields,
        [value]: e.target.value,
      },
    }));
  };

  render() {
    const {
      setDisplayScreen,
      handleState,
      handleShippingState,
      ensureNumbers,
      shippingPageState,
      phoneNumberStateSetter
    } = this.props;

    const inputsArray = [
      {
        id: "addressTitle",
        type: "text",
        text: "Address title",
        classList: style.inputWidth,
        labelClassList: style.label,
        onChange: (e) => handleShippingState("addressTitle", e.target.value.trim()),
        value: shippingPageState.addressTitle,
      },
      {
        id: "fullName",
        type: "text",
        text: "Full Name",
        classList: style.inputWidth,
        labelClassList: style.label,
        onChange: (e) => handleShippingState("fullName", e.target.value.trim()),
        value: shippingPageState.fullName,
      },
      {
        id: "streetAddress",
        type: "text",
        text: "Street Address",
        classList: style.biggerInputWidth,
        labelClassList: style.label,
        onChange: (e) => handleShippingState("streetAddress", e.target.value.trim()),
        value: shippingPageState.streetAddress,
      },
    ];

    const zipcode = [
      {
        id: "zipCode",
        type: "text",
        text: "Zipcode",
        classList: style.shortInputWidth,
        labelClassList: style.label,
        shortDiv: style.shortDiv,
        onChange: (e) => ensureNumbers(e, "zipcode"),
        value: shippingPageState.zipcode,
        maxLength: 5,
      },
    ];

    const phoneArrays = [
      [
        {
          id: "areaCode",
          type: "text",
          text: "Cell Phone",
          classList: style.areaCode,
          labelClassList: style.label,
          shortDiv: style.shortDiv,
          onChange: (e) => ensureNumbers(e, "cellPhoneAreaCode"),
          value: shippingPageState.cellPhoneAreaCode,
          maxLength: 3,
        },
        {
          id: "cellphone",
          type: "text",
          classList: style.phoneNumber,
          onChange: (e) => phoneNumberStateSetter(e, "cellPhoneNumber"),
          value: shippingPageState.cellPhoneNumber,
          maxLength: 7,
        },
      ],
      [
        {
          id: "teleAreaCode",
          type: "text",
          text: "Telephone",
          classList: style.areaCode,
          labelClassList: style.label,
          shortDiv: style.shortDiv,
          onChange: (e) => ensureNumbers(e, "teleAreaCode"),
          value: shippingPageState.teleAreaCode,
          maxLength: 3,
        },
        {
          id: "telephone",
          type: "text",
          classList: style.phoneNumber,
          onChange: (e) => phoneNumberStateSetter(e, "telephoneNumber"),
          value: shippingPageState.telephoneNumber,
          maxLength: 7,
        },
      ],
    ];

    const shippingMethods = [
      {
        id: "standard",
        description: "Delivery in 4-6 Business Days - Free ($40 min.)",
        defaultChecked: true,
        shippingState: "free",
      },
      {
        id: "express",
        description: "Delivery in 1-3 Business Days - $5",
        defaultChecked: false,
        shippingState: "$5.00",
      },
    ];

    const selectorsArray = [
      {
        htmlFor: "country",
        array: countryList,
        selected: "-Country",
        value: "country",
      },
      {
        htmlFor: "state",
        array: states,
        selected: "-State",
        value: "state",
      },
      {
        htmlFor: "city",
        array: cities,
        selected: "-City",
        value: "city",
      },
    ];

    return (
      <div className={style.backgroundColor}>
        <h2>Shipping Information</h2>
        {this.mapInputBase(inputsArray)}
        <div className={style.jurisdiction}>
          {this.mapInputBase(zipcode)}
          <div className={style.rightFlexBox}>
            {selectorsArray.map((obj) => (
              <Select
                htmlFor={obj.htmlFor}
                array={obj.array}
                selected={obj.selected}
                value={shippingPageState[obj.value]}
                onChange={(e) => handleShippingState([obj.value], e.target.value )}
                disabled={shippingPageState[obj.value]}
              />
            ))}
          </div>
        </div>
        {phoneArrays.map((obj) => (
          <div className={style.flex}>{this.mapInputBase(obj)}</div>
        ))}
        <h2>Shipping Methods</h2>
        {shippingMethods.map((obj) => (
          <div className={style.flex}>
            <input
              className={style.marginRight}
              type="radio"
              name="shippingMethod"
              id={obj.id}
              defaultChecked={obj.defaultChecked}
              onChange={() => handleState("shippingOption", obj.shippingState)}
            />
            <label className={style.marginRight} htmlFor="shippingMethod">
              {obj.id.toUpperCase()}
            </label>
            <p className={style.paraMargin}>{obj.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Shipping;

{
  /* <input
          className={style.button}
          type="button"
          onClick={() => setDisplayScreen("bag")}
          value="back to cart"
        />
        <input
          className={style.button}
          type="button"
          onClick={() => this.props.nextPage("payment")}
          value="next to payment"
        /> */
}
