import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Card from '../components/Card'
import { loginUser, useAuthDispatch, useAuthState } from '../context'

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAuthDispatch()
    const { loading, errorMessage } = useAuthState()

    const navigate = useNavigate();

    const onSubmit = async data => {
        try {
            let response = await loginUser(dispatch, data)
            if (!response?.id) return
            navigate(`/invoices`);
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
                        <h2 className="mt-6 text-center text-3xl font-extrabold font-poppins">Login in to your account</h2>
                    </div>

                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>

                        <div className="rounded-md shadow-sm -space-y-px">
                            {
                                errorMessage ? <p className="text-white bg-red-300 rounded-md p-2 mb-2">{errorMessage}</p> : null
                            }
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    {...register("email", { required: "Email address is required", pattern: /^\S+@\S+$/i })}
                                    type="email"


                                    className={`form-control rounded-t-md ${errors.email ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
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
                                Login
                            </button>
                        </div>
                        <div className="text-sm text-center">
                            <Link to="register" className="link font-medium">
                                Don't have account yet?
                            </Link>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default Login