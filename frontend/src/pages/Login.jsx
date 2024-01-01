import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import {reset, login} from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} =  formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth) 

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    }, [user, isLoading, isSuccess, isError, message])

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = 0

        if (!email.includes('@')) {
            toast.error('Invalid email format')
            error++
        }
        if (!password.trim()) {
            toast.error('Password is required')
            error++
        }

        if(error > 0){
            return false;
        }

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    };

    if(isLoading){
        return (<Spinner />)
    }

    return (
        <>
            <section className="heading">
                <h1><FaSignInAlt/> Login</h1>
                <p>Please login your account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            value={email} 
                            placeholder="Please enter your email" 
                            onChange={handleChange}
                        />
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password" 
                            value={password} 
                            placeholder="Enter password" 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
