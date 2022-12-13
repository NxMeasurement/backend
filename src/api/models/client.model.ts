import mongoose from 'mongoose';
import { IClientDocument } from '../interfaces/client.interfaces';

const Schema = mongoose.Schema;

const ClientSchema = new Schema<IClientDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    physiologicalState: { type: String, required: true },
    email: { type: String },
    street: { type: String },
    zipCode: { type: String },
    city: { type: String },
    expectedBodyWeight: { type: Number },
    specificAims: [{ type: String }],
    pal: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ClientModel = mongoose.model<IClientDocument>('Client', ClientSchema);

export default ClientModel;
