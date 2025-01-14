import { Document, model, Schema } from 'mongoose'

interface IWorkspace extends Document {
  name: string
  userId: Schema.Types.ObjectId
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: '1',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

const Workspace = model<IWorkspace>('Workspace', workspaceSchema)

export { IWorkspace, Workspace }
