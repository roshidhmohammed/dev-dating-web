import React, { useEffect } from 'react'
import { axiosInstance } from '../utils/apis/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections, removeConnections } from '../utils/slices/connectionsSlice'
import { toast } from 'sonner'

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector(store => store.connections)

    const fetchConnections =async()=>{
        await axiosInstance.get('user/connections', {withCredentials:true})
        .then((res)=>{
            dispatch(addConnections(res.data.data))
        })
        .catch((error)=>{
            
            dispatch(removeConnections())
            toast.error(error.response.data)
        })
    }

    useEffect(()=>{
        fetchConnections()
    }, [])

    if(!connections) return 

     if(connections?.length ===0 ) return <h1 className=" font-bold text-center text-white pt-40">No connections found</h1>
console.log(connections[0]?.senderId)
  return (
    <div className='mt-20'>
        <h1 className=' text-center mb-5 text-2xl font-bold'>Connections</h1>
        <div className=' flex justify-start flex-col items-center gap-5'>
            {connections?.map((connection) => (
                <div key={connection._id} className='bg-base-200 p-3 w-1/3 rounded-lg flex justify-start items-center gap-3'>
                    <img src={connection?.profilePic} alt=""  className=' h-20 w-20 rounded-full'/>
                   <div className=''>
                     <div className=' flex gap-1'>

                    <h1>{connection.firstName}</h1>
                    <h1>{connection.lastName}</h1>
                    </div>
                    <div className=' flex gap-2'>
                        <h1>{connection?.age},</h1>
                         <h1>{connection?.gender}</h1>
                    </div>
                    <div className=' flex gap-2'>
                        <h1>{connection?.about}</h1>
                    </div>
                   </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Connections