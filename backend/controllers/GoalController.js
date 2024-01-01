const asyncHandler = require('express-async-handler');

// Models
const Goal = require('../models/GoalsModel');
const User = require('../models/UsersModel');

// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json({ message: "Get Goals.", data: goals});
});

// @desc Set Goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  if(!req.body.text){
    res.status(400);
    throw new Error('Please add a Text');
  }

  const goals = await Goal.create({
    user: req.user.id,
    text: req.body.text
  });

  res.status(200).json({ message: "Set Goals.", data: goals});
});

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error('Goal not found!');
  }

  // check user
  if(!req.user){
    res.status(401);
    throw new Error('User not found!');
  }

  // check if can update same user's goals
  if(goal.user.toString() !== req.user.id){
    res.status(401);
    throw new Error('This goal is not yours!');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({ message: `Update Goals. ID: ${req.params.id}`, data: updatedGoal });
});

// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error('Goal not found!');
  }

   // check user
   if(!req.user){
     res.status(401);
     throw new Error('User not found!');
   }
 
   // check if can update same user's goals
   if(goal.user.toString() !== req.user.id){
     res.status(401);
     throw new Error('This goal is not yours!');
   }

  await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: `Delete Goals. ID: ${req.params.id}`, data: { _id: req.params.id } });
});

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
