import { DataTypes } from "sequelize";
import { sequelize } from "../DB/dbconfig";

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
  claimedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Claims, Coupons };
