import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useDriverStore } from "../../store/useDriverStore";
import toast from "react-hot-toast";

const CompleteProfile = (props) => {
  const { completeProfile } = useDriverStore();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePic: "",
    vehicleModel: "",
    licenseNumber: "",
    phoneNumber: "",
    vehicleNumber: "", // Added missing field
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      console.log("Base64 Image:", reader.result); // Debugging
      setFormData((prev) => ({ ...prev, profilePic: reader.result })); // Save Base64 string
    };
  
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      toast.error("Error reading file. Please try again.");
    };
  };
  

  const handleSubmit = async (e) => {
    props.setProgress(20);
    e.preventDefault();

    try {
      props.setProgress(40);
      const formDataToSend = new FormData();
      formDataToSend.append("profilePic", formData.profilePic);
      //console.log(formData.profilePic);
      formDataToSend.append("vehicleType", selectedVehicle);
      formDataToSend.append("vehicleModel", formData.vehicleModel);
      formDataToSend.append("vehicleNumber", formData.vehicleNumber);
      formDataToSend.append("licenseNumber", formData.licenseNumber);
      props.setProgress(70);
      await completeProfile(formDataToSend);
      props.setProgress(100);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Profile update failed. Please try again.");
    }
  };

  const vehicleTypes = {
    1: "Car",
    2: "Moto",
    3: "Auto",
    4: "SUV",
    5: "Luxury Car",
  };

  const vehicles = [
    {
      id: 1,
      title: "Commercial car",
      description: "You have a car that you wish to drive or employ others to drive",
      tags: ["Rides", "Fleet"],
      image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png",
    },
    {
      id: 2,
      title: "Motorbike (2 wheeler)",
      description: "You wish to drive a motorcycle or scooter",
      tags: ["Rides"],
      image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png",
    },
    {
      id: 3,
      title: "Commercial Auto",
      description: "You wish to drive a yellow plate rickshaw or auto",
      tags: ["Rides"],
      image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png",
    },
    {
      id: 4,
      title: "Commercial SUV",
      description: "You wish to drive a yellow plate SUV",
      tags: ["Rides", "Fleet"],
      image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png",
    },
    {
      id: 5,
      title: "Commercial Luxury",
      description: "You wish to drive a luxury/sedan ride",
      tags: ["Rides", "Fleet"],
      image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png",
    },
  ];

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">RideIT</h1>
      </div>

      <div className="max-w-xl mx-auto p-10">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Choose how you want to earn with RideIT</h2>

            {/* Vehicle Selection */}
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`flex items-center justify-between p-4 border rounded-lg shadow-sm cursor-pointer ${selectedVehicle === vehicleTypes[vehicle.id] ? "border-black bg-white shadow-md" : "bg-gray-50"
                    }`}
                  onClick={() => setSelectedVehicle(vehicleTypes[vehicle.id] || vehicle.id)}
                >
                  <div>
                    {/* Tags */}
                    <div className="flex space-x-2 mb-1">
                      {vehicle.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-semibold">{vehicle.title}</h3>
                    <p className="text-gray-600 text-sm">{vehicle.description}</p>
                  </div>

                  {/* Image */}
                  <img src={vehicle.image} alt={vehicle.title} height="100" width="120" className="rounded-md" />
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <button
              className={`w-full mt-6 py-3 text-white text-lg font-semibold rounded-md ${selectedVehicle ? "bg-black hover:bg-gray-900" : "bg-gray-400 cursor-not-allowed"
                }`}
              disabled={!selectedVehicle}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold pb-2 flex justify-center">Complete Your Profile</h2>

            {/* Profile Picture Upload */}
            <div className="mb-4 text-center">
              <label className="block text-gray-700 mb-2">Upload Profile Picture</label>
              <div className="relative w-24 h-24 mx-auto mb-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePic"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.profilePic ? (
                    <img
                      src={formData.profilePic} // Use Base64 directly
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full border border-gray-300">
                      <UploadCloud className="w-8 h-8 text-gray-500" />
                    </div>
                  )}


                </label>
              </div>
              <span className="text-gray-600 text-sm">
                {formData.profilePic ? formData.profilePic.name : "Choose a file"}
              </span>
            </div>

            {/* Input Fields */}
            {["licenseNumber", "vehicleModel", "vehicleNumber"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700 mb-1">{field.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
            ))}

            {/* Submit Button */}
            <button className="w-full mt-4 py-3 bg-black text-white text-lg font-semibold rounded-md hover:bg-gray-900" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
