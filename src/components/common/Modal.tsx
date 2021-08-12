/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
import ModalPortal from './ModalPortal';

interface Props {
  isShow: boolean,
  titleAlign: 'left' | 'center' | 'right',
  title: string,
  onClose: () => void,
  children?: React.ReactNode,
}

const Modal: React.FC<Props> = ({ title, isShow, onClose, children, titleAlign }) => {
  return (
    isShow &&
      <div>
        <ModalPortal>
          <div css={css`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            text-align: center;

            &:last-of-type {
              background-color: rgba(0, 0, 0, 0.6);
            }
          `}>
            <section css={css`
              display: inline-block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              margin: 0;
              min-height: 300px;
              background: #fff;
              overflow: hidden;
              box-sizing: border-box;
              border-radius: 18px;
              box-shadow: 0px 20px 64px rgba(0, 0, 0, 0.31);
            `}>
              <header css={css`
                padding: 48px 48px 27px;
                font-size: 28px;
                font-weight: 700;
                line-height: 34px;
                letter-spacing: 0;
                text-align: ${titleAlign};
              `}>
                { title || '제목' }
                <button
                  type="button"
                  onClick={onClose}
                  css={css`
                    position: absolute;
                    padding: 0;
                    top: 37px;
                    right: 37px;
                    font-size: 20px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                  `}
                >X</button>
              </header>
              <main css={css`
                padding: 0 48px 48px;
              `}>
                { children }
              </main>
            </section>
          </div>
        </ModalPortal>
      </div>
  );
};

export default Modal;
