import '../node_modules/bootstrap/dist/css/bootstrap.css';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import ProductsbyCategory from './components/ProductsbyCategory';
import ProductDescription from './pages/ProductDescription';
import CartPage from './pages/CartPage';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/category/:title' element={<ProductsbyCategory />}></Route>
          <Route path='/product/:id' element={<ProductDescription />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
