import Landing from './pages/Landing';
import Search from './pages/Search/Search';
import Login from './pages/loginSignup/Login';
import Signup from './pages/loginSignup/Signup';
import Profile from './pages/profile/Profile';
import BookRide from './pages/bookRide/BookRide';
import { Route, Routes } from 'react-router-dom';
import { PublishRide } from './pages/publishRide/PublishRide';
import Pub from './pages/publishRide/Pub';
import UserDetails from './pages/userDetails/UserDetails';
import Publish from './pages/publishRideD/Publish';
import UserTracking from './pages/userTracking/UserTracking';
import TopBar from './components/topBar/TopBar';
import BookedRides from './pages/viewRides/BookedRides';
import HostedRides from './pages/viewRides/HostedRides';
import ViewQR from './pages/viewRides/ViewQR';
import ScanQR from './pages/viewRides/ScanQR';
import ScanResults from './pages/viewRides/ScanResults';

//import Main from "./components/Main";

function App() {

  
  return (
    <div>
      <TopBar isTrackingEnabled = {true}/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/publish-ride' element={<PublishRide />} />
        <Route path='/book-ride' element={<BookRide />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/pub' element={<Pub />} />
        <Route path='/user-details' element={<UserDetails />} />
        <Route path='/publish' element={<Publish />} />
        <Route path='/track' element={<UserTracking />} />
        <Route path='/booked-rides' element={<BookedRides />} />
        <Route path='/hosted-rides' element={<HostedRides />} />
        <Route path='/view-qr' element={<ViewQR />} />
        <Route path='/scan-qr' element={<ScanQR />} />
        <Route path='/scan-res' element={<ScanResults />} />
      </Routes>


    </div>
  );
}

export default App;
