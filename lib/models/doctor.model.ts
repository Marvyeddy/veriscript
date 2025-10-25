import mongoose, { Schema, Model, Types } from "mongoose";

interface IDoctor {
  user: Types.ObjectId;
  specialization: string;
  licenseNumber: string;
  licenseFile: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

type DoctorModel = Model<IDoctor>;

const doctorSchema = new Schema<IDoctor, DoctorModel>(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    specialization: { 
      type: String 
    },
    licenseNumber: { 
      type: String 
    },
    licenseFile: { 
      type: String 
    },
    bio: { 
      type: String 
    }
  },
  {
    timestamps: true
  }
);

const Doctor: DoctorModel = mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;