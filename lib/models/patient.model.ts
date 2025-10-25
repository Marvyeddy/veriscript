import mongoose, { Schema, Model, Types } from "mongoose";

interface IPatient {
  user: Types.ObjectId;
  dob: Date;
  gender: string;
  medication: string;
  diagnosis: string;
  files: string[];
  createdAt: Date;
  updatedAt: Date;
}

type PatientModel = Model<IPatient>;

const patientSchema = new Schema<IPatient, PatientModel>(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    dob: { 
      type: Date 
    },
    gender: { 
      type: String 
    },
    medication: { 
      type: String 
    },
    diagnosis: { 
      type: String 
    },
    files: [{ 
      type: String 
    }]
  },
  {
    timestamps: true
  }
);

const Patient: PatientModel = mongoose.models.Patient || mongoose.model<IPatient>("Patient", patientSchema);

export default Patient;