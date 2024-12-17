"use client"
import { SignIn } from '@/gql/Mutation';
import { GET_CURRENT_USER } from '@/gql/Query';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
// AddEmployee.js
import React, { useState } from 'react';

function Login() {
  const { data,loading,error } = useQuery(GET_CURRENT_USER,{
    variables:{employeesId: typeof window !== "undefined" && window.localStorage.getItem("Token")}
  })
  const router = useRouter()
  const client = useApolloClient()
  const [values,setValues] = useState()
  const [handleError,setHandleError] = useState(false)
  const [handleErrorMsg,setHandleErrorMsg] = useState(null)
  const [signIn] = useMutation(SignIn,{
    onCompleted:(data)=>{
      localStorage.setItem("Token",data.signIn)
      client.writeQuery({
        query: gql`
            {
                isLoggedIn @client
            }
        `,
        data:{ isLoggedIn: true }
      })
      router.push('/')
    },
    onError:(err)=>{
      if(err.message){
        setHandleError(true)
        setHandleErrorMsg(err.message)
        setTimeout(() => {
          setHandleError(false)
          setHandleErrorMsg(null)
        }, 5000);
      }
    }
  })

  if(loading) return <p>loading</p>

  if(error) return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {
        handleError ? 
          <Alert severity="error">{handleErrorMsg}</Alert>
        :''
      }
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" 
          onSubmit={(e)=>{
            e.preventDefault()
            signIn({variables:values})
          }}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>{
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value
                    })
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e)=>{
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value
                    })
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#A34343] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#e27c7c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  );

  if(data) router.replace('/')
}

export default Login;