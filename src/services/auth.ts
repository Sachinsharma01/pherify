import { IUser, IUserDTO } from "../interfaces/IUser";
import { excludeProperties, logger } from "../utils";
import Models from "../models";
import { IContactList } from "../interfaces/IContactList";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

class AuthService {
  private UserModel: any;
  private ContactListModel: any;
  private GlobalContactsModel: any;

  constructor() {
    this.UserModel = Models.user;
    this.ContactListModel = Models.contactList;
    this.GlobalContactsModel = Models.globalContacts;
  }
  async register(user: IUserDTO): Promise<{ user: IUser; token: string }> {
    try {
      logger.info("Registering user with body in Auth Service %o", user);

      const checkDuplicateUser: any = await this.UserModel.findOne({
        where: { phone: user.phone },
      });
      logger.info("checkDuplicateUser %o", checkDuplicateUser);

      if (checkDuplicateUser) {
        throw new Error("User already exists, Try logging in!");
      }

      user.password = await bcrypt.hash(user.password, 10);

      const contactList: IContactList = await this.ContactListModel.create({
        phone: user.phone,
      });

      const newUser = await this.UserModel.create({
        ...user,
        contactListId: contactList.ContactListId,
      });

      logger.info("User created in Auth Service %o", newUser.dataValues);

      const finalUserResponse = excludeProperties(newUser.dataValues, [
        "password",
      ]) as IUser;

      // registering user in global contacts
      await this.GlobalContactsModel.create({
        ...finalUserResponse,
        isRegistered: true,
      });

      return {
        user: finalUserResponse,
        token: this.generateAuthToken(newUser),
      };
    } catch (error) {
      logger.error("Error occurred in Auth Service", error);
      throw error;
    }
  }

  async login(user: IUserDTO): Promise<{ user: IUser; token: string }> {
    try {
      logger.info("Logging in user with body in Auth Service %o", user);
      const userFromDB: any = await this.UserModel.findOne({
        where: { phone: user.phone },
      });
      logger.info("userFromDB %o", userFromDB);
      if (!userFromDB) {
        throw new Error("User not found");
      }
      const isValid: boolean = await bcrypt.compare(
        user.password,
        userFromDB.password
      );
      if (!isValid) {
        throw new Error("Invalid credentials");
      }
      const finalUserResponse = excludeProperties(userFromDB.dataValues, [
        "password",
      ]) as IUser;
      return {
        user: finalUserResponse,
        token: this.generateAuthToken(userFromDB),
      };
    } catch (error) {
      logger.error("Error occurred in Auth Service", error);
      throw error;
    }
  }

  private generateAuthToken(user: IUser) {
    const data = {
      time: new Date(),
      userId: user.UserId,
    };

    return jwt.sign(data, config.jwtSecret, {
      expiresIn: config.tokenExpiration,
      algorithm: "HS256",
    });
  }
}

export default new AuthService();
