import mongoose, { Schema, Document, Types } from 'mongoose';

interface IPost extends Document {
  name: string;
  user: string;
  rating: number;
  likes: number;
  summary: string;
  prep_time: number;
  prep_time_unit: string;
  estimated_total_time: number;
  estimated_total_time_unit: string;
  serving: number;
  calories: number;
  cost: string;
  tags: string[];
  ingredients: string[];
  directions: string[];
  _id: Types.ObjectId;
}

const PostSchema: Schema = new Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: false },
  likes: { type: Number, required: false },
  summary: { type: String, required: true },
  prep_time: { type: Number, required: true },
  prep_time_unit: { type: String, required: true },
  estimated_total_time: { type: Number, required: true },
  estimated_total_time_unit: { type: String, required: true },
  serving: { type: Number, required: true },
  calories: { type: Number, required: true },
  cost: { type: Number, required: true },
  tags: { type: [String], required: true },
  ingredients: { type: [String], required: true },
  directions: { type: [String], required: true }
});

export const Post = mongoose.model<IPost>('Post', PostSchema);