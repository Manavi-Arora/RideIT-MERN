# RideIT - Cab Booking Service

RideIT is a modern cab booking service that provides seamless ride-hailing experiences for users and drivers.  The platform supports user authentication, driver registration, ride path tracking, driver and user history-rides tracking and more.
## 🚀 Features

- **User Authentication**: Sign up, log in, and manage accounts.
- **Driver Registration & Profile Completion**: Drivers can sign up and complete their profiles.
- **Ride Booking & History Tracking**: Users can book rides and view their ride history.
- **Driver Dashboard**: View ride requests, availability status, and ride history.
- **Secure Payments**: Track ride fares and payment statuses.
- **Cloudinary Integration**: Store and manage user and driver profile images efficiently.
- **3D Vehicle Model Visualization**: Provides an interactive 3D model of the booked vehicle for better user experience.
- **Loading Bar for UI Feedback**: Enhances user experience with real-time progress updates.

## 📌 Tech Stack

- **Frontend**: React, React Router-DOM, Zustand (state management), Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Token), Cookies
- **API Requests**: Axios
- **Notifications**: React-hot-toast
- **Cloud Storage**: Cloudinary for image uploads
- **Payment Integration**: Razorpay for ride-payments

## 🔗 API/Backend Endpoints

### **Authentication Routes**

- `POST /auth/signup` → User signup
- `POST /auth/login` → User login
- `POST /auth/logout` → User logout
- `GET /auth/check` → Check authentication status

### **Driver Authentication Routes**

- `POST /driver/signup` → Driver signup
- `POST /driver/login` → Driver login
- `POST /driver/logout` → Driver logout
- `GET /driver/check` → Check driver authentication status
- `POST /driver/complete-profile` → Complete driver profile
- `GET /driver/get-drivers` → Get all drivers data

### **Ride History Routes**

- `GET /auth/user-ride-history/:id` → Get ride history for a user
- `GET /driver/driver-ride-history` → Get ride history for a driver


### **Navigation & Pages Routes**

- `GET /` → Landing Page
- `GET /home` → User dashboard
- `GET /dashboard` → Driver dashboard
- `GET /driver-profile` → Driver profile page
- `GET /driver-rides` → Driver ride history
- `GET /activity` → Track user activity


## 🎯 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/rideit.git
   ```
2. Install dependencies:
   ```sh
   cd RideIT
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 📸 Screenshots

![Screenshot 2025-03-13 214000](https://github.com/user-attachments/assets/c284034d-85bf-4cf6-861d-783f33040ff1)
![Screenshot 2025-03-13 214033](https://github.com/user-attachments/assets/d58d4d00-73ef-4b41-b5b0-c54d857d8002)
![Screenshot 2025-03-13 230406](https://github.com/user-attachments/assets/45157374-c3af-453b-8b9a-600cccd393f8)
![Screenshot 2025-03-13 230423](https://github.com/user-attachments/assets/c520ef24-0d22-41de-8527-19b4ab860acc)
![Screenshot 2025-03-13 230612](https://github.com/user-attachments/assets/72f70075-950b-4f63-ad39-0d578fad8396)
![Screenshot 2025-03-12 190820](https://github.com/user-attachments/assets/2b29772b-8a28-4556-bf74-27d066c97150)
![Screenshot 2025-03-13 234043](https://github.com/user-attachments/assets/ab1b88fa-7d02-4085-aad6-70d0f52be4b5)
![Screenshot 2025-03-13 234053](https://github.com/user-attachments/assets/d30c3694-9b4e-44cd-ab90-c7cc9f58920e)
![Screenshot 2025-03-14 001255](https://github.com/user-attachments/assets/d03a78fb-5bf3-470b-828d-84494ce69533)


---
🚗 **RideIT - The Future of Ride Booking** 🚗

