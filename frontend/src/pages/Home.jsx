import Coupons from "../components/Coupons";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Home({ updateIsAdmin }) {
  return (
    <>
      <Navbar updateIsAdmin={updateIsAdmin} />
      <Hero />
      <Coupons />
    </>
  );
}
