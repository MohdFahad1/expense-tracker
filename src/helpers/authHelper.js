import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassord = await bcrypt.hash(password, saltRounds);

    return hashedPassord;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const comparePassword = async (password, hashedPassord) => {
  return bcrypt.compare(password, hashedPassord);
};
