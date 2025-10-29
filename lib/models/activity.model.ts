import mongoose, { Schema, Model, Types } from "mongoose";

interface IActivity {
  actor: Types.ObjectId;
  action: string;
  targetRole: string;
  targetId: Types.ObjectId;
  createdAt: Date;
}

type ActivityModel = Model<IActivity>;

const activitySchema = new Schema<IActivity, ActivityModel>({
  actor: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String },
  targetRole: { type: String },
  targetId: { type: Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now }
});

const Activity: ActivityModel = mongoose.models.Activity || mongoose.model<IActivity>("Activity", activitySchema);

export default Activity;