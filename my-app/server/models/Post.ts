import mongoose, { Schema, Document, Types } from 'mongoose';

interface IPost extends Document {
  _id: Types.ObjectId;
  name: string;
  rating: number;
  likes: number;
  summary: string;
  prep_time: number;
  prep_time_unit: string;
  estimated_total_time: number;
  estimated_total_time_unit: string;
  serving: number;
  calories: number;
  cost: number;
  tags: string[];
  ingredients: string[];
  directions: string[];
}

const PostSchema: Schema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: false },
  likes: { type: Number, required: false },
  summary: { type: String, required: false },
  prep_time: { type: Number, required: false },
  prep_time_unit: { type: String, required: false },
  estimated_total_time: { type: Number, required: false },
  estimated_total_time_unit: { type: String, required: false },
  serving: { type: Number, required: false },
  calories: { type: Number, required: false },
  cost: { type: Number, required: false },
  tags: { type: [String], required: false },
  ingredients: { type: [String], required: false },
  directions: { type: [String], required: false }
});

export const Post = mongoose.model<IPost>('Post', PostSchema);