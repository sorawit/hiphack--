const React = require('react')
const { Link } = require('react-router')

const Menubar = require('../components/menubar')

class Jumbo extends React.Component {
  render() {
    return (
      <div className="jumbo">
        <div className="upper clearfix">
          <div className="name-position-wrapper">
            <div className="name">
              { this.props.candidateData.name }
            </div>
            <div className="position">
              { this.props.candidateData.position }
            </div>
          </div>
          <div className="status-wrapper">
            สถานะ
            <span className="status">
              { this.props.candidateData.status }
            </span>
          </div>
        </div>
        <div className="lower clearfix">
          <div className="recruiter-wrapper">
            ผู้รับผิดชอบ
            <span className="recruiter">
              { this.props.candidateData.recruiter }
            </span>
          </div>
          <div className="email">
            <i className="ion ion-ios-email-outline" />
            { this.props.candidateData.email }
          </div>
        </div>
      </div>
    )
  }
}

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tab: 'resume' }
  }
  getTabContent() {
    switch(this.state.tab) {
      case 'resume': return <iframe src={this.props.candidateData.resume_url} />
      case 'info': return <div>ข้อมูลผู้สมัคร</div>
      case 'interviews': return <div>ประวัติการสัมภาษณ์</div>
      case 'feedback': return <div>FEEDBACK</div>
    }
  }
  getTabSelector(tab) {
    return (
      <li onClick={ this.setState.bind(this, { tab: tab }, (()=>{})) } className={ this.state.tab==tab?'active':'' }>
        { ((_tab) => {
          switch(_tab) {
            case 'resume': return <a>RESUME</a>
            case 'info': return <a>ข้อมูลผู้สมัคร</a>
            case 'interviews': return <a>ประวัติการสัมภาษณ์</a>
            case 'feedback': return <a>FEEDBACK</a>
          }
        })(tab) }
      </li>
    )
  }
  render() {
    return (
      <div className="details">
        <div className="tab-selector">
          <ul>
            { this.getTabSelector('resume') }
            { this.getTabSelector('info') }
            { this.getTabSelector('interviews') }
            { this.getTabSelector('feedback') }
          </ul>
        </div>
        <div className="tab-content">
          { this.getTabContent() }
        </div>
      </div>
    )
  }
}

class CandidateProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { candidateData: false }
  }
  fetchCandidateData() {
    setTimeout(function(){
      this.setState({
        candidateData: {
          id: 1,
          name: "ศรัณยู ภูษิต",
          recruiter: "มนีรัตน์​ อู่เต่าบิน",
          position: "Swift Developer",
          status: "ระหว่างการพิจารณา",
          performance: "ยอดเยี่ยม",
          interview_date: "18 ตุลาคม 2015",
          university: "Purdue University",
          email: "sphusit@purdue.edu",
          gpa: '3.83/4.00',
          resume_url: './resumes/gott.pdf'
        }
      })
    }.bind(this), 500)
  }
  render() {
    this.fetchCandidateData()
    return (
      this.state.candidateData ?
        <div className="candidate-profile container">
          <Jumbo candidateData={this.state.candidateData} />
          <Details candidateData={this.state.candidateData} />
        </div>
      :
        <div className="container">
          <div id="loader-wrapper">
            <div id="loader"></div>
          </div>
        </div>
    )
  }
}

class Profile extends React.Component {
  render() {
    return (
      <div className="page-container profile">
        <Menubar page="Profile" />
        <CandidateProfile />
      </div>
    )
  }
}

module.exports = Profile
