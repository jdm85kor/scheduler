/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';

interface Props {
  width?: number;
  height?: number;
};
const Scheduler: React.FC<Props> = ({ width = 1024, height = 900}) => (
  <div css={css`
    display: block;
    margin: 0 auto;
    width: ${width}px;
    height: ${height}px;
    border: 1px solid #000;
  `}>
  </div>
);

export default Scheduler;
