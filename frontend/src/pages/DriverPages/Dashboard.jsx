import React, { useEffect, useState } from 'react'
import Scene from "../../lib/Scene"
import { useDriverStore } from '../../store/useDriverStore'
import { useRideStore } from '../../store/useRideStore';
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { authDriver, driverRideHistory, fetchDriverRideHistory, checkAuthDriver,logout } = useDriverStore();

  const getDayName = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  }
  useEffect(() => {
    fetchDriverRideHistory();
    checkAuthDriver();
  }, []);

  
  let totalfares = 0

  driverRideHistory?.forEach((ride) => {
    totalfares += ride.fareAmount;
  });
  totalfares = totalfares.toFixed(2);

  const DriverLogout = ()=>{
    logout();
  }

  const vehicleUrl = 
  authDriver?.vehicleType === "Car" ? "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png" :
  authDriver?.vehicleType === "Moto" ? "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png" :
  authDriver?.vehicleType === "Auto" ? "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png" :
  authDriver?.vehicleType === "SUV" ? "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png" :
  authDriver?.vehicleType === "LuxuryCar" ? "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png" :
  null;
  const [showTerms, setShowTerms] = useState(false)

  return (
    <div>
      <label className="btn btn-circle swap swap-rotate fixed z-40 m-5 md:hidden">
        {/* this hidden checkbox controls the state */}
        <input
          onClick={() => {
            if (document.getElementById('sidebardash').classList.contains('hidden')) { document.getElementById('sidebardash').classList.remove('hidden') }
            else { document.getElementById('sidebardash').classList.add('hidden') }
          }} type="checkbox" />

        {/* hamburger icon */}
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        {/* close icon */}
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
      <div id='sidebardash' class="fixed left-0 top-18 w-64 h-full bg-[#f8f4f3] p-4 sidebar-menu transition-transform hidden md:block">

        <ul class="mt-4">
          <span class="text-gray-400 font-bold">ADMIN</span>
          <li class="mb-1 group">
            <a href="/dashboard" class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">

              <span class="text-sm">Dashboard</span>
            </a>
          </li>
          <li class="mb-1 group">
            <Link to="/dashboard" class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">

              <span class="text-sm">Cabs</span>
            </Link>
          </li>
          <li class="mb-1 group">
            <Link to="/driver-rides" class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">

              <span class="text-sm">Rides</span>
            </Link>
          </li>
          <span class="text-gray-400 font-bold">PERSONAL</span>
          <li class="mb-1 group">
            <Link to="/driver-profile" class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">

              <span class="text-sm">Profile</span>
            </Link>
          </li>
         
          <li class="mb-1 group" onClick={DriverLogout}>
            <p class="flex cursor-pointer font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <span class="text-sm">Logout</span>
            </p>
          </li>
          <span class="text-gray-400 font-bold">TERMS AND CONDITIONS</span>
          <li class="mb-1 group" onClick={() => { setShowTerms(true) }}>
            <p class="flex cursor-pointer font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">

              <span class="text-sm" >Terms</span>
            </p>
          </li>
          <li class="mb-1 group" onClick={() => { setShowTerms(true) }}>
            <p class="flex cursor-pointer font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">

              <span class="text-sm" >Customer Care</span>
            </p>
          </li>
          <li class="mb-1 group" onClick={() => { setShowTerms(true) }}>
            <p class="flex cursor-pointer font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">

              <span class="text-sm" >Frequently Asked FAQs</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>

      {!showTerms ?
        <div class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">


          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                <div class="flex justify-between mb-6">
                  <div>
                    <div class="flex items-center mb-1">
                      <div class="text-2xl font-semibold">1</div>
                    </div>
                    <div class="text-sm font-medium text-gray-400">Cab</div>
                  </div>
                </div>

                <p onClick={() => document.getElementById('my_modal_3').showModal()} class="text-[#f84525] cursor-pointer font-medium text-sm hover:text-red-800">View</p>
                {authDriver && <dialog id="my_modal_3" className="modal">
                  <div className="modal-box bg-white h-[calc(80vh)] w-[calc(90vw)] overflow-y-hidden">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none">✕</button>
                    </form>
                    <div className="shadow-xl flex p-4 gap-3">
                      <div className='flex-col w-full my-auto'>
                        <p className='text-md font-semibold text-gray-950'>Vehicle Model : {authDriver?.vehicleModel}</p>
                        <p className='text-md font-semibold text-gray-950'>Vehicle Number : {authDriver?.vehicleNumber}</p>
                      </div>

                      <div className='flex flex-col'>
                        <div className="w-24 h-24 relative">
                          <img src={vehicleUrl} className="w-full h-full object-cover rounded-2xl" />
                          <div className="badge bg-white border-0 text-gray-950 absolute bottom-1 shadow-black shadow-md left-1/3 transform -translate-x-1/2 p-0.5 text-xxs w-fit">{authDriver?.vehicleType}</div>
                        </div>
                      </div>
                    </div>
                     <Scene vehicle={authDriver.vehicleType}/> 
                  </div>
                </dialog>}
              </div>
              <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                <div class="flex justify-between mb-4">
                  <div>
                    <div class="flex items-center mb-1">
                      <div class="text-2xl font-semibold">{driverRideHistory?.length}</div>
                      <div class="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">+30%</div>
                    </div>
                    <div class="text-sm font-medium text-gray-400">Rides</div>
                  </div>
                </div>
                <a href="/driver-rides" class="text-[#f84525] font-medium text-sm hover:text-red-800 cursor-pointer">View</a>
              </div>
              <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                <div class="flex justify-between mb-6">
                  <div>
                    <div class="text-2xl font-semibold mb-1">100</div>
                    <div class="text-sm font-medium text-gray-400">Repairs</div>
                  </div>
                </div>
                <p class="text-[#f84525] font-medium text-sm hover:text-red-800 cursor-pointer">View</p>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div class="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                <div class="rounded-t mb-0 px-0 border-0">
                  <div class="flex flex-wrap items-center px-4 py-2">
                    <div class="relative w-full max-w-full flex-grow flex-1">
                      <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">Cabs</h3>
                    </div>
                  </div>
                  <div class="block w-full overflow-x-auto">
                    <table class="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Cab</th>
                          <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Amount</th>
                          <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="text-gray-700 dark:text-gray-100">
                          <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Bike</th>
                          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">1</td>
                          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex items-center">
                              <span class="mr-2">70%</span>
                              <div class="relative w-full">
                                <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                  <div style={{ width: "70%" }} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr class="text-gray-700 dark:text-gray-100">
                          <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Auto</th>
                          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">6</td>
                          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex items-center">
                              <span class="mr-2">40%</span>
                              <div class="relative w-full">
                                <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                  <div style={{ width: "40%" }} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr class="text-gray-700 dark:text-gray-100">
                          <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Hatchback</th>
                          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">5</td>
                          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex items-center">
                              <span class="mr-2">45%</span>
                              <div class="relative w-full">
                                <div class="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                                  <div style={{ width: "45%" }} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr class="text-gray-700 dark:text-gray-100">
                          <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Sedan</th>
                          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">4</td>
                          <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex items-center">
                              <span class="mr-2">60%</span>
                              <div class="relative w-full">
                                <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                  <div style={{ width: "60%" }} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                <div class="flex justify-between mb-4 items-start">
                  <div class="font-medium">Rides</div>

                </div>
                <div class="overflow-hidden">
                  <table class="w-full">
                    <tbody>
                      {
                        driverRideHistory?.slice(0, 5).map((ride, index) => {
                          const createdAt = new Date(ride.pickupTime)
                          return (
                            <tr>
                              <td class="py-2 px-4 border-b border-b-gray-50">
                                <div class="flex items-center">
                                  <p class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Ride {index}</p>
                                </div>
                              </td>
                              <td class="py-2 px-4 border-b border-b-gray-50">
                                <span className="text-[13px] font-medium text-gray-400">
                                  {`${getDayName(createdAt)}, ${("0" + createdAt.getDate()).slice(-2)}/
  ${("0" + (createdAt.getMonth() + 1)).slice(-2)}/${createdAt.getFullYear()}, 
  ${("0" + createdAt.getHours()).slice(-2)}:
  ${("0" + createdAt.getMinutes()).slice(-2)}:
  ${("0" + createdAt.getSeconds()).slice(-2)}`}
                                </span>

                              </td>
                              <td class="py-2 px-4 border-b border-b-gray-50">
                                <span class="text-[13px] font-medium text-gray-400">₹{ride.fareAmount}</span>
                              </td>
                            </tr>)
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div class="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                <div class="flex justify-between mb-4 items-start">
                  <div class="font-medium">Rides Statistics</div>

                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div class="rounded-md border border-dashed border-gray-200 p-4">
                    <div class="flex items-center mb-0.5">
                      <div class="text-xl font-semibold">1</div>
                      <span class="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">₹ 80</span>
                    </div>
                    <span class="text-gray-400 text-sm">Active</span>
                  </div>
                  <div class="rounded-md border border-dashed border-gray-200 p-4">
                    <div class="flex items-center mb-0.5">
                      <div class="text-xl font-semibold">{driverRideHistory?.length}</div>
                      <span class="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+₹ {totalfares}</span>
                    </div>
                    <span class="text-gray-400 text-sm">Completed</span>
                  </div>
                  <div class="rounded-md border border-dashed border-gray-200 p-4">
                    <div class="flex items-center mb-0.5">
                      <div class="text-xl font-semibold">0</div>
                      <span class="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-₹ 0</span>
                    </div>
                    <span class="text-gray-400 text-sm">Canceled</span>
                  </div>
                </div>
              </div>
              <div class="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                <div class="flex justify-between mb-4 items-start">
                  <div class="font-medium">Earnings</div>

                </div>
                <div class="overflow-x-auto">
                  <table class="w-full min-w-[460px]">
                    <thead>
                      <tr>
                        <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                        <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Earning</th>
                        <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                      </tr>
                    </thead>
                    <tbody>


                      <tr>
                        <td class="py-2 px-4 border-b border-b-gray-50">
                          <div class="flex items-center">
                            <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover block">
                            </img><a href="#" class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Damages</a>
                          </div>
                        </td>
                        <td class="py-2 px-4 border-b border-b-gray-50">
                          <span class="text-[13px] font-medium text-rose-500">-₹ 235</span>
                        </td>
                        <td class="py-2 px-4 border-b border-b-gray-50">
                          <span class="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="py-2 px-4 border-b border-b-gray-50">
                          <div class="flex items-center">
                            <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover block">
                            </img><a href="#" class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Rides Completed</a>
                          </div>
                        </td>
                        <td class="py-2 px-4 border-b border-b-gray-50">
                          <span class="text-[13px] font-medium text-emerald-500">+₹ {totalfares}</span>
                        </td>
                        <td class="py-2 px-4 border-b border-b-gray-50">
                          <span class="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> :
        <div className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
          <div className="max-w-4xl mx-auto p-6">
            <div className="mt-8">
              <section className="bg-white shadow-lg p-6 rounded-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Terms and Conditions</h2>
                <p className="text-gray-600 mb-2">
                  Welcome to <strong>RideIT</strong>! By using our mobile application and services, you agree to comply with and be bound by these Terms and Conditions. Please read these terms carefully before booking a ride through our platform. If you do not agree to these terms, please do not use our services.
                </p>
                <ul className=" pl-6 text-gray-600">
                  <li><strong>1. Services: </strong> RideIT provides a platform that connects passengers with drivers for transportation services. RideIT is not a transportation provider, but acts as an intermediary between passengers and drivers.</li>
                  <li><strong>2. Eligibility: </strong>
                    To use the RideIT service, you must:
                    <ol className='list-disc list-inside pl-6'>
                      <li>Be at least 18 years old.</li>
                      <li>Have a valid payment method.</li>
                      <li>Have access to a smartphone with internet connectivity.</li>
                    </ol>
                  </li>
                  <li><strong>3. Account Registration:</strong>
                    <ol className='list-disc list-inside pl-6'>
                      <li>You are required to create an account with RideIT to book rides. You agree to provide accurate and complete information when registering.</li>
                      <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                      <li>You agree to notify us immediately if you suspect any unauthorized use of your account.</li>
                    </ol>
                  </li>
                  <li><strong>4. Payment:</strong>
                    <ol className='list-disc list-inside pl-6'>
                      <li>By booking a ride, you agree to pay the fare for the service provided, including applicable taxes, surcharges, and tips.</li>
                      <li>Payment will be processed through the payment method associated with your account.</li>
                      <li>Refunds are subject to the RideIT refund policy, which may vary depending on the circumstances.</li>
                    </ol></li>
                  <li>
                    <strong>5. Ride cancellation</strong>
                    <ol className='pl-6 list-disc list-inside'>
                      <li>You can cancel a ride before the driver arrives, but you may be charged a cancellation fee depending on how far the driver has traveled.</li>

                      <li>RideIT reserves the right to cancel a ride at any time in cases of technical issues, emergencies, or breaches of our Terms and Conditions.</li>
                    </ol>
                  </li>
                  <li>
                    <strong>6. Driver Behaviour</strong>
                    <ol className='pl-6 list-inside list-disc'>
                      <li>RideIT drivers are required to follow all applicable laws and regulations and provide a safe and professional experience for passengers.</li>

                      <li className='list-disc list-inside'>
                        If you have any concerns or complaints about a driver’s behavior, please report it through the app.</li>
                    </ol>
                  </li>
                  <li>
                    <strong>7. Passenger Conduct</strong>
                    <ol className='list-disc list-inside pl-6'>
                      <li>Passengers are expected to behave respectfully during the ride. Abuse, harassment, or dangerous behavior will not be tolerated.</li>

                      <li>RideIT reserves the right to suspend or terminate accounts for inappropriate behavior.</li></ol>
                  </li>
                  <li>
                    <strong>8. Limitation Liability</strong>
                    <ol className='list-disc list-inside pl-6'>
                      <li>RideIT will not be held liable for any damages, injuries, or losses incurred during the ride, including those resulting from delays, accidents, or actions of drivers.</li>

                      <li>RideIT’s liability is limited to the fare paid for the ride.</li></ol>
                  </li>
                  <li><strong>9. Privacy Policy:</strong> Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and protect your personal data.</li>
                  <li><strong>10. Modification of Terms:</strong> RideIT reserves the right to modify these Terms and Conditions at any time. Changes will be effective when posted in the app or on our website. Continued use of the service after changes have been posted constitutes acceptance of those changes.</li>
                </ul>
              </section>
              <section className="bg-white shadow-lg p-6 rounded-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions (FAQ)</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">1. How do I book a ride with RideIT?</h3>
                    <p className="text-gray-600">To book a ride, simply open the RideIT app, enter your pick-up and drop-off locations, and select your ride type. You’ll see the estimated fare and expected arrival time for your driver. Once you're ready, tap "Book Ride" to confirm your ride.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700">2. How is the fare calculated?</h3>
                    <p className="text-gray-600">Fares are based on several factors, including:
                      <ol className='list-disc list-inside pl-6'>
                        <li>The distance between your pick-up and drop-off locations.</li>
                        <li>The time it takes to complete your journey.</li>
                        <li>Any applicable surge pricing (e.g., during peak hours or high-demand periods).</li>
                      </ol>The app will show you an estimated fare before confirming your ride.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700">3. Can I cancel my ride?</h3>
                    <p className="text-gray-600"> Yes, you can cancel your ride before the driver arrives. However, please note that cancellations made after the driver has started heading to your location may incur a cancellation fee.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">4. What payment methods are accepted?</h3>
                    <p className="text-gray-600">RideIT accepts the following payment methods:
                      <ol className='list-disc list-inside pl-6'>
                        <li>Credit or debit cards (Visa, MasterCard, etc.)</li>
                        <li>Digital wallets (e.g., PayPal, Apple Pay, Google Pay)</li>
                        <li>In some regions, cash payments may also be available.</li>
                      </ol>Ensure your payment method is linked in your account settings before booking a ride.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700">5. What if I leave something in the car?</h3>
                    <p className="text-gray-600">If you left an item in the vehicle, please contact our support team as soon as possible through the app or by email. We’ll assist you in getting in touch with your driver to recover your lost item.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700">6. Is RideIT safe?</h3>
                    <p className="text-gray-600">Yes, passenger safety is a top priority for us. Our drivers undergo background checks, and vehicles are regularly inspected. Additionally, you can share your ride details with a friend or family member for extra peace of mind. The app also has an in-app emergency button to contact local authorities in case of an emergency.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700">7. Can I book a ride for someone else?</h3>
                    <p className="text-gray-600">Yes! You can book a ride on behalf of another person. Just enter their pick-up location and ensure their drop-off details are correct. Make sure the driver is aware that the ride is for someone else.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">8. What happens if my driver takes a wrong route?</h3>
                    <p className="text-gray-600">If your driver deviates from the intended route or takes a wrong turn, you can use the in-app map to check the progress of your ride. If you believe there is an issue, please report it to RideIT support, and we will investigate the matter.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">8. How do I report a problem with my ride?</h3>
                    <p className="text-gray-600">If you encounter any issues during your ride (e.g., poor driver behavior, vehicle problems, safety concerns), you can report it directly through the app by selecting “Help” or by reaching out to our support team via email or phone.</p>
                  </div>
                </div>
              </section>
              <section className="bg-white shadow-lg p-6 rounded-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Care</h2>
                <p className="text-gray-600 mb-2">
                  At RideIT, we are dedicated to providing excellent customer service. If you need assistance or have any issues with your ride, please contact our support team.
                </p>
                <h3 className="text-xl font-medium text-gray-700 mt-4">Contact Information</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Email Support: <a href="mailto:support@zappcab.com" className="text-blue-500">support@zappcab.com</a></li>
                  <li>Phone Support: <a href="tel:+18005559277" className="text-blue-500">+1-800-555-ZAPP (9277)</a></li>
                  <li>In-App Support: Use the "Help" section in the app.</li>
                </ul>
                <h3 className="text-xl font-medium text-gray-700 mt-4">Operating Hours</h3>
                <p className="text-gray-600">Our customer care team is available 24/7 to assist you with any inquiries or issues you may encounter.</p>
                <h3 className="text-xl font-medium text-gray-700 mt-4">Common Issues</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  <li><strong>Booking Issues:</strong>  <p >If you experience issues while booking a ride, such as incorrect fares, driver unavailability, or issues with your ride details, please contact us as soon as possible.</p></li>
                  <li><strong>Payment Issues:</strong>  <p >If you're having trouble with payments, including overcharges, refunds, or payment method problems, our team will help resolve these issues promptly.</p></li>
                  <li><strong>Driver or Ride Concerns:</strong>  <p >If you have any concerns or feedback regarding your driver’s behavior, the condition of the vehicle, or your overall ride experience, please let us know so we can take appropriate action.</p></li>
                </ul>
                <h3 className="text-xl font-medium text-gray-700 mt-4">Refund and Cancellations</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  <li><p >Refunds will be issued based on our cancellation policy and the nature of the issue. If you cancel a ride within the specified timeframe, you may be eligible for a full or partial refund.</p></li>
                  <li><p >If there is a dispute regarding a charge or ride experience, please reach out to our support team, and we will review the case.</p></li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Dashboard