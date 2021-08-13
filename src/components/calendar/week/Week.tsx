/** @jsx jsx */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { jsx, css } from '@emotion/react';
import WeekTitle from './WeekTitle';
import { Plan } from '../../Scheduler';

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
}) => (
  <div>
    <WeekTitle startDate={displayWeek[0]} />
    
  </div>
);

export default Week;
