import { Route, Routes, Outlet, Navigate, BrowserRouter as Router, } from "react-router-dom";
import Dashboard from './components/pages/Dashboard';
import MainLayout from './components/layout-component/MainLayout';
import LoginLayout from './components/layout-component/LoginLayout';
import LoginAndRegister from './components/pages/auth/LoginAndRegister';
import './App.scss';
import { AuthProvider, useAuth } from "./auth/authProvider";
import Car from "./components/pages/customer/Car";
import AddEditCar from "./components/pages/customer/AddEditCar";
import { API_URL } from "./config";



function App() {
  console.log(API_URL)
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<UnProtectedRoutes />}>
            <Route path="/" element={<LoginLayout />}>
              <Route path="/" element={<LoginAndRegister />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cars" element={<Car />} />
              <Route path='/cars/addcar' element={<AddEditCar/>}/>
              {/* <Route path="/create_contest" element={<CreateContest />} />
              <Route path="/add_new_contests" element={<AddNewContest />} />
              <Route path="/users" element={<UserListing />} />
              <Route path='/user/profile' element={<Profile/>} /> */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
const ProtectedRoutes = () => {
  const {user, loading} = useAuth();
  console.log("user, loading",user, loading)
  const isAuthenticated = user?.name ? true :  false ;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
const UnProtectedRoutes = () => {
  const {user, loading} = useAuth();
  console.log("user, loading",user, loading)
  const isAuthenticated = user?.name ? true :  false ;
  return isAuthenticated === true ?  <Navigate to="/dashboard" /> : <Outlet />;
};

export default App;
