import { useContext } from "react";
import CouponsAdmin from "../components/CouponsAdmin";
import NavAdmin from "../components/NavAdmin";
import UserDetails from "../components/UserDetails";
import { DataContext } from "../components/Data";

export default function Admin({ updateIsAdmin }) {
  const { responseData } = useContext(DataContext);
  
  return (
    <>
      <NavAdmin updateIsAdmin={updateIsAdmin} />
      <CouponsAdmin
        availableCoupons={responseData.availableCoupons}
        claimedCoupons={responseData.claimedCoupons}
      />
      <UserDetails userStats={responseData.claimedCoupons} />
    </>
  );
}
