/** @jsx jsx */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { jsx, css } from '@emotion/react';

interface Props {}
const App: React.FC<Props> = ({}) => (
  <div>
    adjust a
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
