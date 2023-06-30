import React from "react";
import "./Footer.scss";
import "../../App.scss";
const getDate = new Date();
const getCurrentYear = getDate.getFullYear();
const Footer = () => {
  return (
    <div className="grid footer-section">
      <div className="grid wide">
        <div className="row footer-top-section">
          <div className="c-3 footer-col">
            <h3>Links</h3>
            <ul className="footer-col--list">
              <li className="footer-col--item">
                <a href="/">About us</a>
              </li>
              <li className="footer-col--item">
                <a href="/">Contact us</a>
              </li>
              <li className="footer-col--item">
                <a href="/">Blog</a>
              </li>
              <li className="footer-col--item">
                <a href="/">FAQ's</a>
              </li>
            </ul>
          </div>
          <div className="c-3 footer-col">
            <h3>Policies</h3>
            <ul className="footer-col--list">
              <li className="footer-col--item">
                <a href="/">Terms & Conditions</a>
              </li>
              <li className="footer-col--item">
                <a href="/">Cookies Policy</a>
              </li>
              <li className="footer-col--item">
                <a href="/">Data Policy</a>
              </li>
            </ul>
          </div>
          <div className="c-3 footer-col">
            <h3>About Shopping Hub</h3>
            <ul className="footer-col--list">
              <li className="footer-col--item">
                <a href="/">Company Info</a>
              </li>
              <li className="footer-col--item">
                <a href="/">Branches</a>
              </li>
              <li className="footer-col--item">
                <a href="/">Store</a>
              </li>
            </ul>
          </div>
          <div className="c-3 footer-col">
            <h3>Contacts</h3>
            <ul className="footer-col--list">
              <li className="footer-col--item">
                <a href="/">
                  <i class="fa-solid fa-phone"></i>
                  +84 834091202
                </a>
              </li>
              <li className="footer-col--item">
                <a href="/">
                  <i class="fa-solid fa-envelope"></i>
                  leminhtuong09122002@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row footer-bottom-section">
          <h6 className="copy-right">© {getCurrentYear} All Rights Reserved</h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;
