import mongoose, { Schema, Model, Types } from "mongoose";

interface IPharmacy {
  user: Types.ObjectId;
  licenseNumber: string;
  licenseFile: string;
  inventory: Array<{
    name: string;
    qty: number;
    price: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

type PharmacyModel = Model<IPharmacy>;

const pharmacySchema = new Schema<IPharmacy, PharmacyModel>(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    licenseNumber: { 
      type: String 
    },
    licenseFile: { 
      type: String 
    },
    inventory: [{ 
      name: { type: String },
      qty: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    }]
  },
  {
    timestamps: true
  }
);

const Pharmacy: PharmacyModel = mongoose.models.Pharmacy || mongoose.model<IPharmacy>("Pharmacy", pharmacySchema);

export default Pharmacy;