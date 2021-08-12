/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ModalPortal from './ModalPortal';

interface Props {
  isShow: boolean,
  title: string,
  onClose: () => void,
  children?: React.ReactNode,
}

const Modal: React.FC<Props> = ({ title, isShow, onClose, children }) => {
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
              position: relative;
              margin: 100px auto;
              width: 400px;
              min-height: 500px;
              background: #fff;
              overflow: hidden;
              box-sizing: border-box;
            `}>
              <header css={css`
                padding-top: 10px;
                height: 50px;
                font-size: 24px;
                text-align: center;
              `}>
                { title || 'Notice' }
                <button
                  type="button"
                  onClick={onClose}
                  css={css`
                    position: absolute;
                    top: 10px;
                    right: 30px;
                    font-size: 18px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                  `}
                >X</button>
              </header>
              <main>
                { children }
              </main>
            </section>
          </div>
        </ModalPortal>
      </div>
  );
};

export default Modal;
