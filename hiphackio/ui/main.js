/*
 ** Hiphack main route file
 */

// Initilize Route Handlers
const React = require('react')
const { Router, Route, Link } = require('react-router')
const createBrowserHistory = require('history/lib/createBrowserHistory')

const Navbar = require('./components/navbar')

class Page extends React.Component {
  render() {
    return (
      <div className="page-clear">
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}

React.render(
  // use history={createBrowserHistory()} in router later
  <Router>
    <Route component={Page}>
      <Route path="/" component={require('./routes/dashboard')} />
      <Route path="/candidate/:candidateId" component={require('./routes/profile')} />
      <Route path="/new-candidate" component={require('./routes/new-candidate')} />
      <Route path="/new-interview" component={require('./routes/new-interview')} />
      <Route path="/interviews" component={require('./routes/interview-calendar')} />
    </Route>
  </Router>
, document.body);
