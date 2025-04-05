import mongoose, { Schema, Document } from 'mongoose';

interface ISubscription extends Document {
  email: string;
  createdAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
