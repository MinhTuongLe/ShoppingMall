import React, { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import "../../App.scss";
import { useNavigate } from "react-router-dom";
import {saveContactURL } from "../../redux/ContactSlice";
import { selectIsLoggedIn } from "../../redux/AuthSlice";

const ContactPage = () => {
  const currentForm = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentURL = window.location.href;
  
  const sendFeedBack = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      emailjs
        .sendForm(
          "service_shoppingmall",
          "template_1twwqaa",
          currentForm.current,
          "MoNGHMtErZX-Kl2CJ"
        )
        .then((result) => {})
        .catch((error) => {});
      e.target.reset();
      navigate("/");
    } else {
      dispatch(saveContactURL(currentURL));
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(saveContactURL(""));
  }, [useSelector((state) => state.contact)]);
  return (
    <div style={{ width: "100vw" }}>
      <div className="grid wide">
        <div className="row row-formated">
          <div className="c-6">
            <h1>Contact Us</h1>
            <form ref={currentForm} onSubmit={sendFeedBack}>
              <div>
                <label>Name</label>
                <input type="text" placeholder="Your Name" />
              </div>
              <div>
                <label>Email</label>
                <input type="text" placeholder="Your Email" />
              </div>
              <div>
                <label>Subject</label>
                <input type="text" placeholder="Your Subject" />
              </div>
              <div>
                <label>Feedback</label>
                <textarea
                  name="message"
                  cols="30"
                  rows="8"
                  placeholder="Your Feedback"
                ></textarea>
              </div>
              <button type="submit">Send Feedback</button>
            </form>
          </div>
          <div className="c-6">
            <div>
              <h1>Our Contact Information</h1>
              <p>
                Fill out the form or contact us through the contact information
                below
              </p>
              <ul>
                <li>
                  <i class="fa-solid fa-phone"></i>
                  +84 834091202
                </li>
                <li>
                  <i class="fa-solid fa-envelope"></i>
                  leminhtuong09122002@gmail.com
                </li>
                <li>
                  <i class="fa-solid fa-location-dot"></i>
                  Ho Chi Minh City
                </li>
                <li>
                  <i class="fa-brands fa-facebook"></i>Lê Minh Tường
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
