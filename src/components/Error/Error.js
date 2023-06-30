import React from 'react';
import "./Error.scss";
import error from "../../assets/images/error.png";

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