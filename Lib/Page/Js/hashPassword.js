import { createHmac } from "crypto";
export {hashPassword};

function hashPassword(password) {
  const hash = createHmac('sha256', "8` b65b9403b9427421db5921a2b182eae").update(password).digest('hex');
  return hash;
}


const salt= "8b65b9403b9427421db5921a2b182eae";
console.log(salt);
// import { genSalt, hash as _hash, compare } from 'bcryptjs';

// // Mật khẩu gốc cần được băm
// const plaintextPassword = 'mySecurePassword';

// // Sử dụng bcrypt để tạo một salt (muối)
// const saltRounds = 10; // Số vòng lặp tạo muối, thường dùng giá trị từ 10 trở lên
// genSalt(saltRounds, function(err, salt) {
//   if (err) {
//     throw err;
//   }

//   // Sử dụng muối để băm mật khẩu
//   _hash(plaintextPassword, salt, function(err, hash) {
//     if (err) {
//       throw err;
//     }

//     // Lưu giữ mật khẩu đã băm (hash) vào cơ sở dữ liệu hoặc nơi khác
//     console.log('Mật khẩu đã băm:', hash);

//     // Kiểm tra mật khẩu đã băm
//     compare(plaintextPassword, hash, function(err, result) {
//       if (err) {
//         throw err;
//       }
//       if (result) {
//         console.log('Mật khẩu chính xác.');
//       } else {
//         console.log('Mật khẩu không chính xác.');
//       }
//     });
//   });
// });