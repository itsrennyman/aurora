import Joi from "joi";
import * as AuroraDB from "../database";
import { ValidationError } from "../error";

export const SetupController = {
  index: async ({ res }) => {
    return res.status(200).json({ needsSetup: true });
  },

  store: async ({ req, res }) => {
    const rules = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    });

    const {
      error,
      value: { confirmPassword, ...validated },
    } = rules.validate(req.body);

    if (error) {
      throw new ValidationError(422, error.message);
    }

    const createdUser = await AuroraDB.createUser(validated);

    return res.status(201).json({ data: createdUser });
  },
};