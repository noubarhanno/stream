import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from '../components/streams/StreamCreate';
import StreamDelete from '../components/streams/StreamDelete';
import StreamEdit from '../components/streams/StreamEdit';
import StreamList from '../components/streams/StreamList';
import StreamShow from '../components/streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
        <Header />
        {/* Switch here will take only one match as per the order of the routes below and render one component so whenever it found one match will not look for any another match */}
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
          <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;