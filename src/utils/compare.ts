import bcrypt from "bcrypt";

export const compare = async (passwordToCompare: string, hash: string) => {
  let result: boolean = false;
  try {
    result = await bcrypt.compare(passwordToCompare, hash);
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};
