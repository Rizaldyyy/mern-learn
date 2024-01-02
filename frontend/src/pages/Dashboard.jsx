import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { resetGoal, getGoals } from '../features/goal/goalSlice'
import { logout, reset } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'
import GoalItem from "../components/GoalItem"
import GoalForm from "../components/GoalForm"

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { goals, isGoalLoading, isGoalSuccess, isGoalError, messageGoal } = useSelector((state) => state.goal)

  useEffect(() => {
    if(!user){
      navigate('/login')
    } else {
      dispatch(resetGoal())
      dispatch(getGoals())
    }

    if(messageGoal == "Not authorized"){
      dispatch(reset())
      dispatch(logout())
    }

    if(isGoalError){
      toast.error(messageGoal)
    }
    
  }, [ user, isGoalError, messageGoal, dispatch ])

  if(isGoalLoading){
    return (<Spinner />)
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome to your Goals, { user && user.data.name.toUpperCase() }</h1>
        <p>Start to add more goals!</p>
      </section>
      <GoalForm />
      <section className="goals">
        {goals.data?.length > 0 ? (
          <div className='goals'>
            {goals.data.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
