import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import Page from 'src/Components/Page';
import store from "src/Store/index";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Page />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
