import './App.css';
import { Route,Routes } from "react-router-dom";
// import {useSelector} from 'react-redux'
import HeaderWeb from './components/user/menu/HeaderWeb';
import MenuDisplay from './components/user/menu/MenuDisplay';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import ShippingPage from './pages/ShippingPage';
import Auth from './pages/Auth';
import AdminProductPage from './components/admin/AdminProductPage';
import AddproductBase from './components/admin/product/AddProductBase';
import AddProduct from './components/admin/product/AddProduct';
// import AddColors from './components/admin/colors/AddColors';
import ColorsPage from './components/admin/colors/ColorsPage';
import Sku from './components/admin/sku/Sku';
import Products from './components/admin/products/Products';
import OrderPage from './pages/OrderPage';
import CheckOutPage from './pages/CheckOutPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailedPage from './pages/PaymentFailedPage';
import HeaderCart from './components/user/menu/HeaderCart';
import HeaderLogin from './components/user/menu/HeaderLogin';
import HeaderLogout from './components/user/menu/HeaderLogout';
import GuestShipping from './pages/GuestShipping';
import MemberShipping from './pages/MemberShipping';
import Orders from './components/admin/order/Orders';
import OrderDetail from './components/admin/order/OrderDetail';
import RetunOrders from './components/admin/order/RetunOrders';
import Users from './components/admin/user/Users';
import UserDetail from './components/admin/user/UserDetail';
import Discount from './components/admin/discount/Discount';
import ProductDetail from './components/admin/products/ProductDetail';
import ResetToken from './components/user/token/ResetToken';
import Profile from './components/user/profile/Profile';
import ProfileOrderDetail from './components/user/profile/ProfileOrderDetail';
import SizeChart from './components/user/sizeChart/SizeChart';
import Footer from './components/user/footer/Footer';
// import Loader from './utils/Loader';

function App() {

  // const user = useSelector(state=>state.user.userInfo);

  // console.log('userinfo', user)

  return (
    <div className="App">
      <HeaderWeb />
      <HeaderCart />
      <HeaderLogin />
      <HeaderLogout />
      <MenuDisplay />
      <SizeChart />
      <main>
        
      <Routes>
      <Route path='/' element={<SharedLayout />} >
        <Route index element={<Home />} />
        </Route>
          {/* <Route path="/products/:query" element={<ProductPage/>} /> */}
          <Route path="/products" element={<ProductPage/>} />
          <Route path="/product/:id" element={<ProductDetailPage/>} />
          <Route path="/product_cart" element={<CartPage />} />
          <Route path="/resetPassword/:token" element={<ResetToken />} />
          <Route path="profile" element={<Profile />} ></Route>
          <Route path='profileOrder/:id' element={<ProfileOrderDetail />}/>
          


          <Route path='/order' element={<OrderPage/>}>
             <Route path="shipping" element={<ShippingPage />} >
                <Route path='guest' element={<GuestShipping/>} />
                <Route path='member' element={<MemberShipping/>} />
             </Route>
             <Route path="checkout" element={<CheckOutPage />} />
             <Route path="payment" element={<PaymentPage />} >
                <Route path='success' element={<PaymentSuccess/>} />
                <Route path='failed' element={<PaymentFailedPage/>} />
             </Route>
          </Route>
           <Route path='/auth' element={<Auth/>}>
            <Route path="admin" element={<AdminPage/>} >
               <Route path='product' element={<AdminProductPage/>}>
               <Route path='products' element={<Products/>}/>
               <Route path='productDetail/:id' element={<ProductDetail/>}/>
               <Route path='addProductbase' element={<AddproductBase />} />
               <Route path='addProducts' element={<AddProduct />} />
               <Route path='addColors' element={<ColorsPage  />} />
               <Route path='sku' element={<Sku />} />
               </Route>
               <Route path='orders' element={<Orders />} />
               <Route path='orderDetail/:id' element={<OrderDetail />} />
               <Route path='orderReturn' element={<RetunOrders />} />
               <Route path='users' element={<Users />} />
               <Route path='userDetail/:id' element={<UserDetail />} />
               <Route path='discount' element={<Discount />} />
            </Route>
          </Route>

      </Routes>

      </main>
      <Footer />
      {/* <Loader /> */}
    </div>
  );
}

export default App;


// inside the admin page

   
