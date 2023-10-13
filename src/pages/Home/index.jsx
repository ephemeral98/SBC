import React, { useState } from 'react';
import { useMemo } from 'react';
import css from './index.module.css';
import SwitchBtn from '../../components/SwitchBtn';
import { useWhoAmI } from '../../hooks/useWhoAmI';
import Logout from '../../components/Logout';

export default () => {
  const { user } = useWhoAmI();

  const [isBack, setIsBack] = useState(false);
  const [backEnd, setBackEnd] = useState(false);

  /**
   * 卡牌翻面
   */
  const turnAround = () => {
    setIsBack(!isBack);
  };

  const doBackEnd = () => {
    setBackEnd(isBack);
  };

  const doEdit = () => {
    setIsBack(true);
  };

  // 卡牌
  const [cardList, setCardList] = useState([
    {
      id: 1,
      num: 1,
      text: '',
      isShow: true,
    },
    {
      id: 2,
      num: 2,
      text: '',
      isShow: false,
    },
    {
      id: 3,
      num: 3,
      text: '',
      isShow: false,
    },
  ]);

  const showingCard = useMemo(() => cardList.find((item) => item.isShow), [cardList]);

  const showingCardInx = useMemo(() => cardList.findIndex((item) => item.isShow), [cardList]);

  /**
   * 输入
   */
  const doInp = (e) => {
    const newList = cardList.map((item) => {
      if (item.id === showingCard.id) {
        item.text = e.target.value;
      }
      return item;
    });

    setCardList(newList);
  };

  /**
   * 切换卡牌
   */
  const doSwitch = (dir) => {
    let newList = cardList;
    if (dir === 'left') {
      console.log('left');
      newList = cardList.map((item) => {
        if (showingCard.id > cardList[0]?.id) {
          item.isShow = item.id === cardList[showingCardInx - 1]?.id;
        }
        return item;
      });
    } else {
      console.log('right');

      newList = cardList.map((item) => {
        if (showingCard.id < cardList[cardList.length - 1].id) {
          item.isShow = item.id === cardList[showingCardInx + 1]?.id;
        }
        return item;
      });
    }

    setCardList(newList);
  };

  /**
   * 删除
   */
  const doDel = () => {
    const newList = cardList
      .filter((item) => item.id !== showingCard.id)
      .map((item) => {
        if (showingCard.id === cardList[0].id) {
          // 删除的第一张，
          item.isShow = item.id === cardList[showingCardInx + 1]?.id;
        } else {
          item.isShow = item.id === cardList[showingCardInx - 1]?.id;
        }
        return item;
      });
    console.log('newList...', newList);
    setCardList(newList);
  };

  return (
    <div className={css['home-wrap']}>
      <Logout />

      <header>Login: {user.name}</header>

      {!!cardList.length && (
        <SwitchBtn onLeft={() => doSwitch('left')} onRight={() => doSwitch('right')} />
      )}
      {cardList.length ? (
        <main
          onTransitionEnd={() => doBackEnd()}
          className={`${css['home-container']} ${isBack && css['is-back']}`}
        >
          <div onClick={() => turnAround()} className={css['home-container-bg']}></div>

          {/* 正面 */}
          <div className={`${css['flex-center']} ${css['number']} ${!backEnd && css['is-top']}`}>
            {showingCard.num}
          </div>

          {/* 背面 */}
          <div
            className={`${css['flex-center']}
         ${backEnd && css['back-end']}
        ${css['back-face']}
        ${backEnd && css['is-top']}
        `}
          >
            <input
              type="text"
              className={css['inp']}
              value={showingCard.text}
              onInput={(e) => doInp(e)}
            />
          </div>
        </main>
      ) : (
        <main className={`${css['home-container']} ${css['flex-center']}`}>空</main>
      )}
      <footer className={`${css['home-footer']} ${css['flex-center']}`}>
        {user.role === 'admin' && <button onClick={() => doDel()}>删除</button>}
        <button onClick={() => doEdit()}>编辑</button>
      </footer>
    </div>
  );
};
