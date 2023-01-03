

import Header from './component/Header';
import Home from './component/Home';
import Cart from './component/Cart';
import AddNewProduct from './component/AddNewProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import EditProduct from './component/EditProduct';
function App() {

  const toastObj = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
  const notifySuccess = (t) => toast.success(t,toastObj);
  const notifyWarning = (t) => toast.warn(t,toastObj);
  const notifyError = (t) => toast.error(t,toastObj);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home notifySuccess = {notifySuccess}  notifyError = {notifyError} notifyWarning = {notifyWarning} />} />
          <Route path="/cart" element={<Cart notifySuccess = {notifySuccess} />} />
          <Route path="/edit/:id" element={<EditProduct notifySuccess = {notifySuccess}  notifyWarning = {notifyWarning} notifyError = {notifyError}/>} />
          <Route path="/addnewproduct" element={<AddNewProduct notifySuccess = {notifySuccess}  notifyError = {notifyError} notifyWarning = {notifyWarning}/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
