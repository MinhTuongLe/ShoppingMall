import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase";
import "../../App.scss";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import "./Auth.scss";
import loginImage from "../../assets/images/login.png";
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { status: loginStatus } = useSelector((state) => state.auth);
  const { previousURL: URL } = useSelector((state) => state.cart);
  const { previousContactURL: contactURL } = useSelector(
    (state) => state.contact
  );
  const redirectUser = () => {
    if (URL.includes("cart")) {
      return navigate("/cart");
    }
    if (contactURL.includes("contact")) {
      return navigate("/contact");
    }
    navigate("/");
  };

  const loginUser = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Successfully login!", { autoClose: 1000 });
        redirectUser();
      })
      .catch((error) => {
        toast.error("Failed login!", { autoClose: 1000 });
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Successfully login!", { autoClose: 1000 });
        redirectUser();
      })
      .catch((error) => {
        toast.error("Failed login!", { autoClose: 1000 });
      });
  };

  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;

  return (
    <div className="login-page">
    <div className="login-section">
      <div className="grid wide">
        <div className="row row-formated" style={{ justifyContent: "center" }}>
          <div className="c-3 image-section xl-4 md-12 sm-12">
            <img
              src={loginImage}
              alt="img login"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="c-4 xl-5 lg-7 md-12 sm-12">
            <div>
              <form onSubmit={loginUser} className="auth-form">
              <h2 style={{ color: "#5193b3", textAlign: "center" }}>Login</h2>
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
                <Button type="submit" style={{margin:"3% 0"}}>Login</Button>
                <Link to="/reset-password" className="reset-password">
                  Reset password
                </Link>
                <span style={{margin:"3%", textAlign:"center"}}>-- or --</span>
                <section className="orther-choices-section">
                  <Button onClick={signInWithGoogle}>
                    <i class="fa-brands fa-google" style={{marginRight:"12px"}}></i>
                    Login with Google
                  </Button>
                  <span>
                    Don't have an account? <Link to="/register" className="register">Register</Link>
                  </span>
                </section>
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

export default Login;
