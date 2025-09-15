const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

async function setPassword(username, password) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { username },
      { password: hashedPassword },
      { upsert: true, new: true }
    );
    console.log(`Password set for user: ${user.username}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

const [,, username, password] = process.argv;
if (!username || !password) {
  console.log('Usage: node setPassword.js <username> <password>');
  process.exit(1);
}

setPassword(username, password);