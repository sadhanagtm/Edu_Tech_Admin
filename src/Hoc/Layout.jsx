import React, {useEffect, useState}from 'react'
import{Outlet} from 'react-router-dom'
import Sidebar from '../component/Navigation/Sidebar'
import { useNavigate } from 'react-router-dom'
import Toolbar from '../component/Navigation/Toolbar'




 function Layout() {

  const Navigate=useNavigate()
  const [token,settoken]=useState(false);
  useEffect(()=>{
  if(localStorage.getItem("token")){
    settoken(true)

      


  }


  else{
    Navigate("/login")

  }

  },[localStorage]
  )





  return (
    <div className='flex '>
     <Sidebar/>
     <div className='w-full '>
     <Toolbar />
      <div className='mx-10'>
      <Outlet/>
      </div>
     </div>
    </div>
  )
}
export default Layout