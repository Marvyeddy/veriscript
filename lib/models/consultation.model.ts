import mongoose, { Schema, Model, Types } from "mongoose";

interface IMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

interface IConsultation {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  status: 'pending' | 'accepted' | 'completed';
  messages: IMessage[];
  createdAt: Date;
}

type ConsultationModel = Model<IConsultation>;

const consultationSchema = new Schema<IConsultation, ConsultationModel>({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
  messages: [{
    sender: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Consultation: ConsultationModel = mongoose.models.Consultation || mongoose.model<IConsultation>("Consultation", consultationSchema);

export default Consultation;