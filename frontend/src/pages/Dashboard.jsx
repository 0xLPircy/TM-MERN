import { useEffect } from "react";
import {useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner"
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, isSuccess, message} = useSelector((state) => state.goals) 

  useEffect(() => {
   if(!user){
    navigate("/login")
   }
   if(isError){
    console.log(message)
   }
   dispatch(getGoals())

  //  to execute on unmount, return from the useeffect
  dispatch(reset())
  }, [user, navigate, isError, message, dispatch])
  
if(isLoading){
  return <Spinner/>
}

  return <>
    <section>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
    </section>
    {/* {goals.map((goal) => {
      console.log(goal);
      return (<h3>{goal.text}</h3>);
    })} */}
    <GoalForm/>
    <section className="content">
      {goals.length > 0 ? (goals.map((goal) => (
        <GoalItem key={goal._it} goal={goal}/>
      ))) : (<h3>You havent set any vals</h3>)}
    </section>
  </>;
};

export default Dashboard;
