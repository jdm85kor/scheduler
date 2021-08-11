/** @jsx jsx */
import React, { useState, useMemo, useCallback } from 'react';
import { jsx, css } from '@emotion/react';
import DateType from './calendar/DateType';
import { dateType } from '../utils/constants';

interface Props {
  width?: number;
  height?: number;
};
const Scheduler: React.FC<Props> = ({ width = 1920, height = 1252}) => {
  const today = useMemo((): Date => new Date(), []);
  const [dt, setDt] = useState<dateType>(dateType.month);
  const [displayDate, setDisplayDate] = useState<string>(`${today.getFullYear()}-${today.getMonth()}`)

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

  return (
    <div css={css`
      display: block;
      margin: 0 auto;
      background: #fff;
      width: ${width}px;
      height: ${height}px;
      border: 1px solid #000;
    `}>
      <header css={css`
        display: flex;
        position: relative;
        margin-top: 112px;
        justify-content: space-between;
      `}>
        <button
          type="button"
          onClick={() => setDisplayDate(`${today.getFullYear()}-${today.getMonth() + 1}`)}
          css={css`
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
        <DateType type={dt} setType={setDt}/>
      </header>
      <main>

      </main>
    </div>
  );
};

export default Scheduler;
