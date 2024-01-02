import axios from "axios"

const APP_URL = '/api/goals'

const headerToken = (token) => {
  return {
    headers: {
      'Authorization' : `Bearer ${token}`
    }
  }
} 

const getGoals = async (token) => {
  const response = await axios.get(APP_URL, headerToken(token))
  return response.data
}

const setGoals = async (token, goalData) => {
  const response = await axios.post(APP_URL, goalData, headerToken(token))
  return response.data
}

const updateGoal = async (goalData ,token) => {
  const { id } = goalData
  const response = await axios.put(`${APP_URL}/${id}`, goalData, headerToken(token))
  return response.data
}

const deleteGoal = async (id, token) => {
  const response = await axios.delete(`${APP_URL}/${id}`, headerToken(token))
  return response.data
}

const goalService = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal
}

export default goalService
