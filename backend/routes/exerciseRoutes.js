const express = require('express');
const router = express.Router();
const { getExercises, createExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController');
const { getSessionExercises, addSessionExercise, updateSessionExercise, updateSessionExercisePositions, deleteSessionExercise } = require('../controllers/sessionExerciseController')
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getExercises)
    .post(protect, createExercise);

router.route('/:id')
    .put(protect, updateExercise)
    .delete(protect, deleteExercise);

router.route('/session/:sessionId')
    .get(protect, getSessionExercises)
    .post(protect, addSessionExercise)
    .put(protect, updateSessionExercisePositions);

router.route('/session/:sessionId/:exerciseId')
    .put(protect, updateSessionExercise)
    .delete(protect, deleteSessionExercise)

module.exports = router;
