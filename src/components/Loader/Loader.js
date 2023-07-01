import React from 'react';
import {Spinner} from '../../assets/images/index';
import "./Loader.scss";

const Loader = () => {
  return (
    <div>
        <div className = "loader">
            <img src = {Spinner} alt = "loader" />
        </div>
    </div>
  )
}

export default Loader