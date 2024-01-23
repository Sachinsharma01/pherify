export interface IContact {
  name: string;
  phone: string;
  isSpam: boolean;
  isRegistered: boolean;
  UserId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  contactListId?: string;
  GlobalContactId?: string;
  dataValues?: any;
  
}
