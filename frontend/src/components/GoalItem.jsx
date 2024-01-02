import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaCheckCircle, FaRegCheckCircle, FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa'
import { updateGoal, deleteGoal } from '../features/goal/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  const [ showInput, setShowInput ] = useState(false);
  const [ text, setText ] = useState(goal.text);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateGoal({ id: goal._id, text })) // sends goal id and the updated text
  }

  const handleChangeStatus = () => {
    dispatch(updateGoal({ id: goal._id, status: 1 })) // complete
  }
  
  return (
    <div className={`goal ${ goal.status === 1 && 'goal-complete' } `}>
      <button 
        className='complete' 
        title='Check Goal' 
        disabled={goal.status === 1 ? true : false}
        onClick={ handleChangeStatus }
      >
        { goal.status ? <FaRegCheckCircle /> : <FaCheckCircle /> }
      </button>

      { 
        goal.status === 0 &&
        <>
          <button onClick={ () => setShowInput(!showInput) } className='edit' title='Edit Goal'>
            { showInput ? <FaTimes /> : <FaEdit /> } 
          </button>
        </>
      }

      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close' title='Delete Goal'>
        <FaTrashAlt />
      </button>

      { 
        showInput 
          ? 
          <form onSubmit={handleSubmit}>
            <textarea 
              className='textarea' 
              name="text" 
              id="text" 
              cols="30" 
              rows="10" 
              value={text} 
              onChange={ (e) => setText(e.target.value) }
            ></textarea>
            <button type="submit" className='btn btn-block'>
                Update
            </button>
          </form>
          : 
          <h2 className='text'>{text}</h2>
      }
      
      <div className='date'>{new Date(goal.updatedAt ?? goal.createdAt).toLocaleString('en-US')}</div>
      
    </div>
  )
}

export default GoalItem
