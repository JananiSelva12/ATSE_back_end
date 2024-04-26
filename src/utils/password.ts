import bcrypt from "bcryptjs";
import config from "config";
import generator from "generate-password";

function hashPassword(password: string): string {
  const rounds: number = config.get("password.rounds");
  const salt: string = bcrypt.genSaltSync(rounds);
  return bcrypt.hashSync(password, salt);
}

function generatePassword(): string {
  const length: number = config.get("password.length");
  return generator.generate({
    length: length,
    numbers: true,
  });
}

function comparePassword(password: string, hash: any): boolean {
  const crypted = password
  return bcrypt.compareSync(password, hash);
}

// function compareToken(verificationToken: string, hash: any): boolean {
//   return bcrypt.compareSync(verificationToken, hash);
// }

export default {
  comparePassword,
  generatePassword,
  hashPassword,
  // compareToken,
};
