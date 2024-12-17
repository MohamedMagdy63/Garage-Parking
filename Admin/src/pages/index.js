import Navbar from '@/components/Navbar';
import BasicTable from '../components/BasicTable'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GET_CURRENT_USER } from '@/gql/Query';
import { useQuery } from '@apollo/client';

export default function Home() {
  const { data,loading,error } = useQuery(GET_CURRENT_USER,{
    variables:{employeesId: typeof window !== "undefined" && window.localStorage.getItem("Token")}
  })
  const router = useRouter();

  if(loading) return <p>loading</p>
  
  if(error) router.replace('/login')


  if(data && data.me.role === 0) return (
    <main>
      <Navbar/>
      <BasicTable/>
    </main>
  );
  if(data && data.me.role === 1) router.replace('/manageRequests')
}
