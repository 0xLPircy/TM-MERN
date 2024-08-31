
const GoalItem = ({goal}) => {
  return (
    <div className="goal">
        <div>
            {new Date(goal.createdAt).toLocaleString("en-US")}
            <h2>{goal.text}</h2>
        </div>
    </div>
  )
}

export default GoalItem