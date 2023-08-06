const asyncHandler = require('express-async-handler');
const exerciseModel = require('../models/sessionExerciseModel');

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
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please enter a name');
    }

    const exercise = await exerciseModel.create(req.user.id, req.user.name, req.body.name, req.body.type, req.body.description, req.body.public);

    res.status(200).json(exercise);
})

// @desc    Update exercise
// @route   PUT /api/exercises/:id
// @access  Private
const updateExercise = asyncHandler(async (req, res) => {
    const exercise = await exerciseModel.findById(req.params.id);

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

    const name = req.body.name ? req.body.name : exercise.name
    const type = req.body.type ? req.body.type : exercise.type
    const description = req.body.description ? req.body.description : exercise.description
    // const name = req.body.name ? req.body.name : exercise.name
    // const completed = req.body.completed ? req.body.completed : session.completed

    const updatedExercise = await exerciseModel.update(req.params.id, name, type, description);

    res.status(200).json(updatedExercise);
})

// @desc    Delete exercise
// @route   DELETE /api/exercises/:id
// @access  Private
const deleteExercise = asyncHandler(async (req, res) => {
    const exercise = await exerciseModel.findById(req.params.id);

    if (!exercise) {
        res.status(400);
        throw new Error('Session not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure logged in user matches goal user
    console.log(exercise.user_id, req.user.id)
    if (exercise.user_id !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await exerciseModel.remove(req.params.id);

    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
}
