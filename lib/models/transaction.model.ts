import mongoose, { Schema, Model, Types } from "mongoose";
import { randomUUID } from "crypto";

interface ITransaction {
  transactionRef: string;
  hederaTxId: string;
  from: Types.ObjectId;
  to: Types.ObjectId;
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  fee: number;
  type: 'consultation' | 'pharmacy' | 'deposit' | 'withdraw' | 'transfer';
  status: 'pending' | 'success' | 'failed';
  meta: any;
  createdAt: Date;
}

type TransactionModel = Model<ITransaction>;

const transactionSchema = new Schema<ITransaction, TransactionModel>({
  transactionRef: { 
    type: String, 
    required: true, 
    unique: true, 
    default: () => randomUUID()
  },
  hederaTxId: { type: String },
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  fromAccountNumber: { type: String },
  toAccountNumber: { type: String },
  amount: { type: Number, required: true },
  fee: { type: Number, default: 0 },
  type: { 
    type: String, 
    enum: ['consultation', 'pharmacy', 'deposit', 'withdraw', 'transfer'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'success', 'failed'], 
    default: 'success' 
  },
  meta: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

const Transaction: TransactionModel = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;