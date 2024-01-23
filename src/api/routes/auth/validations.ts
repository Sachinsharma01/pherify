import { Joi } from "celebrate";

export default {
  register: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string()
      .required()
      .length(10)
      .regex(/^[0-9]{10}$/),
    email: Joi.string().email().optional(),
    password: Joi.string().required().min(8),
  }),

  login: Joi.object({
    phone: Joi.string()
      .required()
      .length(10)
      .regex(/^[0-9]{10}$/),
    password: Joi.string().required().min(8),
  }),
};
