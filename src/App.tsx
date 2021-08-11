import * as React from 'react';
import * as ReactDom from 'react-dom';

interface Props {}
const App: React.FC<Props> = ({}) => (
  <div>
    adjust
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
