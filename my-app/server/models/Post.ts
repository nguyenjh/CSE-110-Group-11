import mongoose, { Schema, Document, Types } from 'mongoose';
import { IPost } from '../../PostInterface';

interface PostInterface extends IPost, Document{
  _id: Types.ObjectId;
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
  directions: { type: [String], required: false },
  numOfRatings: { type: Number, default: 0 , required: false},
  ratingsTotal: { type: Number, default: 0, required: false },
});

export const Post = mongoose.model<PostInterface>('Post', PostSchema);