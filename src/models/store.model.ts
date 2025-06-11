import mongoose, { Schema, Model, Document, Types } from 'mongoose';

interface StoreAttrs {
  name: string;
  auth0Id: string;
  isActive?: boolean;
}

interface StoreDoc extends Document {
  name: string;
  auth0Id: string;
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
    auth0Id: {
      type: String,
      required: [true, 'UserId is required'],
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
