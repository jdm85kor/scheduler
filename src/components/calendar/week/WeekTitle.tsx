/** @jsx jsx */
import React, { useMemo } from 'react';
import { jsx, css } from '@emotion/react';

interface Props {
  startDate: string,
};

const WeekTitle: React.FC<Props> = ({ startDate }) => {
  const whatDays: { name: string, color: string}[] = useMemo(() => [
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
  ], []);
  const getDate = (added: number): number => {
    const [ y, m , d] = startDate.split('-').map(d => parseInt(d));
    return new Date(y, m, d + added).getDate();
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
            <span css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: ${d.color};
              text-align: center;
            `}>
              {d.name}<br />
              {getDate(idx)}
            </span>
          </li>
        ))
      }
    </ul>
  );
};

export default WeekTitle;
