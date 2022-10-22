import { Schema, model, Document } from 'mongoose';
import { Audit } from './../interfaces/audit.interface';

const AuditSchema = new Schema<Audit>(
  {
    requestId: {
      type: String,
      requiered: true,
      unique: true,
    },
    req: {
      type: String,
      requiered: true,
    },
    res: {
      type: String,
      requiered: true,
    },
  },
  { timestamps: true },
);

AuditSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const AuditModel = model<Audit & Document>('Audit', AuditSchema);

export default AuditModel;
