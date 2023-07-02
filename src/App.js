import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  CartPage,
  CategoryPage,
  ProductDetailsPage,
  ProductsPage,
  Login,
} from "./pages/index";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
