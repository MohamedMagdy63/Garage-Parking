"use client"
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
// AddEmployee.js
import React, { use, useEffect, useState } from 'react';
import { SignUp } from '../../gql/Mutation'
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { GET_CURRENT_USER } from '@/gql/Query';
import { Alert } from '@mui/material';

function AddEmployee() {
  const { data,loading,error } = useQuery(GET_CURRENT_USER,{
    variables:{employeesId: typeof window !== "undefined" && window.localStorage.getItem("Token")}
  })
  const [ values, setValues ] = useState()
  const router = useRouter()
  const client = useApolloClient()
  const [handleError,setHandleError] = useState(false)
  const [handleErrorMsg,setHandleErrorMsg] = useState(null)
  const [typeMsg,setTypeMsg] = useState(null)
  const [signUp] = useMutation(SignUp,
    {
      onError: (err)=>{
        if(err.message){
          setHandleError(true)
          setHandleErrorMsg(err.message)
          setTypeMsg(0)
          setTimeout(() => {
            setHandleError(false)
            setHandleErrorMsg(null)
            setTypeMsg(null)
          }, 5000);
        }
      },
      onCompleted:(data)=>{
        router.push({pathname: '/addEmployee' ,query: { successMsg: 'New Employee added' }},'/addEmployee')
      }
    })
    
  useEffect(()=>{
    (router.query.successMsg) &&
      setHandleError(true)
      setHandleErrorMsg(router.query.successMsg)
      setTypeMsg(1)
      setTimeout(() => {
        setHandleError(false)
        setHandleErrorMsg(null)
        setTypeMsg(null)
      }, 5000);
  },[router.query.successMsg])
  if(loading) return <p>loading</p>
  
  if(error) router.replace('/login')
  
  if(data && data.me.role === 0) return (
    <>
    <Navbar/>
    <div className='text-white'>
      {
        handleError ? 
          <Alert severity={`${typeMsg === 0 ? "error" : "success"}`}>{handleErrorMsg}</Alert>
        :''
      }
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" 
          onSubmit={(e)=>{
            e.preventDefault()
            signUp({variables:values})
          }}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    placeholder='Name'
                    required
                    className="block w-full outline-none p-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inse ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <label htmlFor="Phone Number" className="block text-sm font-medium leading-6 text-white">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="^01[0-2]\d{1,8}$"
                    required
                    placeholder='Phone Number'
                    className="block w-full outline-none p-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <label htmlFor="Address" className="block text-sm font-medium leading-6 text-white">
                  Address
                </label>
                <div className="mt-2">
                  <input
                    id="Address"
                    name="address"
                    type="text"
                    placeholder='Address'
                    required
                    className="block w-full outline-none p-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <label htmlFor="age" className="block text-sm font-medium leading-6 text-white">
                  Age
                </label>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder='Age'
                    required
                    className="block w-full outline-none p-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>{
                      setValues({
                        ...values,
                        [e.target.name]: parseInt(e.target.value)
                      })
                    }}
                  />
                </div>
            </div>
            <div>
                <label htmlFor="Role" className="block text-sm font-medium leading-6 text-white">
                  Role
                </label>
                <div className="mt-2">
                <select id="roles" name="role"
                  className="block w-full outline-none p-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  onChange={(e)=>{
                    setValues({
                      ...values,
                      [e.target.name]: parseInt(e.target.value)
                    })
                  }}
                >
                  <option value="">Choose the role</option>
                  <option value="0">Manger</option>
                  <option value="1">Employee</option>
                </select>
                </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  placeholder='Username'
                  required
                  className="block w-full outline-none p-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  placeholder='Password'
                  name="password"
                  type="password"
                  required
                  className="block w-full outline-none p-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                ADD Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
    
  );

  if(data && data.me.role === 1) router.replace('/authorized')
}

export default AddEmployee;