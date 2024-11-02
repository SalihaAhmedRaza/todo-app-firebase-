

import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { auth } from '../Firebase/config'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [error , setError] = useState(false)
    const email = useRef()
    const password = useRef()
  
    const navigate = useNavigate()
  
    const loginUser = (event) => {
      event.preventDefault()
      console.log(email.current.value);
      console.log(password.current.value);
  
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate('/admin/todo')
  
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          setError(errorMessage)
  
        });
    }
  
  return (
    <>

<div className="flex items-center justify-center h-screen overflow-hidden bg-white ml-96">
    <div className="flex flex-col sm:flex-row justify-center items-stretch space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row w-full">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-1/2 flex flex-col">
                <div className="p-4 flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Welcome Again!</h2>
                    <p className="text-gray-600 text-center mb-8">login your account </p>
             
                    <form onSubmit={loginUser}>
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
                         
                            
                        </div>

                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
                            <div className="relative w-full">
                                <fieldset className="border border-gray-400 rounded p-1">
                                    <legend className="text-gray-500 text-sm px-2">Email</legend>
                                    <input
                                        required
                                        className="bg-transparent rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none"
                                        ref={email}
                                        type="email"
                                      
                                    />
                                </fieldset>
                            </div>

                            
                        </div>

                        <div className="relative w-full mb-4">
                            <fieldset className="border border-gray-400 rounded p-1">
                                <legend className="text-gray-500 text-sm px-2">Password</legend>
                                <input
                                    required
                                    className="bg-transparent rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none"
                                    ref={password}
                                    type="password"
                                   
                                />
                            </fieldset>
                        </div>

                       

                        <button
                            type="submit"
                            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-6 rounded w-full mt-5"
                        >
                            login
                        </button>

                        

                      

                      
                    </form>
                    <p>{error && error}</p>
                </div>
            </div>
        </div>
    </div>
</div>


    
    
    </>
  )
}

export default Login
