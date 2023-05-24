import React from "react";
import style from "./InputBase.module.css";

class InputBase extends React.Component {
  render() {
    const {
      id,
      type,
      text,
      name,
      value,
      placeholder,
      onChange,
      onClick,
      onBlur,
      errorM,
      classList,
      labelClassList,
      inputBaseClass,
      shortDiv,
    } = this.props;
    return (
      <div className={`${inputBaseClass} ${shortDiv}`}>
        <label htmlFor={id} className={`${style.label} ${labelClassList}`}>
          {text}
        </label>
        <input
          id={id}
          type={type}
          className={`${style.input} ${classList}`}
          text={text}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          errorM={errorM}
        />
        {errorM && <p className={style.error}>{errorM}</p>}
        <br />
      </div>
    );
  }
}

export default InputBase;
