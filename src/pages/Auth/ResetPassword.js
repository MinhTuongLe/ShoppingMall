import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "../../App.scss";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {});
  };

  return (
    <div style={{ width: "100vw" }}>
      <div className="grid wide">
        <div className="row row-formated">
          <div className="c-5">
            <img
              src="https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
              alt="img login"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="c-7">
            <div>
              <h1>Reset Password</h1>
              <form onSubmit={resetPassword}>
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Reset Password</button>
                <section>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </section>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
