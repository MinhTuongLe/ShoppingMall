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

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {status: loginStatus} = useSelector(state => state.auth)

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Successfully reset password!", { autoClose: 1000});
        navigate('/login')
      })
      .catch((error) => {
        toast.error("Failed reset password!", { autoClose: 1000});
      });
  };
  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;
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
