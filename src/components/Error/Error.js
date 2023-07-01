import React from 'react';
import "./Error.scss";
import {error} from "../../assets/images/index";

const Error = () => {
  return (
    <div>
        <div class = "error">
            <img src = {error} alt = "error" />
        </div>
    </div>
  )
}

export default Error