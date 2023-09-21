const express = require('express');
const { handleUserSignup, handleUserLogin, getStudentDetails, checkUserAuthentication, logout, fetchStudent, saveNotes, getNotes, updateNote, deleteNote, } = require('../controllers/user')

const router = express.Router();

router.post('/register', handleUserSignup)

router.post('/fetchStudent', fetchStudent)

router.post('/login', handleUserLogin)

router.post('/addnote', saveNotes)

router.get('/getnotes/:userId', getNotes)

router.get('/logout', logout)

router.get('/register', getStudentDetails)

router.put('/updatenote/:userId', updateNote)

router.delete('/deletenote/:userId', deleteNote)

module.exports = router