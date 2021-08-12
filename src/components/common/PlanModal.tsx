/** @jsx jsx */
import React, { useState } from 'react';
import Modal from './Modal';
import { jsx, css } from '@emotion/react';
import ConfirmModal from './ConfirmModal';

interface Props {
  isShow: boolean,
  onClose: () => void,
  savePlan: () => void,
  deletePlan: () => void,
  type?: 'create' | 'modify',
};

const PlanModal: React.FC<Props> = ({ isShow, onClose, savePlan, deletePlan, type }) => {
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);
  return (
    <div>
      <Modal
        isShow={isShow}
        title={type === 'modify' ? '일정 수정하기' : '일정 만들기'}
        titleAlign="left"
        onClose={onClose}
      >
        <div>
          <div css={css`
            width: 560px;
          `}>
            <div css={css`
              margin-bottom: 24px;
            `}>
              <label
                css={css`
                  display: block;
                  height: 18x;
                  text-align: left;
                  color: #828282;
                `}
              >
                일정 제목을 입력하세요
              </label>
              <input
                css={css`
                  width: 100%;
                  height: 30px;
                  border: none;
                  border-bottom: 1px solid #E0E0E0;
                  &:focus {
                    outline: none;
                    border-bottom: 1px solid #333333;
                  }
                `}
              />
            </div>
            <div css={css`
              display: inline-block;
              width: calc((100% - 20px) / 2);
              margin-right: 20px;
              margin-bottom: 24px;
            `}>
              <label
                css={css`
                  display: block;
                  height: 18x;
                  text-align: left;
                  color: #828282;
                `}
              >
                시작 날짜
              </label>
              <input
                css={css`
                  width: 100%;
                  height: 30px;
                  border: none;
                  border-bottom: 1px solid #E0E0E0;
                  &:focus {
                    outline: none;
                  }
                `}
                type="date"
              />
            </div>
            <div css={css`
              display: inline-block;
              width: calc((100% - 20px) / 2);
              margin-bottom: 24px;
            `}>
              <label
                css={css`
                  display: block;
                  height: 18x;
                  text-align: left;
                  color: #828282;
                `}
              >
                시작 시간
              </label>
              <select
                css={css`
                  width: 100%;
                  height: 30px;
                  border: none;
                  border-bottom: 1px solid #E0E0E0;
                  &:focus {
                    outline: none;
                  }
                `}
              />
            </div>
            <div css={css`
              display: inline-block;
              width: calc((100% - 20px) / 2);
              margin-right: 20px;
            `}>
              <label
                css={css`
                  display: block;
                  height: 18x;
                  text-align: left;
                  color: #828282;
                `}
              >
                종료 날짜
              </label>
              <input
                css={css`
                  width: 100%;
                  height: 30px;
                  border: none;
                  border-bottom: 1px solid #E0E0E0;
                  &:focus {
                    outline: none;
                  }
                `}
                type="date"
              />
            </div>
            <div css={css`
              display: inline-block;
              width: calc((100% - 20px) / 2);
            `}>
              <label
                css={css`
                  display: block;
                  height: 18x;
                  text-align: left;
                  color: #828282;
                `}
              >
                종료 시간
              </label>
              <select
                css={css`
                  width: 100%;
                  height: 30px;
                  border: none;
                  border-bottom: 1px solid #E0E0E0;
                  &:focus {
                    outline: none;
                  }
                `}
              />
            </div>
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
            {
              type === 'modify' &&
              <button type="button" onClick={() => setIsShowConfirmModal(true)}>삭제</button>
            }
            <button
              type="button"
              onClick={() => {
                savePlan();
                onClose();
              }}
            >저장</button>
          </div>
        </div>
      </Modal>
      <ConfirmModal
        isShow={isShowConfirmModal}
        onClose={() => setIsShowConfirmModal(false)}
        onDelete={() => {
          deletePlan();
          setIsShowConfirmModal(false);
        }}
      />
    </div>
  );
};

export default PlanModal;