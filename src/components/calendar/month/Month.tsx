/** @jsx jsx */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { jsx, css } from '@emotion/react';
import MonthTitle from './MonthTitle';
import PlanModal from '../../common/PlanModal';
import { Plan } from '../../Scheduler';

const maxRows = 6;
const maxCols = 7;

const rowCss = (p: number) => css`
  position: relative;
  width: 100%;
  height: ${p > 2 ? (p - 2) * 40 + 138 : 138}px;
  box-sizing: border-box;
  &:not(:first-of-type) {
    border-top: 1px solid #D2D2D2;
  }
`;
const colCss = css`
  display: inline-block;
  position: relative;
  margin: 0;
  width: calc(100% / 7);
  height: 100%;
  box-sizing: border-box;
  & + & {
    border-left: 1px solid #D2D2D2;
  }
`;
const dayButtonCss = css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
  border: none;
  cursor: pointer;
`;
const dayNumber = (year: number, month: number, date: number, today: Date, displayMonth: string) => css`
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  color: #828282;
  ${
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === date && 
    `
      color: #fff;
      background: #0078FF;
      border-radius: 100%;
    `
  }
  ${
    (parseInt(displayMonth.split('-')[0]) !== year ||
    parseInt(displayMonth.split('-')[1]) !== month) &&
    'color: #E0E0E0;'
  }
`
const planCss = (color: string) => css`
  margin-top: 8px;
  padding: 8px 12px;
  height: 32px;
  background: ${color};
  color: #fff;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0;
  text-align: left;
  border-radius: 4px;
`;

interface Props {
  displayMonth: string;
  plans: Plan[] | null;
  onSavePlan: (date: string, plan: Plan) => void;
  onDeletePlan: (date: string, plan: Plan) => void;
};

const Month: React.FC<Props> = ({
  displayMonth,
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
  const [cntPlans, setCntPlans] = useState<number[]>(new Array(0, 0, 0, 0, 0, 0));
  const today = useMemo((): Date => new Date(), []);

  const [planModalInfo, setPlanModalInfo] = useState<{
    isShow: boolean,
    date: string | null,
    time?: string | null,
    plan: Plan | null,
    type: 'create' | 'modify',
  }>({
    isShow: false,
    date: null,
    plan: null,
    type: 'create',
  });

  const getMatchedPlansByDate = useCallback((day: { year: number, month: number, date: number }, whichWeek: number): Plan[] => {
    const { year, month, date } = day;
    if (plans && !!plans.length) {
      const _p = plans.filter(p => {
        const planDate = p.date.split('-').map(d => parseInt(d)).join('');
        const calDate = [year, month + 1, date].join('');
        return planDate === calDate;
      });

      if (cntPlans[whichWeek] < _p.length) {
        setCntPlans(prev => {
          const _prev = prev;
          _prev[whichWeek] = Math.max(_prev[whichWeek], _p.length);
          return _prev;
        });
      }

      return _p;
    }
    return [];
  }, [plans]);

  useEffect(() => {
    const _days = [];
    for (let i = 0;  i < maxRows; i++) {
      _days.push([]);
      for (let j = 0; j < maxCols; j++) {
        const yAndM = displayMonth.split('-');
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
  }, [displayMonth]);
  
  return (
    <div>
      <MonthTitle />
      {
        !!days && days.map((ds, dsIndex) => (
          <div
            key={`${displayMonth}-${dsIndex}`}
            css={rowCss(cntPlans[dsIndex])}
          >
            {
              !!ds && ds.map((d, dIndex) => (
                <div
                  key={`${displayMonth}-${dsIndex}-${dIndex}`}
                  css={colCss}
                >
                  <button
                    type="button"
                    css={dayButtonCss}
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
                      <span css={dayNumber(d.year, d.month, d.date, today, displayMonth)}>
                        { d.date }
                      </span>
                      {
                        getMatchedPlansByDate(d, dsIndex)
                        .map(p => (
                          <div
                            key={p.id}
                            css={planCss(p.color)}
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
