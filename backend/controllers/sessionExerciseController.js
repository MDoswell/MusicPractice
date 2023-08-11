const asyncHandler = require('express-async-handler');
const sessionExerciseModel = require('../models/sessionExerciseModel');

// @desc    Get exercises
// @route   GET /api/exercises
// @access  Private
const getSessionExercises = asyncHandler(async (req, res) => {
    const { session, exercises } = await sessionExerciseModel.readAll(req.params.sessionId);
    // const exercises = `session ${req.params.sessionId} exercises` 

    if (!session) {
        res.status(400);
        throw new Error('Session not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure logged in user matches session user
    if (session.user_id !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    res.status(200).json(exercises);
})

// @desc    Add exercise to session
// @route   POST /api/exercises
// @access  Private
const addSessionExercise = asyncHandler(async (req, res) => {
    const session = await sessionExerciseModel.checkSession(req.params.sessionId)

    if (!session) {
        res.status(400);
        throw new Error('Session not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    console.log(session, req.user.id)

    // Make sure logged in user matches session user
    if (session.user_id !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const exercise = await sessionExerciseModel.create(
        req.params.sessionId,
        req.body.exerciseId,
        req.body.position,
        req.body.duration,
        req.body.notes
    );

    console.log(exercise)

    res.status(200).json(exercise);
})

// @desc    Update exercise
// @route   PUT /api/exercises/:id
// @access  Private
const updateSessionExercise = asyncHandler(async (req, res) => {
    const exercise = await sessionExerciseModel.findById(req.params.sessionId, req.params.exerciseId, req.body.position);

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

    console.log(req.body.completed)

    const duration = req.body.duration ? req.body.duration : exercise.duration
    const notes = req.body.notes ? req.body.notes : exercise.notes
    const completed = (req.body.completed === 0 || req.body.completed === 1) ? req.body.completed : exercise.completed

    console.log("completed?", completed)

    const updatedExercise = await sessionExerciseModel.update(
        req.params.sessionId,
        req.params.exerciseId,
        req.body.position,
        duration,
        notes,
        completed
    );

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
    getSessionExercises,
    addSessionExercise,
    updateSessionExercise,
    // deleteExercise
}
