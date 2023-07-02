import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "../../App.scss";
import { toast } from "react-toastify";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useSelector } from "react-redux";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const {status: loginStatus} = useSelector(state => state.auth)
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        toast.success("Successfully register!", { autoClose: 1000});
        navigate("/");
      })
      .catch((error) => {
        toast.error("Failed register!", { autoClose: 1000});
      });
  };
  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;
  return (
    <div style={{ width: "100vw" }}>
      <div className="grid wide">
        <div className="row row-formated">
          <div className="c-7">
            <div>
              <h1>Register</h1>
              <form onSubmit={registerUser}>
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
                <button type="submit">Register</button>
                <span>
                  Already has an account? <Link to="/login">Login</Link>
                </span>
              </form>
            </div>
          </div>
          <div className="c-5">
            <img
              src="https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
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
