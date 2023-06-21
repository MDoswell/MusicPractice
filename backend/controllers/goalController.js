const asyncHandler = require('express-async-handler');
const goalServices = require('../services/goalServices');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalServices.getGoals();

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

    const goal = await goalServices.setGoal(req.body.text);

    res.status(200).json(goal);
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await goalServices.updateGoal(req.params.id, req.body.text);

    res.status(200).json(goal);
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await goalServices.deleteGoal(req.params.id);

    res.status(200).json(goal);
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
