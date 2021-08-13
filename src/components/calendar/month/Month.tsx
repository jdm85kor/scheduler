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
  onDeletePlan: (date: string, plan: Plan) => void;
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

  const [planModalInfo, setPlanModalInfo] = useState<{
    isShow: boolean,
    date: string | null,
    plan: Plan | null,
    type: 'create' | 'modify',
  }>({
    isShow: false,
    date: null,
    plan: null,
    type: 'create',
  });

  useEffect(() => {
    const _days = [];
    for (let i = 0;  i < maxRows; i++) {
      _days.push([]);
      for (let j = 0; j < maxCols; j++) {
        const yAndM = displayDate.split('-');
        const thisMonthDate = new Date(parseInt(yAndM[0]), parseInt(yAndM[1]));
        
        const fullDate = new Date(
          parseInt(yAndM[0]),
          parseInt(yAndM[1]),
          thisMonthDate.getDay() ? i * 7 + j - thisMonthDate.getDay() + 1: i * 7 + j - 6
        );

        _days[i].push({
          fullDate,
          year: fullDate.getFullYear(),
          month: fullDate.getMonth(),
          date: fullDate.getDate(),
        });
      }
    }
    setDays(_days);
  }, [displayDate]);

  useEffect(() => {
    console.log('plans ===> ', plans);
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
                    onClick={() => { setPlanModalInfo({
                      isShow: true,
                      date: `${d.year}-${d.month}-${d.date}`,
                      plan: null,
                      type: 'create',
                    }) }}
                  >
                    <div css={css`
                      position: relative;
                      text-align: left;
                      width: 100%;
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
                      {
                        plans && !!plans.length && plans
                        .filter(p => {
                          const planDate = p.date.split('-').map(d => parseInt(d)).join('');
                          const calDate = [d.year, d.month + 1, d.date].join('');
                          return planDate === calDate;
                        })
                        .map(p => (
                          <div
                            key={p.id}
                            css={css`
                              margin-top: 8px;
                              padding: 8px 12px;
                              height: 32px;
                              background: ${p.color};
                              color: #fff;
                              box-sizing: border-box;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 17px;
                              letter-spacing: 0;
                              text-align: left;
                              border-radius: 4px;
                            `}
                            onClick={(e) => {
                              e.stopPropagation();

                              setPlanModalInfo({
                                isShow: true,
                                date: `${d.year}-${d.month}-${d.date}`,
                                plan: p,
                                type: 'modify',
                              })
                            }}
                          >{p.title}</div>
                        ))
                      }
                    </div>
                  </button>
                </div>
              ))
            }
          </div>
        ))
      }
      {
        planModalInfo.isShow &&
        <PlanModal
          { ...planModalInfo }
          onClose={() => setPlanModalInfo({ isShow: false, date: null, plan: null, type: 'create' })}
          onSavePlan={onSavePlan}
          onDeletePlan={onDeletePlan}
        />
      }
    </div>
  );
};

export default Month;
