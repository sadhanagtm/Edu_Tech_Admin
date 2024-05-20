import React from 'react'
import Table from '../page component/Table'
import { Link } from 'react-router-dom';

function Kyctable() {
    const data=[];
    const columns=[]
  return (
    <div className='mt-20'>
        <Table data={data} columns={columns} />
        <Link to={'/Kycdata'}>
        <button className='h-16 w-28 bg-red-800 text-white text-xl font-bold rounded-xl '>Click here</button>
        </Link>

    </div>
  )
}

export default Kyctable;