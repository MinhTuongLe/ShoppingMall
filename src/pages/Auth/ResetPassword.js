import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "../../App.scss";
import { toast } from "react-toastify";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useSelector } from "react-redux";
import resetPasswordImage from "../../assets/images/forgot.png";
import "./Auth.scss";
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { status: loginStatus } = useSelector((state) => state.auth);

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Successfully reset password!", { autoClose: 1000 });
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Failed reset password!", { autoClose: 1000 });
      });
  };
  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;
  return (
    <div className="reset-password-page">
      <div className="reset-password-section">
        <div className="grid wide">
          <div
            className="row row-formated"
            style={{ justifyContent: "center" }}
          >
            <div className="c-3 image-section xl-4 md-12 sm-12">
              <img
                src={resetPasswordImage}
                alt="img login"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="c-4 xl-5 lg-7 md-12 sm-12">
              <div>
                <form onSubmit={resetPassword} className="auth-form">
                  <h1 style={{ color: "#5193b3", textAlign: "center" }}>
                    Reset Password
                  </h1>
                  <div className="reset-password-input">
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit">Reset Password</Button>
                  </div>
                  <div className="orther-choices-section-2">
                    <Link
                      to="/login"
                      className="orther-choices-section-2--item"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="orther-choices-section-2--item"
                    >
                      Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
