import { MenuItem } from './menu-item.model';

export interface Order {
  _id: string;
  items: MenuItem[];
  completed: boolean;
  customerID: string;
  date: string;
  time?: string;
  totalPrice?: number;
}
