import React from "react";
import "./Footer.scss";
import "../../App.scss";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { saveContactURL } from "../../redux/ContactSlice";

const getDate = new Date();

const getCurrentYear = getDate.getFullYear();
const Footer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentURL = window.location.href;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleContact = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      return navigate("/contact");
    }
    dispatch(saveContactURL(currentURL + "/contact"));
    navigate("/login");
  };

  return (
    <div className="grid footer-section">
      <div className="grid wide">
        <div className="row footer-top-section row-formated">
          <div className="c-3 footer-col">
            <h3>Links</h3>
            <ul className="footer-col--list">
              <li className="footer-col--item">About us</li>
              <li className="footer-col--item">Contact us</li>
              <li className="footer-col--item">Blog</li>
              <li className="footer-col--item">FAQ's</li>
            </ul>
          </div>
          <div className="c-3 footer-col">
            <h3>Policies</h3>
            <ul className="footer-col--list">
              <li className="footer-col--item">Terms & Conditions</li>
              <li className="footer-col--item">Cookies Policy</li>
              <li className="footer-col--item">Data Policy</li>
            </ul>
          </div>
          <div className="c-3 footer-col">
            <h3>About Shopping Hub</h3>
            <ul className="footer-col--list">
              <li className="footer-col--item">Company Info</li>
              <li className="footer-col--item">Branches</li>
              <li className="footer-col--item">Store</li>
            </ul>
          </div>
          <div className="c-3 footer-col">
            <h3>Contacts</h3>
            <ul className="footer-col--list">
              <li className="footer-col--item">
                <i class="fa-solid fa-phone"></i>
                +84 834091202
              </li>
              <li className="footer-col--item" onClick={handleContact}>
                <i class="fa-solid fa-envelope"></i>
                leminhtuong09122002@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div className="row footer-bottom-section row-formated">
          <h6 className="copy-right">© {getCurrentYear} All Rights Reserved</h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;
