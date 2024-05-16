import {FileHandle} from './FileHandle';

export interface Slip {
  paymentsId: number;
  categoryId: number;
  user: any;
  slipImages: FileHandle[];
};
