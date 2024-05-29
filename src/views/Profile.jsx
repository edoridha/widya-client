import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/actions';
import { Button } from '@mui/material';
import ChangePassword from '../components/ChangePassword';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userList.user);
  const loading = useSelector((state) => state.userList.loading);
  const error = useSelector((state) => state.userList.error);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something Went Wrong...</h1>;
  }

  return (
    <div className='m-5'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h6 style={{ margin: '0.5rem' }}>Name : {user.name}</h6>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h6 style={{ margin: '0.5rem' }}>Email : {user.email}</h6>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h6 style={{ margin: '0.5rem' }}>Gender : {user.gender}</h6>
      </div>
      <div className='m-2 flex d-flex'>
        <Button data-bs-toggle="modal" data-bs-target="#exampleModal">Change Password</Button>
        <ChangePassword />
      </div>
    </div>
  );
}
