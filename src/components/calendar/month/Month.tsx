/** @jsx jsx */
import React, { useState, useMemo, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import MonthTitle from './MonthTitle';
import PlanModal from '../../common/PlanModal';
import { Plan } from '../../Scheduler';

const maxRows = 6;
const maxCols = 7;

interface Props {
  displayDate: string;
  plans: Plan[] | null;
  onSavePlan: (date: string, plan: Plan) => void;
  onDeletePlan: (date: string, id: number) => void;
};

const Month: React.FC<Props> = ({
  displayDate,
  plans,
  onSavePlan,
  onDeletePlan,
}) => {
  const [days, setDays] = useState<{
    fullDate: Date,
    year: number,
    month: number,
    date: number,
  }[][] | null>(null);
  const today = useMemo((): Date => new Date(), []);

  const [isShowPlanModal, setIsShowPlanModal] = useState(false);

  useEffect(() => {
    const _days = [];
    for (let i = 0;  i < maxRows; i++) {
      _days.push([]);
      for (let j = 0; j < maxCols; j++) {
        const yAndM = displayDate.split('-');
        const thisMonthDate = new Date(parseInt(yAndM[0]), parseInt(yAndM[1]));
        
        const date = new Date(
          parseInt(yAndM[0]),
          parseInt(yAndM[1]),
          thisMonthDate.getDay() ? i * 7 + j - thisMonthDate.getDay() + 1: i * 7 + j - 6);

        _days[i].push({
          fullDate: date,
          year: date.getFullYear(),
          month: date.getMonth(),
          date: date.getDate(),
        });
      }
    }
    setDays(_days);
  }, [displayDate]);

  useEffect(() => {
    console.log(plans);
  }, [plans]);
  
  return (
    <div>
      <MonthTitle />
      {
        !!days && days.map((ds, dsIndex) => (
          <div
            key={`${displayDate}-${dsIndex}`}
            css={css`
              position: relative;
              width: 100%;
              height: 138px;
              box-sizing: border-box;
              & + & {
                border-top: 1px solid #D2D2D2;
              }
            `}
          >
            {
              ds.map((d, dIndex) => (
                <div
                  key={`${displayDate}-${dsIndex}-${dIndex}`}
                  css={css`
                    display: inline-block;
                    position: relative;
                    margin: 0;
                    width: calc(100% / 7);
                    height: 100%;
                    box-sizing: border-box;
                    & + & {
                      border-left: 1px solid #D2D2D2;
                    }
                  `}
                >
                  <button
                    type="button"
                    css={css`
                      display: inline-flex;
                      flex-direction: column;
                      align-items: flex-start;
                      width: 100%;
                      height: 100%;
                      padding: 20px;
                      background: #fff;
                      border: none;
                      cursor: pointer;
                    `}
                    onClick={() => { setIsShowPlanModal(true) }}
                  >
                    <div css={css`
                      position: relative;
                      text-align: left;
                    `}>
                      <span
                        css={css`
                          display: inline-block;
                          font-size: 20px;
                          font-weight: 500;
                          line-height: 24px;
                          letter-spacing: 0;
                          color: #828282;
                          ${
                            today.getFullYear() === d.year &&
                            today.getMonth() === d.month &&
                            today.getDate() === d.date && 
                            `
                              color: #fff;
                              background: #0078FF;
                              border-radius: 100%;
                            `
                          }
                          ${
                            (parseInt(displayDate.split('-')[0]) !== d.year ||
                            parseInt(displayDate.split('-')[1]) !== d.month) &&
                            'color: #E0E0E0;'
                          }
                          
                        `}
                      >
                        { d.date }
                      </span>
                    </div>
                    
                  </button>
                </div>
              ))
            }
          </div>
        ))
      }
      <PlanModal
        isShow={isShowPlanModal}
        onClose={() => setIsShowPlanModal(false)}
        onSavePlan={(dateYYYYM: string, title: string, date: string, startTime: string, endTime: string) => {
          onSavePlan(dateYYYYM, { title, date, startTime, endTime });
        }}
        onDeletePlan={() => {}}
      />
    </div>
  );
};

export default Month;
