/** @jsx jsx */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import DateType from './calendar/header/DateType';
import Month from './calendar/month/Month';
import Week from './calendar/week/Week';
import { dateType } from '../utils/constants';

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

const Scheduler: React.FC<Props> = ({ width = 1920, height = 1252}) => {
  const today = useMemo((): Date => new Date(), []);
  const [dt, setDt] = useState<dateType>(dateType.month);
  const [displayDate, setDisplayDate] = useState<string>(`${today.getFullYear()}-${today.getMonth()}`)
  const [plans, setPlans] = useState<{
    [date: string]: Plan[], // year & month, yyyy-MM
  } | null>(null);

  const nextMonth = useCallback((): void => {
    const yAndM: string[] = displayDate.split('-');
    const next: Date = new Date(parseInt(yAndM[0]), parseInt(yAndM[1]) + 1);
    setDisplayDate(`${next.getFullYear()}-${next.getMonth()}`);
  }, [displayDate]);

  const prevMonth = useCallback((): void => {
    const yAndM: string[] = displayDate.split('-');
    const prev: Date = new Date(parseInt(yAndM[0]), parseInt(yAndM[1]) - 1);
    setDisplayDate(`${prev.getFullYear()}-${prev.getMonth()}`);
  }, [displayDate]);

  const getPlansByDisplayMonth = useMemo((): Plan[] | null => {
    if (!displayDate || !plans) return null;
    const splited = displayDate.split('-');
    return plans[`${parseInt(splited[0])}-${parseInt(splited[1])+1}`] || null;
  }, [plans, displayDate]);

  const savePlan = useCallback((date: string, plan: Plan): void => {
    if (!date || !plan) return;

    if (plan.id) { // modify
      const newPlans = plans[date];
      const idx = newPlans.findIndex(d => d.id === plan.id) || 0;
      newPlans[idx] = {...plan};
      setPlans(prev => {
        return {
          ...prev,
          [date]: newPlans,
        };
      });
    } else { // create
      const date = plan.date;
      const newPlan = {
        ...plan,
        id: new Date().getTime(),
      };
      console.log(newPlan);
      setPlans(prev => {
        if (!prev) {
          return {
            [date]: [newPlan],
          };
        } else if (prev[date]) {
          return {
            ...prev,
            [date]: [
              ...prev[date],
              newPlan,
            ]
          };
        } else {
          return {
            ...prev,
            [date]: [plan]
          };
        }
      });
    }

  }, [plans]);

  const deletePlan = useCallback(() => {

  }, [plans]);

  return (
    <div css={css`
      display: block;
      margin: 0 auto;
      padding: 0 134px;
      background: #fff;
      width: ${width}px;
      height: ${height}px;
      box-sizing: border-box;
    `}>
      <header css={css`
        display: flex;
        position: relative;
        margin: 112px auto 90px;
        justify-content: space-between;
      `}>
        <div
          css={css`
            display: inline-block;
            position: relative;
          `}
        >
          <button
            type="button"
            onClick={() => setDisplayDate(`${today.getFullYear()}-${today.getMonth()}`)}
            css={css`
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
            `}
          >오늘</button>
        </div>
        <div css={css`
          display: inline-block;
        `}>
          <button
            type="button"
            onClick={prevMonth}
            css={css`
              font-size: 40px;
              background: #fff;          
              border: none;
              cursor: pointer;
            `}
          >&lt;</button>
          <span
            css={css`
              padding: 0 38px;
              font-size: 40px;
              font-weight: 700;
              line-height: 48px;
              letter-spacing: 0;
              text-align: center;
            `}
          >{ displayDate.split('-')[0] }년 {parseInt(displayDate.split('-')[1]) + 1}월</span>
          <button
            type="button"
            onClick={nextMonth}
            css={css`
              font-size: 40px;
              background: #fff;          
              border: none;
              cursor: pointer;
            `}
          >&gt;</button>
        </div>
        <DateType
          type={dt}
          setType={(type: dateType): void => { setDt(type); }}
          css={css`
            padding-top: 5px;
          `}
        />
      </header>
      <main>
        {
          dt === dateType.month ?
          <Month
            displayDate={displayDate}
            plans={getPlansByDisplayMonth}
            onSavePlan={savePlan}
            onDeletePlan={deletePlan}
          /> :
          <Week />
        }
      </main>
    </div>
  );
};

export default Scheduler;
