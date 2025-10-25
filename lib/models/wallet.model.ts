import mongoose, { Schema, Model, Types } from "mongoose";

interface IWallet {
  user: Types.ObjectId;
  accountNumber: string;
  balance: number;
  hbarAddress: string;
  createdAt: Date;
}

type WalletModel = Model<IWallet>;

const walletSchema = new Schema<IWallet, WalletModel>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accountNumber: { type: String, unique: true, required: true },
  balance: { type: Number, default: 0 },
  hbarAddress: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

const Wallet: WalletModel = mongoose.models.Wallet || mongoose.model<IWallet>("Wallet", walletSchema);

export default Wallet;