import React from 'react';
import ReactDom from 'react-dom';
import Scheduler from './components/Scheduler';

interface Props {}
const App: React.FC<Props> = ({}) => (
  <Scheduler />
);

ReactDom.render(<App />, document.getElementById('app'));
