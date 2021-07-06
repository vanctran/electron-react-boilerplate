import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DataCollectionForm from './data-collection-form/DataCollectionForm';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={DataCollectionForm} />
        </Switch>
      </Router>
    </Provider>
  );
}
