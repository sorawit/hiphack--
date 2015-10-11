const React = require('react')
const { Router, Route } = require('react-router')

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

module.exports = () => {
  return (
    <Route path="/company" component={Page}>
      <Route path="dashboard" component={require('./routes/dashboard')} />
      <Route path="candidate/:candidateId" component={require('./routes/profile')} />
      <Route path="new-candidate" component={require('./routes/new-candidate')} />
      <Route path="new-interview" component={require('./routes/new-interview')} />
      <Route path="interviews" component={require('./routes/interview-calendar')} />
    </Route>
  )
}
