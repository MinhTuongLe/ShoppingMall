import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  CartPage,
  CategoryPage,
  ProductDetailsPage,
  ProductsPage,
  Login,
  CheckoutDetailsPage,
  Register,
  ResetPassword,
  ContactPage,
  NotFoundPage
} from "./pages/index";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer style={{ zIndex: 99999999999 }}/>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/checkout-details" element={<CheckoutDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
