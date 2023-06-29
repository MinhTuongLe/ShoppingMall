import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, CartPage, CategoryPage, ProductDetailsPage } from "./pages/index";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage/>}/>
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
