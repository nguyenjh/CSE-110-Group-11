import mongoose, { Schema, Document, Types } from 'mongoose';

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  ratings: [string, number][];
  favorites: string[];
  likes: string[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  favorites: { type: [String], default: [], required: false },
  ratings: {
    type: [
      {
        type: [Schema.Types.Mixed],
        validate: {
          validator: (value: (string | number)[]) =>
            value.length === 2 && typeof value[0] === 'string' && typeof value[1] === 'number',
          message: 'Each rating must be a tuple of [recipeId (string), rating (number)]',
        },
      },
    ],
    default: [], 
  },
  likes: {type: [String], default: [], required: false},
});

export const User = mongoose.model<IUser>('User', UserSchema);
