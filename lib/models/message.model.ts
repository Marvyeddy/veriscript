import mongoose, { Schema, Model, Types } from "mongoose";

interface IMessage {
  consultation: Types.ObjectId;
  senderRole: 'patient' | 'doctor';
  senderUser: Types.ObjectId;
  text: string;
  file: string;
  createdAt: Date;
}

type MessageModel = Model<IMessage>;

const messageSchema = new Schema<IMessage, MessageModel>({
  consultation: { type: Schema.Types.ObjectId, ref: 'Consultation', required: true },
  senderRole: { type: String, enum: ['patient','doctor'], required: true },
  senderUser: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  file: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Message: MessageModel = mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;