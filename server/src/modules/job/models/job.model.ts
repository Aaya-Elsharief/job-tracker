import mongoose, { Schema, Document, Types } from 'mongoose';
import { JobStatus } from '../utils/job.enum';

export interface job extends Document {
  company: string;
  role: string;
  status: JobStatus;
  dateOfApplication: Date;
  link: string;
}

export const JobSchema: Schema = new Schema(
  {
    _id: {
      type: Types.ObjectId, 
      auto: true, 
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
  },
  { timestamps: true },
);

export default mongoose.model<job>('Job', JobSchema);
