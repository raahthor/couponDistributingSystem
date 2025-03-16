import axios from "axios";
import { useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const response = await axios.get(`${backendUrl}/api/coupons-page`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    }

    fetchCoupons();
  }, []);

  async function handleClick(id, coupon) {
    const response = await axios.post(
      `${backendUrl}/api/coupon-claimed`,
      {
        id: id,
        coupon: coupon,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data);
    if (!response.data.success) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
      window.location.reload();
    }
  }

  return (
    <section className="py-10 bg-gray-800/50">
      <div className="max-w-8xl mx-auto px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-12">
          Available Coupons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-rows-none gap-8">
          {coupons
            .filter((coupon) => coupon.status === null)
            .map((coupon) => (
              <div
                key={coupon.id}
                className="h-50 w-50 flex flex-col justify-around  bg-gray-800 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-center">
                  {coupon.coupon}
                </h3>
                <button
                  onClick={() => handleClick(coupon.id, coupon.coupon)}
                  className="cursor-pointer rounded-md w-full bg-blue-500 py-3 hover:bg-blue-600"
                >
                  Claim Coupon
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
