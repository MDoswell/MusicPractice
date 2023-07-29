const asyncHandler = require('express-async-handler');
const exerciseModel = require('../models/exerciseModel');

// @desc    Get exercises
// @route   GET /api/exercises
// @access  Private
const getExercises = asyncHandler(async (req, res) => {
    const exercises = await exerciseModel.readAll(req.user.id);

    res.status(200).json(exercises);
})

// @desc    Create exercise
// @route   POST /api/exercises
// @access  Private
const createExercise = asyncHandler(async (req, res) => {
    // if (!req.body.text) {
    //     res.status(400)
    //     throw new Error('Please add a text field');
    // }

    const exercise = await exerciseModel.create(req.user.id, req.body.name, req.body.type, req.body.description);

    res.status(200).json(exercise);
})

// @desc    Update exercise
// @route   PUT /api/exercises/:id
// @access  Private
const updateExercise = asyncHandler(async (req, res) => {
    const exercise = await exerciseModel.findById(req.params.id, req.user.id);

    console.log(exercise);

    if (!exercise) {
        res.status(400);
        throw new Error('Exercise not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    
    // Make sure logged in user matches goal user
    if (exercise.user_id !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const name = req.body.name ? req.body.name : session.name
    const completed = req.body.completed ? req.body.completed : session.completed

    const updatedSession = await sessionModel.update(req.params.id, name, completed);

    res.status(200).json(updatedSession);
})

// @desc    Delete exercise
// @route   DELETE /api/exercises/:id
// @access  Private
const deleteExercise = asyncHandler(async (req, res) => {
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
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
}
