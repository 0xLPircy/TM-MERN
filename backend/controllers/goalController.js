// @desc   Get Goals
// @route  GET /api/goals
// @access Private
const getGoals = (req, res) => {
    res.status(200).json({ message: 'Get goals' })
}

// @desc   Set Goals
// @route  POST /api/goals
// @access Private
const setGoal = (req, res) => {
    console.log(req.body)
    if (!req.body.text) {
        // res.status(400).json({ message: 'please add text field' })
        res.status(400)
        throw new Error('please add a tect field')
    }
    res.status(200).json({ message: 'Set goal' })
}

// @desc   Update Goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
}

// @desc   Delete Goals
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}