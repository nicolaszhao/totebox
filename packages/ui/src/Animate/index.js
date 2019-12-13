import React from 'react';
import { CSSTransition } from 'react-transition-group';
import style from './index.scss';

const classNames = (animation) => ({
  appear: style[`${animation}-appear`],
  appearActive: style[`${animation}-appear-active`],
  enter: style[`${animation}-enter`],
  enterActive: style[`${animation}-enter-active`],
  exit: style[`${animation}-exit`],
  exitActive: style[`${animation}-exit-active`],
});

const Animate = ({
  animation = 'fade',
  duration = 400,
  ...props
}) => (
  <CSSTransition
    {...props}
    classNames={classNames(animation)}
    timeout={duration}
    onEnter={(node) => {
      node.classList.add(style[animation]);
      node.style.transitionDuration = `${duration}ms`;
    }}
    appear
    unmountOnExit
  />
);

export default Animate;
