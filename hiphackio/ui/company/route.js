const React = require('react')
const { Router, Route } = require('react-router')

module.exports = () => {
  return (
    <Route>
      <Route path="/company" component={require('./routes/page-dashboard')}>
        <Route path="dashboard" component={require('./routes/dashboard')} />
        <Route path="candidate/:candidateId" component={require('./routes/profile')} />
        <Route path="new-candidate" component={require('./routes/new-candidate')} />
        <Route path="new-interview" component={require('./routes/new-interview')} />
        <Route path="interviews" component={require('./routes/interview-calendar')} />
      </Route>
      <Route path="/company/interview" component={require('./routes/page-interview')}>
        <Route path=":interviewId" component={require('./routes/interview')} />
      </Route>
    </Route>
  )
}
