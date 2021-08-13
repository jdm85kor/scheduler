/** @jsx jsx */
import React, { useState, useMemo } from 'react';
import { jsx, css } from '@emotion/react';
import WeekTitle from './WeekTitle';
import PlanModal from '../../common/PlanModal';
import { Plan } from '../../Scheduler';

const timesCells = css`
  display: inline-block;
  width: 204px;
  box-sizing: border-box;
  border-right: 1px solid #D2D2D2;
  vertical-align: top;
`;
const timeCell = css`
  display: inline-block;
  padding: 20px;
  width: 100%;
  height: 138px;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  color: #828282;
  & + & {
    border-top: 1px solid #D2D2D2;
  }
`;
const colsCss = css`
  display: inline-block;
  position: relative;
  width: calc((100% - 204px) / 7);
  box-sizing: border-box;
  vertical-align: top;
  &:not(:nth-of-type(2)) {
    border-left: 1px solid #D2D2D2;
  }
`;
const colsCell = css`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 138px;
  box-sizing: border-box;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0;
  color: #828282;
  & + & {
    border-top: 1px solid #D2D2D2;
  }
`;
const planCss = (s: string, e: string, color: string) => {
  const ss = s.split(':').map(t => parseInt(t));
  const es = e.split(':').map(t => parseInt(t));
  return css`
    position: absolute;
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
    top: ${ss[0] * 138 + (ss[1] === 30 ? 138 / 2 : 0) + 10}px;
    left: 25px;
    height: ${(es[0] - ss[0]) * 138 + ( 138 / 2 * ((es[1] - ss[1]) / 30)) - 20}px;
    width: calc(100% - 50px);
    background: ${color};
    color: #fff;
    cursor: pointer;
  `;
}
const timeButton = css`
  display: inline-block;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  border: none;
  cursor: pointer;
`;

interface Props {
  displayWeek: [string, string];
  plans: Plan[] | null;
  onSavePlan: (date: string, plan: Plan) => void;
  onDeletePlan: (date: string, plan: Plan) => void;
};

const Week: React.FC<Props> = ({
  displayWeek,
  plans,
  onSavePlan,
  onDeletePlan,
}) => {
  const [planModalInfo, setPlanModalInfo] = useState<{
    isShow: boolean,
    date: string | null,
    time?: string | null,
    plan: Plan | null,
    type: 'create' | 'modify',
  }>({
    isShow: false,
    date: null,
    time: null,
    plan: null,
    type: 'create',
  });

  const startDate = useMemo(() => displayWeek[0].split('-').map(d => parseInt(d)), [displayWeek]);

  const getTime = (idx: number): string => {
    const hour = (idx < 12 ? idx : idx - 12).toString(10).padStart(2, '0');
    return (idx < 12 ? 'AM' : 'PM') + (hour === '00' ? '12' : hour) + ':00';
  }

  return (
    <div css={css`
      margin-bottom: 50px;
    `}>
      <WeekTitle startDate={displayWeek[0]} />
      <div
        css={timesCells}
      >
        {
          [...Array(24)].map((_, idx) => (
            <div
              key={`time-${idx}`}
              css={timeCell}
            >
              {getTime(idx)}
            </div>
          ))
        }
      </div>
      {
        [...Array(7)].map((_, weekIdx) => (
          <div
            css={colsCss}
            key={`day-${weekIdx}`}
          >
            {
              [...Array(24)].map((_, idx) => (
                <div
                  key={`${weekIdx}-${idx}`}
                  css={colsCell}
                >
                  <button
                    type="button"
                    css={timeButton}
                    onClick={() => {
                      const d = new Date(startDate[0], startDate[1], startDate[2] + weekIdx);
                      setPlanModalInfo({
                        isShow: true,
                        date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
                        time: `${idx}:00`,
                        plan: null,
                        type: 'create',
                      });
                    }}
                  />
                </div>
              ))
            }
            {
              plans && plans
                .filter(d => {
                  const td = new Date(startDate[0], startDate[1], startDate[2] + weekIdx);

                  return d.date.split('-').map(d => parseInt(d)).join('-')
                    === `${td.getFullYear()}-${td.getMonth()+1}-${td.getDate()}`;
                })
                .map(p => (
                  <div
                    key={p.id}
                    css={planCss(p.startTime, p.endTime, p.color)}
                    onClick={()=> {
                      setPlanModalInfo({
                        isShow: true,
                        date: null,
                        time: null,
                        plan: p,
                        type: 'modify',
                      })
                    }}
                  >
                    {p.title}
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
            onClose={() => setPlanModalInfo({
              isShow: false,
              date: null,
              time: null,
              plan: null,
              type: 'create',
            })}
            onSavePlan={onSavePlan}
            onDeletePlan={onDeletePlan}
          />
      }
    </div>
  );
};

export default Week;
