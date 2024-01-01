import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {reset, register} from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} =  formData

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

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = 0
        if (!name.trim()) {
            toast.error('Username is required')
            error++
        }
        if (!email.includes('@')) {
            toast.error('Invalid email format')
            error++
        }
        if(password !== password2){
            toast.error('Password does not match')
            error++
        }

        if(error > 0){
            return false;
        }

        const userData = {
            name,
            email,
            password
        }

        dispatch(register(userData))
    };

    if(isLoading){
        return (<Spinner />)
    }

    return (
        <>
            <section className="heading">
                <h1><FaUser/> Register</h1>
                <p>Please register and account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            value={name} 
                            placeholder="Please enter your name" 
                            onChange={handleChange}
                        />
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
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password2" 
                            name="password2" 
                            value={password2} 
                            placeholder="Confirm password" 
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

export default Register
