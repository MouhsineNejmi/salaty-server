import mongoose, { Schema, Model, Document, Types } from 'mongoose';

export interface StoreAttrs {
  name: string;
  userId: string;
  isActive?: boolean;
}

export interface StoreDoc extends Document {
  name: string;
  userId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface StoreModel extends Model<StoreDoc> {
  build(attrs: StoreAttrs): StoreDoc;
}

const storeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Store Name is required'],
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);

storeSchema.statics.build = (attrs: StoreAttrs) => new Store(attrs);

const Store = mongoose.model<StoreDoc, StoreModel>('Store', storeSchema);

export default Store;
