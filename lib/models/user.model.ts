import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { decryptPrivateKey, encryptPrivateKey } from "../encrypt";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor" | "pharmacy" | "admin";
  image: string;
  imagePublicId: string;
  hederaAccountId: string;
  privateKey: string;
  publicKey: string;
  forgotPasswordToken: number | null;
  forgotPasswordTokenExpiry: Date | null;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  getDecryptedPrivateKey(): string;
}

type UserModel = Model<IUser, object, IUserMethods>;

const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      required: true,
      enum: ["patient", "doctor", "pharmacy", "admin"],
      default: "patient",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/drqtiluh9/image/upload/v1749828222/avatar_trpadf.webp",
    },
    imagePublicId: { type: String },
    forgotPasswordToken: { type: Number, default: null },
    forgotPasswordTokenExpiry: { type: Date, default: null },
    hederaAccountId: { type: String, default: null },
    privateKey: { type: String, default: null },
    publicKey: { type: String, default: null },
    location: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// Pre-save middleware for private key encryption
schema.pre("save", function (next) {
  if (this.isModified("privateKey") && this.privateKey) {
    try {
      this.privateKey = encryptPrivateKey(this.privateKey);
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

schema.methods.getDecryptedPrivateKey = function (): string {
  if (!this.privateKey) {
    throw new Error("No private key found");
  }
  return decryptPrivateKey(this.privateKey);
};

schema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Password comparison error:", error);
    return false;
  }
};

const User: Model<IUser, object, IUserMethods> =
  mongoose.models.User || mongoose.model("User", schema);

export default User;
