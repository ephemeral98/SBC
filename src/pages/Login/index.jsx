import React, { useState } from 'react';
import css from './index.module.css';
import { localMemory } from '../../utils/localMemory';
import { useNavigate } from 'react-router';

export default () => {
  const [users] = useState([
    {
      name: 'Tom',
      role: 'admin',
    },
    {
      name: 'Mary',
      role: 'user',
    },
  ]);

  // 用户名
  const [username, setUserName] = useState('');

  /**
   * 输入用户名
   */
  const doInput = (e) => {
    setUserName(e.target.value);
  };
  const navigate = useNavigate();

  /**
   * 登录
   */
  const doSubmit = (e) => {
    e.preventDefault();

    for (const item of users) {
      if (item.name === username) {
        // 登录成功
        localMemory.setItem({ name: 'auth', value: item });
        navigate('/')
        break;
      }
    }
  };

  return (
    <>
      <form className={css['login-wrap']} onSubmit={(e) => doSubmit(e)}>
        <header className={css['login-title']}>login</header>

        <input type="text" className={css['inp']} onInput={(e) => doInput(e)} value={username} />

        <button className={css['login-btn']} type="submit">
          登录
        </button>
      </form>

      <footer className={css['footer']}>
        <div>郭振强</div>
        <div className={css['bold']}>+86 15975085697</div>
        <div>ba.ineffable@gmail.com</div>
      </footer>
    </>
  );
};
