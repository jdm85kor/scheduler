/** @jsx jsx */
import React, { useState, useCallback } from 'react';
import Modal from './Modal';
import { jsx, css } from '@emotion/react';
import ConfirmModal from './ConfirmModal';
import { Plan } from '../Scheduler';

interface Props {
  isShow: boolean,
  onClose: () => void,
  onSavePlan: (
    dateYYYYM: string,
    title: string,
    date: string,
    startTime: string,
    endTime: string
  ) => void,
  onDeletePlan: () => void,
  type?: 'create' | 'modify',
};

const timeOptions: {
  name: string,
  value: string,
  hour: number,
  min: number,
}[] = (() => {
  const _times = [];
  for (let t = 0; t < 24 ; t++) {
    const _timeValues = { name: `${t < 12 ? 'AM' : 'PM'} ${t || 12}`, hour: t };
    _times.push({
      ..._timeValues,
      min: 0,
      value: `${_timeValues.hour}:00`,
      name: `${_timeValues.name}:00`,
    });
    _times.push({
      ..._timeValues,
      min: 30,
      value: `${_timeValues.hour}:30`,
      name: `${_timeValues.name}:30`,
    });
  }
  return _times;
})();

const PlanModal: React.FC<Props> = ({ isShow, onClose, onSavePlan, onDeletePlan, type }) => {
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Plan>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  
  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { value } = e.currentTarget;
    setFormData(prev => {
      return {
        ...prev,
        title: value,
      }
    });
  }, [formData]);

  const handleChangeDate: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { value } = e.currentTarget;
    setFormData(prev => {
      return {
        ...prev,
        date: value,
      }
    });
  }, [formData]);

  const handleChangeTime: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const { value, id } = e.currentTarget;
    setFormData(prev => {
      return {
        ...prev,
        [id]: value,
      }
    });
  }, [formData]);

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
                value={formData.title}
                onChange={handleChangeTitle}
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
                value={formData.date}
                onChange={handleChangeDate}
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
                id="startTime"
                onChange={handleChangeTime}
              >
                <option value="" hidden>시간을 선택하세요</option>
                {
                  timeOptions.map(t => (
                    <option key={t.value} value={t.value}>{t.name}</option>
                  ))
                }
              </select>
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
                value={formData.date}
                onChange={handleChangeDate}
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
                id="endTime"
                onChange={handleChangeTime}
              >
                <option value="" hidden>시간을 선택하세요</option>
                {
                  timeOptions.map(t => (
                    <option key={t.value} value={t.value}>{t.name}</option>
                  ))
                }
              </select>
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
                const { title, date, startTime, endTime, } = formData;
                onSavePlan(
                  `formData.date`,
                  title,
                  date,
                  startTime,
                  endTime,
                );
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
          onDeletePlan();
          setIsShowConfirmModal(false);
        }}
      />
    </div>
  );
};

export default PlanModal;