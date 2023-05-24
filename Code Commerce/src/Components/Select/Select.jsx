import React from "react";
import style from "./Select.module.css"
import { capitalize } from "../../JS/functions";

class Select extends React.Component {
  render() {

    const { htmlFor, array} = this.props
    return (
      <div>
        <label htmlFor={htmlFor} className={style.label}>
            {capitalize(htmlFor)}
          </label>
          <select name={htmlFor} id={htmlFor} className={style.select}>
            <option defaultValue>-Select</option>
            {array.map((country) => (
              <option>{country}</option>
            ))}
          </select>
      </div>
    )
  }
}

export default Select