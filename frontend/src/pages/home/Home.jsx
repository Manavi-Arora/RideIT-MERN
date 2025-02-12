import React from 'react'
import Header from '../../components/user/Header';
import Sidebar from '../../components/user/Sidebar';
import MapContainer from '../../components/user/MapContainer';

const Home = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <MapContainer />
      </div>
    </div>
  )
}

export default Home
