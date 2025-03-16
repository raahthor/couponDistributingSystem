import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const response = await axios.get(`${backendUrl}/api/coupons-page`, {
  withCredentials: true,
});
const coupons = response.data.coupons;

export default function Coupons() {
  // const response=await axios.post()
  async function handleClick(id, coupon) {
    const response = await axios.post(
      `${backendUrl}/api/coupon-claimed`,
      {
        id: id,
        coupon: coupon,
      },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
      window.location.reload();
    }
  }

  return (
    <section class="py-10 bg-gray-800/50">
      <div class="max-w-8xl mx-auto px-4 flex flex-col items-center">
        <h2 class="text-3xl font-bold text-center mb-12">Available Coupons</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-rows-none gap-8">
          {coupons
            .filter((coupon) => coupon.status === null)
            .map((coupon) => (
              <div
                key={coupon.id}
                class="h-50 w-50 flex flex-col justify-around  bg-gray-800 rounded-lg p-8"
              >
                <h3 class="text-2xl font-bold text-center">{coupon.coupon}</h3>
                <button
                  onClick={() => handleClick(coupon.id, coupon.coupon)}
                  class="cursor-pointer rounded-md w-full bg-blue-500 py-3 hover:bg-blue-600"
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
