const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const { getGoals, setGoals, updateGoals, deleteGoals } =  require('../controllers/GoalController');

router.get('/', protect, getGoals);
router.post('/', protect, setGoals);
router.put('/:id', protect, updateGoals);
router.delete('/:id', protect, deleteGoals);

module.exports = router
