import mongoose, { Schema, Model, Types } from "mongoose";

interface IPrescriptionItem {
  name: string;
  dose: string;
  qty: number;
}

interface IPrescription {
  consultation: Types.ObjectId;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  items: IPrescriptionItem[];
  createdAt: Date;
  sentToPharmacies: Types.ObjectId[];
  acceptedBy: Types.ObjectId;
}

type PrescriptionModel = Model<IPrescription>;

const prescriptionSchema = new Schema<IPrescription, PrescriptionModel>({
  consultation: { type: Schema.Types.ObjectId, ref: 'Consultation' },
  doctor: { type: Schema.Types.ObjectId, ref: 'User' },
  patient: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [{ 
    name: { type: String }, 
    dose: { type: String }, 
    qty: { type: Number } 
  }],
  createdAt: { type: Date, default: Date.now },
  sentToPharmacies: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  acceptedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Prescription: PrescriptionModel = mongoose.models.Prescription || mongoose.model<IPrescription>("Prescription", prescriptionSchema);

export default Prescription;