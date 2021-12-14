import * as argon2 from 'argon2';

export const hashPassword = async (passowrd: string) => {
  const hashed = await argon2.hash(passowrd);
  return hashed;
};
