import { createHmac, randomBytes } from 'crypto';

function hashPassword(password, salt) {
  const hash = createHmac('sha256', salt).update(password).digest('hex');
  return hash;
}

const salt = randomBytes(16).toString('hex'); // Tạo salt ngẫu nhiên
const password = 'mySecurePassword'; // Mật khẩu của người dùng
const hashedPassword = hashPassword(password, salt); // Mã hóa mật khẩu

