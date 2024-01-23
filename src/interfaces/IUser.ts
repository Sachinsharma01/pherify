export interface IUserDTO {
    name: string;
    phone: string;
    email: string;
    password: string;   
}

export interface IUser {
    UserId: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    isSpam: boolean;
    contactListId: string;
    createdAt: Date;
    updatedAt: Date;
    dataValues: any;
    save: any;
}