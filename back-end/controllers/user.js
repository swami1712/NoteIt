const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/userModel')
const Note = require("../models/notesModel")
const session = require('express-session');



const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await Student.findOne({ email });
    if (!name || !email || !password) {
        return res.json({ message: 'All fields are required', success: false })
    }
    if (existingUser) {
        return res.json({ message: "User already exists", success: false });
    }
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                const student = new Student({
                    name,
                    email,
                    password: hash,
                });
                await student.save();

                res.status(201).json({ message: 'registration successful', success: true });
            });
        });
    }
    catch (error) {
        res.status(401).json({ error: 'could not register student' })
    }
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({ message: 'All fields are required' })
        }

        const userName = await Student.findOne({ email });
        if (!userName) {
            return res.json({ message: 'Invalid Credentials', success: false });
        }

        const passwordValidity = await bcrypt.compare(password, userName.password)
        if (!passwordValidity) {
            return res.json({ message: 'Invalid Credentials', success: false })
        }

        const token = jwt.sign({ id: userName._id, name: userName.name }, 'secret_key');

        res.status(201).json({ token: token, message: 'Login successful', success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });

    }

}
const saveNotes = async (req, res) => {
    try {
        const { title, desc, userId } = req.body;
        const note = new Note({
            title,
            description: desc,
            userId,
        })
        await note.save();
        res.status(201).json({ success: true, message: "Note added successfully" })
    } catch (error) {
        console.log(error);
    }

}

const getNotes = async (req, res) => {
    const idForDisplayNotes = req.params.userId;
    const notes = await Note.find({ userId: idForDisplayNotes });
    res.status(201).json({ notes, success: true, message: "notes fetched successfully" })
}

const getStudentDetails = async (req, res) => {
    try {
        const data = await Student.find({})
        res.status(201).json({ data })
    }
    catch (err) {
        res.status(401).json({ message: "failed to fetch students" })
    }
}
const fetchStudent = async (req, res) => {
    try {
        const { user } = req.body
        const data = await Student.findById(user)
        res.status(201).json({ data })
    }
    catch (err) {
        res.status(401).json({ message: "failed to fetch students" })
    }
}
const logout = async (req, res) => {
    res.status(200).json({ msg: "ok" });
}

const updateNote = async (req, res) => {
    const id = req.params.userId;
    const { title, desc } = req.body;
    try {
        const note = await Note.findById(id);
        if (!note)
            return res.json({ success: false, message: "note not found" })
        const updatedNote = await Note.findByIdAndUpdate(id, { $set: { title: title, description: desc } }, { new: true })
        res.status(201).json({ success: true, message: "note updated successfully", note: updatedNote })

    }
    catch (err) {
        res.json({ message: "error deleting note" })
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.userId;
    try {
        const note = await Note.findById(id)
        if (!note)
            return res.json({ success: false, message: "note not found" })
        const deletedNote = await Note.findByIdAndDelete(id)
        res.status(201).json({ success: true, message: "note deleted successfully", note: deletedNote })

    }
    catch (err) {
        res.json({ message: "error deleting note" })
    }

}
module.exports = { handleUserLogin, handleUserSignup, getStudentDetails, logout, fetchStudent, saveNotes, getNotes, updateNote, deleteNote, };