import React from 'react';
import Animate from '../Animate';
import style from './index.scss';

const Loading = ({ visible, ...props }) => (
  <Animate in={visible} {...props}>
    <div className={style.loading}>
      <span className={style['loading-text']}>Loading...</span>
    </div>
  </Animate>
);

export default Loading;
