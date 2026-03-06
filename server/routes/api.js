const crypto = require('crypto');
const util = require('util');
const express = require('express');
const User = require('../models/user');

const router = express.Router();
const scrypt = util.promisify(crypto.scrypt);

const hashPassword = async (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hashBuffer = await scrypt(password, salt, 64);
  return `${salt}:${Buffer.from(hashBuffer).toString('hex')}`;
};

const verifyPassword = async (password, storedPasswordHash) => {
  const [salt, storedHash] = storedPasswordHash.split(':');
  if (!salt || !storedHash) {
    return false;
  }

  const hashBuffer = Buffer.from(await scrypt(password, salt, 64));
  const storedHashBuffer = Buffer.from(storedHash, 'hex');

  if (hashBuffer.length !== storedHashBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(hashBuffer, storedHashBuffer);
};

router.get('/', (_req, res) => {
  res.send('API route is working');
});

router.get('/todo', (_req, res) => {
  res.status(200).json([
    { id: 1, name: 'Create account' },
    { id: 2, name: 'Sign in' },
    { id: 3, name: 'Add your first todo' },
  ]);
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    if (String(password).length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ email: normalizedEmail, passwordHash });

    return res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to register user.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to login user.' });
  }
});

module.exports = router;
