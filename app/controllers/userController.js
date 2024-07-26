const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models/userModel');

const saltRounds = 10;



const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, password: hash });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


// const register = async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const hash = await bcrypt.hash(password, saltRounds);
//         const user = new User({ name, email, password: hash });
//         await user.save();
//         res.status(201).json(user);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

// const register = async (req, res) => {
//   // Validate request body
//   await body('name').notEmpty().withMessage('Name is required').run(req);
//   await body('email').isEmail().withMessage('Invalid email address').run(req);
//   await body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').run(req);

//   // Check for validation errors
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, email, password } = req.body;
//   try {
//     const hash = await bcrypt.hash(password, saltRounds);
//     const user = new User({ name, email, password: hash });
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };


// const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid Credentials' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid Credentials' });
//         }
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

// // const updateUser = async (req, res) => {
// //     try {
// //         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //         if (!updatedUser) {
// //             return res.status(404).json({ message: 'Usuário não encontrado' });
// //         }
// //         res.json(updatedUser);
// //     } catch (error) {
// //         return res.status(500).send(error.message);
// //     }
// // };

// const updateUser = async (req, res) => {
//   // Validate request body
//   await body('name').optional().notEmpty().withMessage('Name is required').run(req);
//   await body('email').optional().isEmail().withMessage('Invalid email address').run(req);

//   // Check for validation errors
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedUser) {
//       return res.status(400).json({ message: 'User not found' });
//     }
//     res.json(updatedUser);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };


module.exports = {
    register,
    login,
    updateUser
};

