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
              <h1>Login</h1>
              <form onSubmit={loginUser}>
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
                <button type="submit">Login</button>
                <Link to="/reset-password">
                  <button>Reset password</button>
                </Link>
                <span>-- or --</span>
              </form>
              <section>
                <button onClick={signInWithGoogle}>
                  <i class="fa-brands fa-google"></i>
                  Login with Google
                </button>
                <span>
                  Don't have an account? <Link to="/register">Register</Link>
                </span>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
