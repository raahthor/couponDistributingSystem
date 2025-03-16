import { useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CouponsAdmin({ availableCoupons, claimedCoupons }) {
  const [couponInput, setCouponInput] = useState("");
  const [couponArr, updateCoupon] = useState(availableCoupons);
  const [claimedArr, updateClaimed] = useState(claimedCoupons);

  async function handleUpdate(isActive, id) {
    const status = isActive === null ? "Disabled" : null;
    console.log(`1 = ${isActive} 2 = ${status}`);
    try {
      const response = await axios.post(`${backendUrl}/api/admin/update`, {
        status: status,
        id: id,
      });
      alert("coupon updated");
      updateCoupon(response.data.availableCoupons);
      updateClaimed(response.data.claimedCoupons);
      console.log(couponArr)
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleAddCoupon() {
    if (couponInput.trim() === "") {
      alert("Coupon can't be empty");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/admin/add`, {
        coupon: couponInput,
      });
      alert("Coupon Added sucessfully");
      updateCoupon(response.data.availableCoupons);
      updateClaimed(response.data.claimedCoupons);
    } catch (error) {
      console.error(error.message);
      alert("error adding coupon try again");
    }
  }

  return (
    <section className="py-10 flex flex-col items-center">
      <div className="w-full mx-auto p-4 mb-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-12">Available Coupons</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-rows-none gap-8">
          {couponArr
            .filter((coupon) => coupon.status !== "claimed")
            .map((coupon) => (
              <div
                key={coupon.id}
                className="h-30 w-50 flex flex-col justify-around  bg-gray-800 rounded-lg p-3 md:p-5"
              >
                <h3 className="text-xl font-bold text-center">{coupon.coupon}</h3>
                <button
                  onClick={() => handleUpdate(coupon.status, coupon.id)}
                  className=" cursor-pointer rounded-md w-full bg-blue-500 py-3 hover:bg-blue-600"
                >
                  {coupon.status === null ? "Disable" : "Enable"}
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full mx-auto p-4 mb-4 flex flex-col items-center bg-gray-800/50">
        <h2 className="text-3xl font-bold text-center mb-12">Claimed Coupons</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-rows-none gap-8">
          {claimedArr.map((coupon) => (
            <div
              key={coupon.id}
              className="h-25 w-40 flex flex-col justify-around  bg-gray-800 rounded-lg p-3 md:p-5"
            >
              <h3 className="text-xl font-bold text-center">
                {coupon.claimedCoupon}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex">
        <input
          type="text"
          required
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="Enter Coupon Name"
          className="h-8 pl-3 bg-amber-50/10  rounded-l-md"
        />
        <button
          onClick={handleAddCoupon}
          className="h-8 px-4 text-xs md:text-lg rounded-r-md bg-blue-500 hover:bg-blue-600"
        >
          Add Cuopons
        </button>
      </div>
    </section>
  );
}
