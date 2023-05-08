import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/product-list" Component={ProductList} />
          <Route path="/cart" Component={Cart} />
          <Route path="/add-product" Component={AddProduct} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
