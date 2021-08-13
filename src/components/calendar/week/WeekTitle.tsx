/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';

const whatDays: { name: string, color: string}[] = [
  {
    name: 'Sunday',
    color: '#EB5757',
  }, {
    name: 'Monday',
    color: '#828282',
  }, {
    name: 'Tuesday',
    color: '#828282',
  }, {
    name: 'Wedneday',
    color: '#828282',
  }, {
    name: 'Thursday',
    color: '#828282',
  }, {
    name: 'Friday',
    color: '#828282',
  }, {
    name: 'Saturday',
    color: '#2F80ED',
  }
];
interface Props {
  startDate: string,
};

const WeekTitle: React.FC<Props> = ({ startDate }) => {
  const getDate = (added: number): number => {
    const [ y, m , d] = startDate.split('-').map(d => parseInt(d));
    return new Date(y, m, d + added).getDate();
  };
  const isToday = (added: number): boolean => {
    const sd = startDate.split('-').map(i => parseInt(i));
    const d = new Date(sd[0], sd[1], sd[2]+added);
    const t = new Date();
    return t.getFullYear() === d.getFullYear() &&
      t.getMonth() === d.getMonth() &&
      t.getDate() === d.getDate();
  };
  return (
    <ul
      css={css`
        margin: 0;
        padding: 0;
        list-style:none;
        border-bottom: 1px solid #D2D2D2;
      `}
    >
      <li
        css={css`
          display: inline-block;
          position: relative;
          width: 204px;
          height: 84px;
          box-sizing: border-box;
          border-right: 1px solid #D2D2D2;
        `}
      >

      </li>
      {
        whatDays.map((d, idx) => (
          <li
            css={css`
              display: inline-block;
              position: relative;
              width: calc((100% - 204px) / 7);
              height: 84px;
              box-sizing: border-box;
              & + & {
                border-left: 1px solid #D2D2D2;
              }
            `}
            key={d.name}
          >
            <div css={css`
              position: absolute;
              display: inline-block;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: ${d.color};
              text-align: center;
            `}>
              <span>{d.name}</span><br />
              <span
                css={css`
                  display: inline-block;
                  margin-top: 10px;
                  color: #fff;
                  ${
                    isToday(idx) &&
                    `
                      width: 20px;
                      background: #0078FF;
                      border-radius: 100%;
                    `
                  }
                  
                `}
              >{getDate(idx)}</span>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

export default WeekTitle;
