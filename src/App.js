
import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Buildlink from './components/buildlink/Buildlink';
import Reviews from './components/reviews/Reviews';
//for login and register
import Register from './components/auth/Register';
import Login from './components/auth/Login'; // Make sure this import is correct
import AdminLogin from './components/admin/AdminLogin';
//auth user
import { AuthProvider } from './contexts/AuthContext';
// auth admin
import { AdminAuthProvider } from './contexts/AdminAuthContext';
//for builder
import PCBuilder from './components/pcbuilder/PCBuilder';

////////////////////////
import BuildsManagement from './components/admin/BuildsManagement';




import AdminPanel from './components/admin/AdminPanel';
import CPUManagement from './components/admin/CPUManagement';
import GraphicsCardManagement from './components/admin/GraphicsCardManagement';
import MonitorManagement from './components/admin/MonitorManagement';
import MotherboardManagement from './components/admin/MotherboardManagement';
import PowerSupplyManagement from './components/admin/PowerSupplyManagement';
import RamManagement from './components/admin/RamManagement';
import StorageManagement from './components/admin/StorageManagement';
import Footer from './components/footer/Footer';










function App() {
  const [builds, setBuilds] = useState();
  const [build, setBuild] = useState();
  const [reviews, setReviews] = useState([]);
  

  const getBuilds = async () => {
    try{

      const response = await api.get("/api/v1/builds");

      console.log(response.data);
      setBuilds(response.data);
    }
    catch(err)
    {
      console.log(err);
    }
  }


  const getBuildData = async (buildId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/builds/${buildId}`);

        const singleBuild = response.data;

        setBuild(singleBuild);

        setReviews(singleBuild.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(() => {
    getBuilds();
  },[])



  return (
    <AuthProvider>
      <AdminAuthProvider>
    <div className="App">
      
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home builds={builds}/>}></Route>
            <Route path="/Buildlink/:ytTrailerId" element={<Buildlink/>}></Route>
            <Route path="/Reviews/:buildId" element ={<Reviews getBuildData = {getBuildData} build={build} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="/pcbuilder" element={<PCBuilder />} />
            //login
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/register" element={<Register/>} /> */
            <Route path="/admin/login" element={<AdminLogin />} />

            //admin parts+edit items
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/cpu" element={<CPUManagement />} />
            <Route path="/admin/graphicscard" element={<GraphicsCardManagement />} />
            <Route path="/admin/monitor" element={<MonitorManagement />} />
            <Route path="/admin/motherboard" element={<MotherboardManagement />} />
            <Route path="/admin/powersupply" element={<PowerSupplyManagement />} />
            <Route path="/admin/ram" element={<RamManagement />} />
           <Route path="/admin/storage" element={<StorageManagement />} />
           //////////////////////////////////////////////////////////////////
           <Route path="/admin/builds" element={<BuildsManagement />} />
           //////////////////////////////////////////////////////////////////
           
          </Route>
      </Routes>

      
  
    </div>
     </AdminAuthProvider>
    </AuthProvider>
    
  );
}

export default App;
