const RideCoupons = [
    {
      code: "SAVE20",
      discountPercentage: 20, // 20% off
      minAmount: 100, // Minimum order value required
      description: "Get 20% off on rides above ₹100!",
    },
    {
      code: "FIRST50",
      discountAmount: 50, // Flat ₹50 off
      minAmount: 300,
      description: "Flat ₹50 off on your first ride above ₹300!",
    },
    {
      code: "RIDENOW",
      discountPercentage: 10,
      minAmount: 700,
      description: "10% discount on all rides above ₹700!",
    },
  ];
  
  export default RideCoupons;
  