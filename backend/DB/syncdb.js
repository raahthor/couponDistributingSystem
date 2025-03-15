import { sequelize, connectDB } from "./dbconfig.js";
import { Claims, Coupons } from "../Models/models.js";

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("synced successfully");
  } catch (error) {
    console.error("not synced: ", error.message);
  }
};

export const startDB = async () => {
  try {
    await connectDB();
    await syncDB();
    console.log("database Connected");
  } catch (error) {
    console.error("db not connected");
  }
};
