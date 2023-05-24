import React from "react";
import style from "./Shipping.module.css";
import InputBase from "../InputBase/InputBase";
import { countryList, states, cities } from "../../JS/constants";
import Select from "../Select/Select";

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
      />
    ));
  };

  // mapPhoneInputs = (array) => {
  //   return array.map((obj) => (
  //     <div className={style.flex}>{obj.map((item) => mapInputBase(item))}</div>
  //   ));
  // };

  render() {
    const { setDisplayScreen } = this.props;

    const inputsArray = [
      {
        id: "addressTitle",
        type: "text",
        text: "Address title",
        classList: style.inputWidth,
        labelClassList: style.label,
      },
      {
        id: "fullName",
        type: "text",
        text: "Full Name",
        classList: style.inputWidth,
        labelClassList: style.label,
      },
      {
        id: "streetAddress",
        type: "text",
        text: "Street Address",
        classList: style.biggerInputWidth,
        labelClassList: style.label,
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
        },
        {
          id: "cellphone",
          type: "text",
          classList: style.phoneNumber,
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
        },
        {
          id: "telephone",
          type: "text",
          classList: style.phoneNumber,
          
        },
      ],
    ];

    return (
      <div className={style.backgroundColor}>
        <h2>Shipping Information</h2>
        {this.mapInputBase(inputsArray)}
        <div className={style.jurisdiction}>
          {this.mapInputBase(zipcode)}
          <div className={style.rightFlexBox}>
            <Select htmlFor="country" array={countryList} />
            <Select htmlFor="city" array={cities} />
            <Select htmlFor="state" array={states} />
          </div>
        </div>
        {phoneArrays.map((obj) => (
          <div className={style.flex}>
            {this.mapInputBase(obj)}
          </div>
        ))}
        <input
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
        />
      </div>
    );
  }
}

export default Shipping;
