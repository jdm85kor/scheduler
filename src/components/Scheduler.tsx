/** @jsx jsx */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import DateType from './calendar/header/DateType';
import Month from './calendar/month/Month';
import Week from './calendar/week/Week';
import { dateType } from '../utils/constants';
import { getRandomColor } from '../utils/functions';

const headerCss = css`
  display: flex;
  position: relative;
  margin: 112px auto 90px;
  justify-content: space-between;
`;
const headerTitle = css`
  padding: 0 38px;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0;
  text-align: center;
`;
const todayButton = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 76px;
  height: 40px;
  background: #fff;
  border: 1px solid #D2D2D2;
  border-radius: 40px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  cursor: pointer;
`;
const arrowCss = css`
  font-size: 40px;
  background: #fff;          
  border: none;
  cursor: pointer;
`;
interface Props {
  width?: number;
  height?: number;
};
export interface Plan {
  id?: number,
  title: string,
  date: string,
  startTime: string,
  endTime: string,
  color?: string,
};

const thisWeek = ((): [string, string] => {
  const today = new Date();
  const whichDay = today.getDay();
  const sun = new Date(today.getFullYear(), today.getMonth(), today.getDate() - whichDay);
  const satur = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6 - whichDay );

  return [`${sun.getFullYear()}-${sun.getMonth()}-${sun.getDate()}`,
  `${satur.getFullYear()}-${satur.getMonth()}-${satur.getDate()}`];
})();

const Scheduler: React.FC<Props> = ({ width = 1920 }) => {
  const today = useMemo((): Date => new Date(), []);
  const [dt, setDt] = useState<dateType>(dateType.month);
  const [displayMonth, setDisplayMonth] = useState<string>(`${today.getFullYear()}-${today.getMonth()}`)
  const [displayWeek, setDisplayWeek] = useState<[string, string]>(thisWeek);
  const [plans, setPlans] = useState<{
    [date: string]: Plan[], // year & month, yyyy-MM
  } | null>(null);

  const moveMonth = useCallback((direction: 1 | -1): void => {
    const yAndM: number[] = displayMonth.split('-').map(d => parseInt(d));
    const move: Date = new Date(yAndM[0], yAndM[1] + direction);
    setDisplayMonth(`${move.getFullYear()}-${move.getMonth()}`);
  }, [displayMonth]);

  const moveWeek = useCallback((direction: 1 | -1): void => {
    const thisSun = displayWeek[0].split('-').map(d => parseInt(d));
    const thisSatur = displayWeek[1].split('-').map(d => parseInt(d));
    const moveSun = new Date(thisSun[0], thisSun[1], thisSun[2] + 7 * direction);
    const moveSatur = new Date(thisSatur[0], thisSatur[1],thisSatur[2] + 7 * direction);

    setDisplayWeek([`${moveSun.getFullYear()}-${moveSun.getMonth()}-${moveSun.getDate()}`,
    `${moveSatur.getFullYear()}-${moveSatur.getMonth()}-${moveSatur.getDate()}`]);
  }, [displayWeek]);

  const getPlansByDisplayMonth = useMemo((): Plan[] | null => {
    if (!displayMonth || !plans) return null;
    const splited = displayMonth.split('-');
    return plans[`${splited[0]}-${parseInt(splited[1])+1}`] || null;
  }, [displayMonth, plans]);

  const getPlansByDisplayWeek = useMemo((): Plan[] | null => {
    if (!displayWeek || !plans) return null;
    const sd = displayWeek[0].split('-').map((d, i) => i !==1?parseInt(d):parseInt(d)+1).slice(0, 2).join('-');
    const ed = displayWeek[1].split('-').map((d, i) => i !==1?parseInt(d):parseInt(d)+1).slice(0, 2).join('-');
    
    return [...(plans[sd]||[]), ...((sd !==ed ?plans[ed]:[])||[])];
  }, [displayWeek, plans]);

  const savePlan = useCallback((date: string, plan: Plan): void => {
    if (!date || !plan) return;

    if (plan.id) { // modify
      const newPlans = plans[date];

      const others = newPlans.filter(p => p.id !== plan.id);
      if (isDupulicatePlan(others.filter(d => d.date === plan.date ), plan)) {
        alert('중복된 일정이 있습니다. 다시 등록해주세요.');
      } else {
        const idx = newPlans.findIndex(d => d.id === plan.id) || 0;
        newPlans[idx] = {...plan };

        setPlans(prev => {
          return {
            ...prev,
            [date]: newPlans,
          };
        });
      }
    } else { // create
      const newPlan = {
        ...plan,
        id: new Date().getTime(),
        color: `#${getRandomColor()}`,
      };
      setPlans(prev => {
        if (!prev) {
          return {
            [date]: [newPlan],
          };
        } else if (prev[date]) {
          if (isDupulicatePlan(prev[date].filter(d => d.date === newPlan.date ), newPlan)) {
            alert('중복된 일정이 있습니다. 다시 등록해주세요.');
            return prev;
          } else {
            return {
              ...prev,
              [date]: [
                ...prev[date],
                newPlan,
              ]
            };
          }
        } else {
          return {
            ...prev,
            [date]: [plan]
          };
        }
      });
    }

  }, [plans]);

  const deletePlan = useCallback((date: string, plan: Plan): void => {
    if (!date || !plan) return;
    
    setPlans(prev => ({
      ...prev,
      [date]: prev[date].filter(p => p.id !== plan.id),
    }));
  }, [plans]);

  const dateFormatYYYYMMDD = (date: string): string => {
    const splited = date.split('-').map(d => parseInt(d));
    return `${splited[0]}년 ${splited[1] + 1}월 ${splited[2]}일`
  }

  const isDupulicatePlan = (targets: Plan[], plan: Plan): boolean => {
    const isInclude = (s:string, e:string, date: string, t: string) =>
      new Date(`${date},${s}`) < new Date(`${date},${t}`) &&
      new Date(`${date},${t}`) < new Date(`${date},${e}`);
    
    return targets.some(t => isInclude(t.startTime, t.endTime, plan.date, plan.startTime) ||
      isInclude(t.startTime, t.endTime, plan.date, plan.endTime) ||
      isInclude(plan.startTime, plan.endTime, plan.date, t.startTime) ||
      isInclude(plan.startTime, plan.endTime, plan.date, t.endTime)
    );
  };

  return (
    <div css={css`
      display: block;
      margin: 0 auto;
      padding: 0 134px;
      background: #fff;
      width: ${width}px;
      height: auto;
      box-sizing: border-box;
    `}>
      {/* header start */}
      <header css={headerCss}>
        <div
          css={css`
            display: inline-block;
            position: relative;
          `}
        >
          <button
            type="button"
            onClick={() => dt === dateType.month ?
              setDisplayMonth(`${today.getFullYear()}-${today.getMonth()}`) :
              setDisplayWeek(thisWeek)
            }
            css={todayButton}
          >오늘</button>
        </div>
        <div css={css`display: inline-block;`}>
          <button
            type="button"
            onClick={() => dt === dateType.month ? moveMonth(-1) : moveWeek(-1)}
            css={arrowCss}
          >&lt;</button>
          { dt === dateType.month ?
            <span css={headerTitle}>
              { displayMonth.split('-')[0] }년 {parseInt(displayMonth.split('-')[1]) + 1}월
            </span> :
            <span css={headerTitle}>
              {dateFormatYYYYMMDD(displayWeek[0])} ~ {dateFormatYYYYMMDD(displayWeek[1])}
            </span>
          }
          <button
            type="button"
            onClick={() => dt === dateType.month ? moveMonth(1) : moveWeek(1)}
            css={arrowCss}
          >&gt;</button>
        </div>
        <DateType
          type={dt}
          setType={(type: dateType): void => { setDt(type); }}
          css={css`padding-top: 5px;`}
        />
      </header>
      {/* header end */}
      <main>
        {
          dt === dateType.month ?
          <Month
            displayMonth={displayMonth}
            plans={getPlansByDisplayMonth}
            onSavePlan={savePlan}
            onDeletePlan={deletePlan}
          /> :
          <Week
            displayWeek={displayWeek}
            plans={getPlansByDisplayWeek}
            onSavePlan={savePlan}
            onDeletePlan={deletePlan}
          />
        }
      </main>
    </div>
  );
};

export default Scheduler;
