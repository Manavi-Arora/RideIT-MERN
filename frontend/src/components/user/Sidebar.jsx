import RideRequestForm from "./Ride/RideRequestForm";


const Sidebar = () => {
  return (
    <div className="w-1/3 p-6 bg-white shadow-lg flex flex-col items-center justify-center">
      <h1 className="md:text-4xl font-bold mb-3">Go Anywhere with RideIT</h1>
      <RideRequestForm />
    </div>
  );
};

export default Sidebar;
