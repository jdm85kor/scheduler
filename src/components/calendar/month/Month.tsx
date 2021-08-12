/** @jsx jsx */
import React, { useState, useMemo, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import MonthTitle from '../MonthTitle';

const maxRows = 6;
const maxCols = 7;

interface Props {
  displayDate: string;
};

const Month: React.FC<Props> = ({
  displayDate,
}) => {
  const [days, setDays] = useState<any[][] | null>(null);
  useEffect(() => {
    const _days = [];
    for(let i = 0;  i < maxRows; i++) {
      _days.push([]);
      for (let j = 0; j < maxCols; j++) {
        _days[i].push({
          num: j,
        })
      }
    }
    setDays(_days);
  }, []);
  
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
              min-height: 138px;
              box-sizing: border-box;
              & + & {
                border-top: 1px solid #D2D2D2;
              }
            `}
          >
            {
              ds.map((d, dIndex) => (
                <div
                  key={`${displayDate}-${dIndex}`}
                  css={css`
                    display: inline-block;
                    width: calc(100% / 7);
                    min-height: 138px;
                    box-sizing: border-box;
                    & + & {
                      border-left: 1px solid #D2D2D2;
                    }
                  `}
                >
                  <span>
                    { d.num }
                  </span>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

export default Month;
