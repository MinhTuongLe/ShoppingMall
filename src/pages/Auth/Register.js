import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "../../App.scss";
import { toast } from "react-toastify";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import registerImage from "../../assets/images/register.png";

import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const { status: loginStatus } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        toast.success("Successfully register!", { autoClose: 1000 });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Failed register!", { autoClose: 1000 });
      });
  };
  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;
  return (
    <div className="login-page">
      <div className="grid wide">
        <div className="row row-formated" style={{ justifyContent: "center" }}>
          <div className="c-4">
            <div>
              <form onSubmit={registerUser} className="auth-form">
                <h2 style={{ color: "#5193b3", textAlign: "center" }}>
                  Register
                </h2>
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirmed Password"
                  required
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
                <Button type="submit" style={{ margin: "3% 0" }}>
                  Register
                </Button>
                <section className="orther-choices-section">
                  <span>
                    Already an account?{" "}
                    <Link to="/login" className="register">
                      Login
                    </Link>
                  </span>
                </section>
              </form>
            </div>
          </div>
          <div className="c-3 image-section">
            <img
              src={registerImage}
              alt="img login"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
