import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { loginUser, useAuthDispatch, useAuthState } from '../context';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAuthDispatch()
    const { loading, errorMessage, token } = useAuthState()
    const navigate = useNavigate();

    if (token) {
        return <Navigate to="/invoices" />;
    }
    const onSubmit = async userDetails => {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails)
            });
            const data = await response.json()
            if (data) {
                try {
                    let response = await loginUser(dispatch, data)
                    console.log("response", response.id)
                    if (!response.id) return
                    navigate(`/invoices`);
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
            <Card>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="storia-logo.png"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold font-poppins">Register new account</h2>
                    </div>
                    {
                        errorMessage ? <p className="text-red-200">{errorMessage}</p> : null
                    }
                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className='flex'>
                                <div>
                                    <label htmlFor="firstName" className="sr-only">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        {...register("firstName", { required: "First name is required" })}
                                        type="text"
                                        className={`form-control rounded-tl-md ${errors.firstName ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                        placeholder="First Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="sr-only">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        {...register("lastName", { required: "Last name is required" })}
                                        type="text"
                                        className={`form-control rounded-tr-md ${errors.lastName ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    {...register("email", { required: "Email Address is required", pattern: /^\S+@\S+$/i })}
                                    type="email"
                                    className={`form-control ${errors.email ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    {...register("password", { required: "Password is required" })}
                                    type="password"
                                    className={`form-control rounded-b-md ${errors.password ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary"
                                disabled={loading}
                            >
                                Register
                            </button>
                        </div>
                        <div className="text-sm text-center">
                            <Link to="/" className="link font-medium">
                                Already have an account?
                            </Link>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default Register