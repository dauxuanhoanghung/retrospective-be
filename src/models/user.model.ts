import { Document, model, Schema } from 'mongoose'

// Define the interface for the User document
interface IUser extends Document {
  email: string
  password: string
  name: string
}

// Define the User schema
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: '1',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

// Create the User model
const User = model<IUser>('User', userSchema)

export { IUser, User }
