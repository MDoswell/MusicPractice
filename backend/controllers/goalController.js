const asyncHandler = require('express-async-handler');
const goalModel = require('../models/goalModel');
const userModel = require('../models/userModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.readAll(req.user.id);

    res.status(200).json(goals);
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    }

    const goal = await goalModel.create(req.user.id, req.body.text);

    res.status(200).json(goal);
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await goalModel.findById(req.params.id);

    console.log(goal);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    
    // Make sure logged in user matches goal user
    if (goal.user_id !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await goalModel.update(req.params.id, req.body.text);

    res.status(200).json(updatedGoal);
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await goalModel.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure logged in user matches goal user
    if (goal.user_id !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await goalModel.remove(req.params.id);

    res.status(200).json({ id: req.params.id });
})

const getTest = asyncHandler(async (req, res) => {
    const testRes = "test successful";

    res.status(200).json(testRes);
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    getTest
}
