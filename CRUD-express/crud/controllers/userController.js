const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    console.log('createUser called');
    console.log('Request body:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Missing username or password');
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    try {
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed:', hashedPassword);
        console.log('Creating new User object...');
        const newUser = new User({ username, password: hashedPassword });
        console.log('New User object:', newUser);
        console.log('Attempting to save user to database...');
        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser);
        res.status(201).json({ message: 'User created successfully', userId: savedUser._id });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Username already exists.' });
        }
        res.status(500).json({ message: 'Failed to create user.' });
    }
};

const getAllUsers = async (req, res) => {
    console.log('getAllUsers called');
    try {
        const users = await User.find();
        console.log('Retrieved users:', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Failed to retrieve users.' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log('getUserById called, ID:', id);
    try {
        const user = await User.findById(id);
        console.log('Retrieved user:', user);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve user.' });
    }
};

const updateUserById = async (req, res) => {
    console.log('updateUserById called');
    console.log('Request body:', req.body);
    const { id } = req.params;
    const { username, password } = req.body;
    console.log('Updating user with ID:', id);

    try {
        const updateData = {};
        if (username) updateData.username = username;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        console.log('Update data:', updateData);
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        console.log('Updated user:', updatedUser);  // Log the result of findByIdAndUpdate
        if (!updatedUser) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Username already exists.' });
        }
        res.status(500).json({ message: 'Failed to update user.' });
    }
};

const deleteUserById = async (req, res) => {
    console.log('deleteUserById called');
    const { id } = req.params;
    console.log('Deleting user with ID:', id);
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        console.log('Deleted user:', deletedUser); // Log the result
        if (!deletedUser) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user.' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
