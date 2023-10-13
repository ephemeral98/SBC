import React from 'react';
import css from './index.module.css';

export default (props) => {
  return (
    <div className={css['switch-btn-wrap']}>
      <div onClick={() => props.onLeft()} className={css['left']}>
        prev
      </div>
      <div onClick={() => props.onRight()} className={css['right']}>
        next
      </div>
    </div>
  );
};
