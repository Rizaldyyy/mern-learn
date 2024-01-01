import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createGoal } from '../features/goal/goalSlice'

function GoalForm() {

    const [text, setText] = useState('')
    const dispatch = useDispatch(useDispatch)

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(createGoal({ text: text }))
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }

  return (
    <section className="form">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="text">Goal: </label>
                <input type="text" value={text} name="text" id="text" className="form-control" onChange={handleChange}/>
            </div>
            <div className="form-grou">
                <button type="submit" className='btn btn-block'>
                    Add Goal
                </button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm
