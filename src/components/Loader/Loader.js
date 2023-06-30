import React from 'react';
import spinner from '../../assets/images/spinner.svg';
import "./Loader.scss";

const Loader = () => {
  return (
    <div>
        <div className = "loader">
            <img src = {spinner} alt = "loader" />
        </div>
    </div>
  )
}

export default Loader