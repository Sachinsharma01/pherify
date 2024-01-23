import {
  excludeProperties,
  isNullOrUndefined,
  logger,
  removeDuplicates,
} from "../utils";
import Models from "../models";
import { IUser } from "../interfaces/IUser";
import { IContact } from "../interfaces/IContact";
import { IContactList } from "../interfaces/IContactList";
import { Op } from "sequelize";

class UserService {
  UserModel: any;
  GlobalContactsModel: any;
  ContactListModel: any;
  constructor() {
    this.UserModel = Models.user;
    this.GlobalContactsModel = Models.globalContacts;
    this.ContactListModel = Models.contactList;
  }

  async markUserSpam(phone: string, isSpam: boolean) {
    try {
      logger.info("Marking user as spam with phone %o", phone);
      const user: IUser = await this.UserModel.findOne({
        where: {
          phone,
        },
      });

      const globalContact = await this.GlobalContactsModel.findOne({
        where: {
          phone,
        },
      });

      //! although this error may never occur as the user will always be present in global database
      if (!globalContact) {
        throw new Error("User not found");
      }

      globalContact.isSpam = isSpam;
      user.isSpam = isSpam;
      await user.save();
      await globalContact.save();
      return user;
    } catch (error) {
      logger.error("Error occurred in marking user as spam", error);
      throw error;
    }
  }

  async listContacts(
    query: { name?: string; phone?: string },
    currentUser: IUser
  ): Promise<Array<IUser>> {
    try {
      logger.info(
        "Listing users with query %o and current user %o",
        query,
        currentUser
      );
      let result: Array<any> = [];
      const allContacts: Array<IUser> = [];

      if (!isNullOrUndefined(query.name)) {
        const exactMatch: Array<IUser> = await this.GlobalContactsModel.findAll(
          {
            where: {
              name: {
                [Op.like]: `${query.name}%`,
              },
            },
            raw: true,
          }
        );
        allContacts.push(...exactMatch);

        const restAllMatch: Array<IUser> =
          await this.GlobalContactsModel.findAll({
            where: {
              name: {
                [Op.like]: `%${query.name}%`,
              },
            },
            raw: true,
          });
        allContacts.push(...restAllMatch);
      }

      if (!isNullOrUndefined(query.phone)) {
        const user: IUser = await this.GlobalContactsModel.findOne({
          where: {
            phone: query.phone,
            isRegistered: true,
          },
          raw: true,
        });

        if (!user) {
          const users: Array<IUser> = await this.GlobalContactsModel.findAll({
            where: {
              phone: query.phone,
            },
            raw: true,
          });
          allContacts.push(...users);
        }
        allContacts.push(...[user]);
      }

      logger.debug("All contacts %o", allContacts);

      //! filtering those contacts that are not registered and current user is not in their contact list

      const promises = allContacts.map(async (contact: any) => {
        const contactList: IContactList = await this.ContactListModel.findOne({
          where: {
            ContactListId: contact.contactListId,
          },
          raw: true,
        });

        if (
          contact.isRegistered &&
          contactList?.contacts?.includes(currentUser.phone)
        ) {
          return contact; // Skip if conditions are not met
        }
        return excludeProperties(contact, ["email"]);
      });

      result = (await Promise.all(promises)).filter(Boolean);
      return removeDuplicates(result);
    } catch (error) {
      logger.error("Error occurred in listing users", error);
      throw error;
    }
  }
}

export default new UserService();
