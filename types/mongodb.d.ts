// types/mongodb.d.ts
import { Types } from "mongoose";

declare global {
  var mongoose: any;

  interface IUserToken {
    id: string;
    role: string;
    name: string;
    iat: number;
    exp: number;
  }

  interface IUser {
    _id: Types.ObjectId | string;
    name: string;
    email: string;
    password: string;
    role: "patient" | "doctor" | "pharmacy" | "admin";
    image: string;
    imagePublicId: string;
    createdAt: string;
    updatedAt: string;
  }

  
}
