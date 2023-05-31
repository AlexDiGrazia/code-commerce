import React from "react";
import style from "./Payment.module.css";
import InputBase from "../InputBase/InputBase";
import Select from "../Select/Select";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faDisplay } from "@fortawesome/free-solid-svg-icons";

// import inputBaseStyle from "../InputBase/InputBase.module.css"

class Payment extends React.Component {
  state = {
    cvvInfo: "displayNone",
  };

  mapInputBase = (array) => {
    return array.map((obj) => (
      <InputBase
        id={obj.id}
        text={obj.text}
        name={obj.name}
        inputBaseClass={style.inputBaseClass}
        labelClassList={obj.labelClassList}
        classList={obj.classList}
        maxLength={obj.maxLength}
        shortDiv={obj.shortDiv}
      />
    ));
  };

  showInfo = {};
  render() {
    const inputsArray = [
      {
        id: "name",
        text: "Cardholder Name",
        name: "name",
        labelClassList: style.label,
        classList: style.inputWidth,
      },
      {
        id: "number",
        text: "Card Number",
        name: "number",
        labelClassList: style.label,
        classList: style.inputWidth,
      },
    ];

    const cvv = [
      {
        id: "cvv",
        text: "CVV",
        name: "cvv",
        labelClassList: style.label,
        classList: style.cvvInputWidth,
        maxLength: 3,
        shortDiv: style.shortDiv,
      },
    ];

    const yearsArray = [];
    const currentYear = moment().year();
    for (let year = currentYear; year < currentYear + 10; year++) {
      yearsArray.push(year);
    }

    return (
      <div className={style.background}>
        <h2>Payment Information</h2>
        {this.mapInputBase(inputsArray)}
        <div className={style.expiry}>
          <Select
            htmlFor="Exp.Date"
            array={moment.months()}
            selected=" -Month"
            label={true}
          />
          <Select selected=" -Year" label={false} array={yearsArray} />
        </div>
        <div className={style.outerFlex}>
          <div className={style.cvvDiv}>
            {this.mapInputBase(cvv)}
            <FontAwesomeIcon
              icon={faCircleQuestion}
              onMouseOver={() => this.setState({ cvvInfo: "displayBlock" })}
              onMouseOut={() => this.setState({ cvvInfo: "displayNone" })}
            />
          </div>
          <div
            className={`${style[this.state.cvvInfo]} ${style.cvvInfo}`}
          ></div>
        </div>

        <input
          className={style.buttons}
          type="button"
          onClick={() => this.props.nextPage("shipping")}
          value="back to shipping"
        />
        <input
          className={style.buttons}
          type="button"
          onClick={() => this.props.nextPage("confirmation")}
          value="next to confirmation"
        />
      </div>
    );
  }
}

export default Payment;
