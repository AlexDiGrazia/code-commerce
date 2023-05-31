import React from "react";
import style from "./Select.module.css"
import { capitalize } from "../../JS/functions";

class Select extends React.Component {
  render() {

    const { htmlFor, array, selected, label} = this.props
    return (
      <div>
        {label && <label htmlFor={htmlFor} className={style.label}>
            {capitalize(htmlFor)}
          </label>}
          <select name={htmlFor} id={htmlFor} className={style.select}>
            <option defaultValue>{selected}</option>
            {array.map((country) => (
              <option>{country}</option>
            ))}
          </select>
      </div>
    )
  }
}

export default Select