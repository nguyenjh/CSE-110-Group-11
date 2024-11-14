import mongoose, { Schema, Document, Types } from 'mongoose';

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true}
});

export const User = mongoose.model<IUser>('User', UserSchema);
