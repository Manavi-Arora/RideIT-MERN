import React,{useEffect} from 'react'
import Header from '../../components/user/Header';
import Sidebar from '../../components/user/Sidebar';
import MapContainer from '../../components/user/MapContainer';
import { useDriverStore } from '../../store/useDriverStore';
import { useAuthStore } from '../../store/useAuthStore';

const Home = () => {
  const { subscribeToDrivers, unsubscribeFromDrivers, showSidebar } = useAuthStore();

  useEffect(() => {
    subscribeToDrivers()
    return () => { unsubscribeFromDrivers() }
  }, [subscribeToDrivers, unsubscribeFromDrivers])

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-grow">
        {showSidebar && <Sidebar />}
        <MapContainer />
      </div>
    </div>
  )
}

export default Home
