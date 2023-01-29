import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./components/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

import axios from "axios";
import {UserContextProvider} from "./contexts/UserContext.jsx";
import AccountPage from "./pages/AccountPage.jsx";

axios.defaults.baseURL = 'http://localhost:8800'
axios.defaults.withCredentials = true
function App() {
  return (
    <UserContextProvider>
    <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<IndexPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/account/:subpage?" element={<AccountPage/>} />
            {/*<Route path="/account/bookings" element={<AccountPage/>} />*/}
            {/*<Route path="/account/places" element={<AccountPage/>} />*/}
        </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
