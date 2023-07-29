const asyncHandler = require('express-async-handler');
const sessionModel = require('../models/sessionModel');
const userModel = require('../models/userModel');

// @desc    Get sessions
// @route   GET /api/sessions
// @access  Private
const getSessions = asyncHandler(async (req, res) => {
    const sessions = await sessionModel.readAll(req.user.id);

    res.status(200).json(sessions);
})

// @desc    Create session
// @route   POST /api/sessions
// @access  Private
const createSession = asyncHandler(async (req, res) => {
    // if (!req.body.text) {
    //     res.status(400)
    //     throw new Error('Please add a text field');
    // }

    const session = await sessionModel.create(req.user.id, req.body.name);

    res.status(200).json(session);
})

// @desc    Update session
// @route   PUT /api/sessions/:id
// @access  Private
const updateSession = asyncHandler(async (req, res) => {
    const session = await sessionModel.findById(req.params.id);

    console.log(session);

    if (!session) {
        res.status(400);
        throw new Error('Session not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    
    // Make sure logged in user matches goal user
    if (session.user_id !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const name = req.body.name ? req.body.name : session.name
    const completed = req.body.completed ? req.body.completed : session.completed

    const updatedSession = await sessionModel.update(req.params.id, name, completed);

    res.status(200).json(updatedSession);
})

// @desc    Delete session
// @route   DELETE /api/sessions/:id
// @access  Private
const deleteSession = asyncHandler(async (req, res) => {
    const session = await sessionModel.findById(req.params.id);

    if (!session) {
        res.status(400);
        throw new Error('Session not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure logged in user matches goal user
    if (session.user_id !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await sessionModel.remove(req.params.id);

    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getSessions,
    createSession,
    updateSession,
    deleteSession
}
