/** @jsx jsx */
import React, { useState, useEffect, useCallback } from 'react';
import Modal from './Modal';
import { jsx, css } from '@emotion/react';
import ConfirmModal from './ConfirmModal';
import { Plan } from '../Scheduler';

interface Props {
  isShow: boolean,
  plan?: Plan,
  date?: string,
  time?: string,
  type?: 'create' | 'modify',
  onClose: () => void,
  onSavePlan: (date: string, plan: Plan) => void,
  onDeletePlan: (date: string, plan: Plan) => void,
};

const timeOptions: {
  name: string,
  value: string,
  hour: number,
  min: number,
}[] = (() => {
  const _times = [];
  for (let t = 0; t < 24 ; t++) {
    const _timeValues = { name: `${t < 12 ? 'AM' : 'PM'} ${!t ? 12 : t > 12 ? t - 12 : t}`, hour: t };
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

const PlanModal: React.FC<Props> = ({
  isShow,
  onClose,
  onSavePlan,
  onDeletePlan,
  type,
  plan,
  date,
  time,
}) => {
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Plan>(() => {
    const init = {
      title: '',
      date: '',
      startTime: '',
      endTime: '',
    };

    if (plan) return {...plan};
    else if (date || time) {
      const splitedDate = date?.split('-');
      if (splitedDate) {
        splitedDate[1] = `${parseInt(splitedDate[1]) + 1}`;
  
        splitedDate[1] = splitedDate[1].padStart(2, '0');
        splitedDate[2] = splitedDate[2].padStart(2, '0');
      }

      return {
        ...init,
        date: splitedDate?.join('-') || '',
        startTime: time || '',
      };
    }

    return init;
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
      };
    });
  }, [formData]);

  const handleClose = (): void => {
    onClose();
    setFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  const compareTimes = useCallback((start: string, end: string): boolean => {
    return new Date(2021, 1, 1, ...end?.split(':').map(d => parseInt(d))).getTime()
      - new Date(2021, 1, 1, ...start?.split(':').map(d => parseInt(d))).getTime() <= 0
  }, [formData]);

  const handleClickSave = useCallback((): void => {
    if (Object.entries(formData).filter(d => !d[1]).length) alert('입력이 종료되지 않았습니다.');
    else if (compareTimes(formData.startTime, formData.endTime)) {
      alert('시간이 올바르지 않습니다');
    } else {
      onSavePlan(
        formData.date.split('-').slice(0, 2).map(d => parseInt(d)).join('-'),
        {
          id : plan?.id,
          color: plan?.color,
          ...formData
        }
      );
      handleClose();
    }

  }, [formData]);

  return (
    <div>
      <Modal
        isShow={isShow}
        title={type === 'modify' ? '일정 수정하기' : '일정 만들기'}
        titleAlign="left"
        onClose={handleClose}
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
                defaultValue={timeOptions.find(t => t.value === formData.startTime)?.value}
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
                defaultValue={timeOptions.find(t => t.value === formData.endTime)?.value}
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
            <button type="button" onClick={handleClose}>취소</button>
            {
              type === 'modify' &&
              <button type="button" onClick={() => setIsShowConfirmModal(true)}>삭제</button>
            }
            <button
              type="button"
              onClick={handleClickSave}
            >저장</button>
          </div>
        </div>
      </Modal>
      <ConfirmModal
        isShow={isShowConfirmModal}
        onClose={() => {
          setIsShowConfirmModal(false);
        }}
        onDelete={() => {
          onDeletePlan(
            formData.date.split('-').slice(0, 2).map(d => parseInt(d)).join('-'),
            {
              id : plan?.id,
              color: plan?.color,
              ...formData
            }
          );
          setIsShowConfirmModal(false);
          handleClose();
        }}
      />
    </div>
  );
};

export default PlanModal;