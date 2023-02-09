import { Document } from 'mongoose';
import { User } from './user';

export interface Product extends Document {
  owner: User;
  title: string;
  description: boolean;
  image: string;
  price: string;
  created: Date;
}
