import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to hash passwords
export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

// Function to compare passwords
export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

// Generate JWT
export const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};
