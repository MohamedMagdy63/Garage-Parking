import Navbar from '@/components/Navbar';
import { ChengeState } from '@/gql/Mutation';
import { GET_ALL_REQUSETS, GET_CURRENT_USER } from '@/gql/Query';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';


const DriveRequestCard = ({ request }) => {
  const [chengeState] = useMutation(ChengeState,{
    refetchQueries:[GET_ALL_REQUSETS],
  })

  const { ordersID, 
          ownerName, 
          reason, 
          carType, 
          arriveTime, 
          leaveTime,
          carNumber, 
          carText,
          licenseImage,
          email } = request;

  const handleApprove = (ordersID,status) => {
    // Handle approve logic
    chengeState({
      variables:{
        ordersId: ordersID,
        status: status
      }
    })
  };

  const handleDeny = (ordersID,status) => {
    // Handle deny logic
    chengeState({
      variables:{
        ordersId: ordersID,
        status: status
      }
    })
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-2xl font-bold mb-2">Request ID: {ordersID}</h3>
      <p className="text-gray-600 font-bold">Driver Name: {ownerName}</p>
      <p className="text-gray-600 font-bold ">Driver Email: {email}</p>
      <p className="text-gray-600 font-bold">Plate Numbers: {carNumber}</p>
      <p className="text-gray-600 font-bold">Plate Letters: {carText}</p>
      <p className="text-gray-600 font-bold">Car Type: {carType}</p>
      <p className="text-gray-600 font-bold">Reason of entrance: {reason}</p>
      <p className="text-gray-600 font-bold">Entry Date: {new Date(arriveTime).getDate()}-{new Date(arriveTime).getMonth()+1}-{new Date(arriveTime).getFullYear()}</p>
      <p className="text-gray-600 font-bold">Entry Time: {new Date(arriveTime).getHours()}:{new Date(arriveTime).getMinutes()}</p>
      <p className="text-gray-600 font-bold">Departure Date: {new Date(leaveTime).getDate()}-{new Date(leaveTime).getMonth()+1}-{new Date(leaveTime).getFullYear()}</p>
      <p className="text-gray-600 font-bold">Departure Time: {new Date(leaveTime).getHours()}:{new Date(leaveTime).getMinutes()}</p>
      <div>
        <p className="text-gray-600 font-bold">Driving License:</p>
        <a href={process.env.NEXT_APP_IMAGE_URL + licenseImage} className='block w-[35%] h-[35%] mt-5 '   target='_blank'>
          <img src={process.env.NEXT_APP_IMAGE_URL + licenseImage}   alt="licence" className='relative rounded-3xl object-contain w-full h-full' />
        </a>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2" onClick={()=>{handleApprove(ordersID,1)}}>Approve</button>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={()=>{handleDeny(ordersID,0)}}>Deny</button>
      </div>
    </div>
  );
};

const DriveRequests = () => {
  const router = useRouter()
  const { data: userData, loading: userLoading, error:userError } = useQuery(GET_CURRENT_USER,{
    variables:{employeesId: typeof window !== "undefined" && window.localStorage.getItem("Token")}
  })
  const {data,loading,error} = useQuery(GET_ALL_REQUSETS,{
    pollInterval:500
  })
  if(loading) return <p>Loading....</p>
  if(error) return <p>Error! {console.error(error)}</p>

  if(userLoading) return <p>Loading....</p>
  if(userError) router.push('/login')
  if(userData && userData.me.role === 0) router.push('/authorized')

  if(userData && userData.me.role === 1){
    return (
      <>
      <Navbar/>
      <div className="drive-requests">
        {data.ordersByState.map(request => (
          <DriveRequestCard key={request.ordersID} request={request} />
        ))}
      </div>
      </>
      
    )
  } else {
    return (
      <>
      <Navbar/>
      <p className='text-white'>oooo</p>
      </>
    )
  }
};

export default DriveRequests;
