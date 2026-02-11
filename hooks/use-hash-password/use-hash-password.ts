import bcrypt from "bcryptjs";

const saltRounds = 10; //Number of salt round used for hashing the password

//Hook provides functionality to hash and compare passwords using bcryptjs
export const useHashPassword = () => {
  // Function to hash a password
  const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, saltRounds);
  };

  // Function to compare a password with a hash- UPDATE
  const comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  };

  return { hashPassword, comparePassword };
};

// (https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09
