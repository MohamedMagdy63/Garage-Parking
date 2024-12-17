"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';
import { GET_ALL_ORDER } from '@/gql/Query';

const columns = [
  { field: 'ordersID', headerName: 'ID', width: 70 },
  { field: 'ownerName', headerName: 'Driver Name', width: 130 },
  { field: 'email', headerName: 'Driver Email', width: 220 },
  { field: 'carNumber', headerName: 'Plate Numbers', width: 130 },
  { field: 'carText', headerName: 'Plate Letters', width: 130 },
  { field: 'arriveTime', headerName: 'Entry Date', width: 130,
    renderCell: (params)=>{
      return <p>{new Date(params.value).getDate()}/{new Date(params.value).getMonth()+1}/{new Date(params.value).getFullYear()}</p> 
    }
  },
  { 
    field: 'Entry Time', 
    headerName: 'Entry Time', 
    width: 130,
    renderCell: (params)=>{
      return <p>{new Date(params.row.arriveTime).getHours()}:{new Date(params.row.arriveTime).getMinutes()}</p> 
    }
  },
  { field: 'leaveTime', headerName: 'Leaving Date', width: 130,
    renderCell: (params)=>{
      return <p>{new Date(params.value).getDate()}/{new Date(params.value).getMonth()+1}/{new Date(params.value).getFullYear()}</p> 
    }
  },
  { 
    field: 'Leaving Time', 
    headerName: 'Leaving Time', 
    width: 130,
    renderCell: (params)=>{
      return <p>{new Date(params.row.leaveTime).getHours()}:{new Date(params.row.leaveTime).getMinutes()}</p> 
    } 
  },
  { field: 'licenseImage', headerName: 'Driver License', width: 130,
    renderCell: (params)=>{
      return (
        <a href={process.env.NEXT_APP_IMAGE_URL + params.value} target='_blank'>
          <img 
          src={process.env.NEXT_APP_IMAGE_URL + params.value} 
          alt="Licence"  
          className='object-contain w-24 h-24'/> 
        </a>
      )
    }
  },
  { field: 'reason', headerName: 'Reason of entry', width: 130 },
  { 
    field: 'STATUS', headerName: 'Status', width: 130,
    renderCell: (params)=>{
      return (
        <>
          {params.value === null && params.row.expired === 1 &&
            <p className='bg-yellow-700 text-white text-center'>Holded</p>}
          {params.value === 1 &&
            <p className='bg-green-700 text-white text-center'>Accepted</p>}
          {params.value === 0 &&
            <p className='bg-red-700 text-white text-center'>Refused</p>}
          {params.value === null && params.row.expired === 0 &&
            <p className='bg-orange-500 text-white text-center'>Pending</p>}
        </>
      )
    } 
  },
  { 
    field: 'Employee', 
    headerName: 'Employee Name', 
    width: 130,
    renderCell: (params)=>{
      return params.row.employeesID && 
      <p>{params.row.employeesID[0].name}</p>
    } 
  },
  { 
    field: 'EmployeePhone', 
    headerName: 'Employee Phone', 
    width: 130,
    renderCell: (params)=>{
      return params.row.employeesID && 
               <p>{params.row.employeesID[0].phone}</p>
    } 
  }
];

export default function DataTable() {
  const {data,loading,error} = useQuery(GET_ALL_ORDER,{
    pollInterval: 500,
  })
  return (
    <div style={{ height: 600, width: '100%' }} className='bg-[#B3C8CF]'>
      {
        loading && <p>loading....</p>
      }
      {
        error && <p>Error! {console.error(error)}</p>
      }
      {
        data && 
          <DataGrid
            getRowId={(row) => row.ordersID}
            rows={ data.feedOrders }
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
      }
    </div>
  );
}