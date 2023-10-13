import React from 'react';
import { useNavigate } from 'react-router';
import { localMemory } from '../../utils/localMemory';
import css from './index.module.css';

export default () => {
  const navigate = useNavigate();

  const doLogout = () => {
    localMemory.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className={css['logout-wrap']} onClick={() => doLogout()}>
      Logout
    </div>
  );
};
