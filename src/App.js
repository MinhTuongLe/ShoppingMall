import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, CartPage, CategoryPage } from "./pages/index";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/category/:id" element={<CategoryPage/>} />
        <Route path="/cart" element={<CartPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
