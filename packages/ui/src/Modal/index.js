import React from 'react';
import classNames from 'classnames';
import Portal from './Portal';
import Animate from '../Animate';
import style from './index.scss';

const createModalRoot = () => {
  const root = document.createElement('div');

  root.id = 'modal-root';
  document.body.appendChild(root);

  return root;
};

const modalRoot = createModalRoot();
const noop = () => {};

// TODO: 关闭按钮可见性的配置
const Modal = ({
  title = 'Title',
  visible,
  animation = 'zoom',
  children,
  onClose = noop,
}) => (
  <Portal container={modalRoot}>
    <Animate in={visible}>
      {(state) => (
        <div className={classNames(style.modal, style['modal-mask'])}>
          <div className={style['modal-wrapper']}>
            <Animate
              in={state === 'entered'}
              animation={animation}
            >
              <div className={style['modal-container']}>
                <header className={style['modal-header']}>
                  <h1>{title}</h1>
                  <button
                    type="button"
                    aria-label="close"
                    className={style['modal-close-button']}
                    onClick={onClose}
                  />
                </header>
                <section className={style['modal-content']}>
                  {children}
                </section>
              </div>
            </Animate>
          </div>
        </div>
      )}
    </Animate>
  </Portal>
);

export default Modal;
