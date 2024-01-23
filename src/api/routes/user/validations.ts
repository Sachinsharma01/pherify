import { Joi } from "celebrate";

export default {
  markSpam: {
    phone: Joi.string()
      .length(10)
      .required()
      .regex(/^[0-9]+$/),
    isSpam: Joi.boolean().required(),
  },

  listUsers: {
    name: Joi.string().optional(),
    phone: Joi.string()
      .length(10)
      .optional()
      .regex(/^[0-9]+$/),
  },
};
