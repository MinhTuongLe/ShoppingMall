import React, { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import "../../App.scss";
import { useNavigate, Link } from "react-router-dom";
import { saveContactURL } from "../../redux/ContactSlice";
import { selectEmail, selectIsLoggedIn } from "../../redux/AuthSlice";
import { toast } from "react-toastify";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import "./ContactPage.scss";
import { Button } from "react-bootstrap";

const ContactPage = () => {
  const currentForm = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userEmail = useSelector(selectEmail);
  const currentURL = window.location.href;

  const { status: loginStatus } = useSelector((state) => state.auth);

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
        .then((result) => {
          toast.success("Successfully send feedback!", { autoClose: 1000 });
        })
        .catch((error) => {
          toast.error("Failed send feedback!", { autoClose: 1000 });
        });
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

  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;
  return (
    <div className="contact-page">
      <div className="address grid wide">
        <Link to="/" className="address-link">
          <i className="fas fa-home"></i>
        </Link>
        <i className="fas fa-chevron-right address-link"></ i>
        <span className="address-link">Contact</span>
      </div>
      <div className="grid wide" style={{padding:"1%"}}>
        <div className="row row-formated" style={{justifyContent:"space-between"}}>
          <h1 style={{ color: "#5193b3" }}>Contact Us</h1>
          <div className="c-5 xl-6 lg-6 _sm-12">
            <form ref={currentForm} onSubmit={sendFeedBack} className="contact-form">
              <div className="group-contact">
                <label className="contact-label">Name</label>
                <div>
                  <input
                    className="contact-value"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="group-contact">
                <label className="contact-label">Email</label>
                <div>
                  <input
                    className="contact-value"
                    type="text"
                    disabled
                    value={userEmail}
                  />
                </div>
              </div>
              <div className="group-contact">
                <label className="contact-label">Subject</label>
                <div>
                  <input
                    className="contact-value"
                    type="text"
                    placeholder="Your Subject"
                  />
                </div>
              </div>
              <div className="group-contact">
                <label className="contact-label">Feedback</label>
                <div>
                  <textarea
                    className="contact-value"
                    name="message"
                    cols="40"
                    rows="3"
                    placeholder="Your Feedback"
                  ></textarea>
                </div>
              </div>
              <Button type="submit" className="button-submit">Send Feedback</Button>
            </form>
          </div>
          <div className="c-5 xl-6 lg-6 _sm-12">
            <div className="information-box">
              <h3 style={{marginBottom:'18px', color:"#fff"}}>Our Contact Information</h3>
              <p className="contact-label">
                Fill out the form or contact us through the contact information
                below
              </p>
              <ul className="contact-information">
                <li className="contact-information--list">
                  <i class="contact-information-icon fa-solid fa-phone"></i>
                  +84 834091202
                </li>
                <li className="contact-information--list">
                  <i class="contact-information-icon fa-solid fa-envelope"></i>
                  leminhtuong09122002 @gmail.com
                </li>
                <li className="contact-information--list">
                  <i class="contact-information-icon fa-solid fa-location-dot"></i>
                  Ho Chi Minh City
                </li>
                <li className="contact-information--list">
                  <i class="contact-information-icon fa-brands fa-facebook"></i>Lê Minh Tường
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
