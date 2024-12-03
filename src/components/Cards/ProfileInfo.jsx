import React from 'react'
import Navbar from '../Navbar/Navbar'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo,onLogout}) =>{
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-black-950 font-medium bg-slate-100'>{getInitials(userInfo?.fullName)}</div>
        <div>
            <p className='text-sm font-medium'>{userInfo?.fullName}</p>
            <button className='' onClick={onLogout}>LogOut</button>
        </div>
    </div>
  )
}

export default ProfileInfo