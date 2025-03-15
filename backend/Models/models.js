import { DataTypes } from "sequelize";
import { sequelize } from "../DB/dbconfig.js";

const Coupons = sequelize.define("Coupons", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  coupon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Claims = sequelize.define("Claims", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  claimedCoupon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userIP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userCookie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Claims, Coupons };
