/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
import { dateType } from '../../../utils/constants';

interface Props {
  type: dateType;
  setType: (type: dateType) => void;
  className?: string;
};

const DateType: React.FC<Props> = ({ type, setType, className }) => {
  return (
    <div css={css`
      display: inline-block;
      width: 140px;
      height: 40px;
      box-sizing: border-box;
    `}
      className={className}
    >
      <button
        css={css`
          background: ${type === dateType.month ? '#000' : '#fff'};
          color: ${type === dateType.month ? '#fff' : '#000'};
          border-radius: 40px 0 0 40px;
          width: 70px;
          height: 40px;
          border: none;
          padding: 0;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
          cursor: pointer;
        `}
        type="button"
        onClick={() => setType(dateType.month)}>월</button>
      <button
        css={css`
          background: ${type === dateType.week ? '#000' : '#fff'};
          color: ${type === dateType.week ? '#fff' : '#000'};
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
          border-radius: 0 40px 40px 0;
          width: 70px;
          height: 40px;
          border: none;
          padding: 0;
          cursor: pointer;
        `}
        type="button" onClick={() => setType(dateType.week)}>주</button>
    </div>
  );
};

export default DateType;
