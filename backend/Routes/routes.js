import { Router } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { Claims, Coupons } from "../Models/models.js";

const router = Router();
dotenv.config();

router.get("/api", (req, res) => {
  res.send("hello api working");
});

router.get("/api/coupons-page", async (req, res) => {
  if (!req.cookies.userCookie) {
    const userCookie = crypto.randomUUID();
    console.log(userCookie);
    res.cookie("userCookie", userCookie, {
      httpOnly: true,
      maxAge: 24 * 3600 * 1000,
      sameSite: "strict",
    });
  }
  try {
    const coupons = await Coupons.findAll();
    res.json({
      success: true,
      message: "All available coupons",
      coupons: coupons,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `error fetching coupons: ${error.message}`,
    });
  }
});

router.post("/api/coupon-claimed", async (req, res) => {
  const claimedCoupon = req.body.coupon;
  const claimedCouponId = req.body.id;
  const userIP = req.ip;
  const userCookie = req.cookies.userCookie;
  if (!userCookie) {
    return res.status(400).json({
      success: false,
      message: "Please reload the page and try again",
    });
  }
  const isIP = await Claims.findOne({ where: { userIP: userIP } });
  const isCookie = await Claims.findOne({ where: { userCookie: userCookie } });
  if (isIP || isCookie) {
    return res.json({
      success: false,
      message: "You can only claim once in 24 hours",
    });
  }
  try {
    await Claims.create({ claimedCouponId, claimedCoupon, userIP, userCookie });
    await Coupons.update(
      { status: "claimed" },
      { where: { id: claimedCouponId } }
    );
    res.json({
      success: true,
      message: "Coupon Claimed Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `error claiming coupon: ${error.message}`,
    });
  }
});

router.post("/api/admin", async (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.USER && password === process.env.PASS) {
    try {
      const coupons = await Coupons.findAll();
      const claimed = await Claims.findAll();
      return res.json({
        success: true,
        availableCoupons: coupons,
        claimedCoupons: claimed,
      });
    } catch (err) {
      console.log("Error in admin page: ", err.message);
      return res.json({
        success: false,
        message: `Error fetching data, Error: ${err.message}`,
      });
    }
  }
  res.status(400).json({
    success: false,
    message: "Incorrect credentials",
  });
});

router.post("/api/admin/add", async (req, res) => {
  const coupon = req.body.coupon;
  try {
    await Coupons.create({ coupon });
    try {
      const coupons = await Coupons.findAll();
      const claimed = await Claims.findAll();
      return res.json({
        success: true,
        availableCoupons: coupons,
        claimedCoupons: claimed,
      });
    } catch (err) {
      console.log("Error in admin page: ", err.message);
      return res.json({
        success: false,
        message: `Error fetching data, Error: ${err.message}`,
      });
    }
  } catch (error) {
    console.log("error adding coupon : ", error.message);
    res.status(500).json({
      message: "An error occured, try again",
    });
  }
});

router.post("/api/admin/update", async (req, res) => {
  const isInactive = req.body.status;
  const couponId = req.body.id;
  try {
    console.log(isInactive);
    if (isInactive === "Disabled") {
      await Coupons.update({ status: "Disabled" }, { where: { id: couponId } });
    } else {
      await Coupons.update({ status: null }, { where: { id: couponId } });
    }
    try {
      const coupons = await Coupons.findAll();
      const claimed = await Claims.findAll();
      return res.json({
        success: true,
        availableCoupons: coupons,
        claimedCoupons: claimed,
      });
    } catch (err) {
      console.log("Error in admin page: ", err.message);
      return res.json({
        success: false,
        message: `Error fetching data, Error: ${err.message}`,
      });
    }
  } catch (error) {
    console.log("error updating coupons : ", error.message);
    res.status(400).json({
      message: "An error occured, try again",
    });
  }
});

export default router;
