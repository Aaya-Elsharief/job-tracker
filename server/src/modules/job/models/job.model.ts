import mongoose, { Schema, Document, Types } from 'mongoose';
import { JobStatus } from '../utils/job.enum';

export interface job extends Document {
  company: string;
  role: string;
  status: JobStatus;
  dateOfApplication: Date;
  link: string;
  userId: Types.ObjectId;
}

export const JobSchema: Schema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      auto: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: JobStatus,
      required: true,
    },
    dateOfApplication: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model<job>('Job', JobSchema);
