import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

export default function Profile() {
  const user = useSelector((state) => state.user);
  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
}
