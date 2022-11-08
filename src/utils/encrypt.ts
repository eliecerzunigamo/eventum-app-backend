import bcrypt from "bcrypt";
import { config } from "../config";

export const encrypt = async (password: string): Promise<string> => {
  let hash: string = "";

  try {
    hash = await bcrypt.hash(password, Number(config.saltRounds));
  } catch (err) {
    console.log(err);
  } finally {
    return hash;
  }
};
