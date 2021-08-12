/** @jsx jsx */
import React, { useMemo } from 'react';
import { jsx, css } from '@emotion/react';

const MonthTitle: React.FC = () => {
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
  return (
    <ul
      css={css`
        margin: 0;
        padding: 0;
        list-style:none;
        border-bottom: 1px solid #D2D2D2;
      `}
    >
      {
        whatDays.map(d => (
          <li
            css={css`
              display: inline-block;
              position: relative;
              width: calc(100% / 7);
              height:60px;
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
              color: ${d.color}
            `}>
              {d.name}
            </span>
          </li>
        ))
      }
    </ul>
  );
};

export default MonthTitle;
