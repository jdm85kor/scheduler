/** @jsx jsx */
import React from 'react';
import Modal from './Modal';
import { jsx, css } from '@emotion/react';

interface Props {
  isShow: boolean,
  onClose: () => void,
  onDelete: () => void,
};

const ConfirmModal: React.FC<Props> = ({ isShow, onClose, onDelete}) => {
  return (
    <Modal isShow={isShow} title="일정 만들기" titleAlign="center" onClose={onClose}>
      <div>
        <div css={css`
          width: 316px;
        `}>
          <span>
            해당 일정을 삭제하시겠습니까?
          </span>
        </div>
        <div css={css`
          text-align: center;
          & > button {
            margin: 40px 12px 0 0;
            width: 152px;
            height: 52px;
            border: none;
            cursor: pointer;

            &:first-of-type {
              background: #F3F3F3;
              color: #000;
            }
            &:last-of-type {
              margin-right: 0;
              background: #000;
              color: #fff;
            }
          }
        `}>
          <button type="button" onClick={onClose}>취소</button>
          <button
            type="button"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;