const React = require('react')
const { Link } = require('react-router')
const Loader = require('../components/loader')
const Rating = require('../components/rating')

const Menubar = require('../components/menubar')
const StatusTimeline = require('../components/status-timeline')

class ActivityInterview extends React.Component {
  render() {
    return (
      <li>
        <div className="dot" />
        <div className="header">
          <b>เริ่มการสัมภาษณ์</b>
          <span className="date">{this.props.date}</span>
        </div>
        <div className="body">
          <div className="interview">
            <div className="detail">
              <div>ผู้สัมภาษณ์</div>
              <div className="interviewer">
                {this.props.interview.interviewers}
              </div>
            </div>
            <div className="time">
              <i className="ion ion-android-stopwatch" />
              {this.props.interview.time}
            </div>
          </div>
        </div>
      </li>
    )
  }
}

class ActivityStatusChange extends React.Component {
  render() {
    return (
      <li>
        <div className="dot" />
        <div className="header">
          {this.props.recruiter.name}เปลี่ยนสถานะเป็น <b>{this.props.status}</b>
          <span className="date">{this.props.date}</span>
        </div>
      </li>
    )
  }
}

class ActivityAdd extends React.Component {
  render() {
    return (
      <li>
        <div className="dot" />
        <div className="header">
          {this.props.recruiter.name}เพิ่ม <b>{this.props.candidate.name}</b> เข้ามาในระบบ
          <span className="date">{this.props.date}</span>
        </div>
        <div className="body">
          <a className="resume" href={this.props.candidate.resume_url} target="_blank">
            <iframe src={this.props.candidate.resume_url} />
            <div className="desc">
              เปิดประวัติย่อในแท็บใหม่ <i className="ion ion-android-open" />
            </div>
          </a>
        </div>
      </li>
    )
  }
}

class ActivityTimeline extends React.Component {
  render() {
    return (
      <ul className="activity-timeline">
        <ActivityInterview candidate={this.props.candidate} interview={{interviewers: [{name: "แมวน้ำ สำราญรมณ์"}], time: "45 นาที"}} date="10 พ.ย. 58"/>
        <ActivityStatusChange candidate={this.props.candidate} recruiter={{name: "มนีรัตน์"}} status="รอสัมภาษณ์" date="22 ต.ค. 58"/>
        <ActivityAdd candidate={this.props.candidate} recruiter={{name: "มนีรัตน์"}} status="รอสัมภาษณ์" date="7 ต.ค. 58"/>
      </ul>
    )
  }
}

class OverviewTab extends React.Component {
  render() {
    return (
      <div className="tab overview">
        <h1>สถานะปัจจุบัน</h1>
        <StatusTimeline />
        <h1>บันทึกกิจกรรมล่าสุด</h1>
        <ActivityTimeline candidate={this.props.candidate} />
      </div>
    )
  }
}

class CandidateViewTabOption extends React.Component {
  onClick() {
    this.props.onTabSelect(this.props.value)
  }
  render() {
    var activeClass = this.props.value === this.props.selectedTab ? "active" : ""
    return (
      <li className={"tab-container "+activeClass} onClick={this.onClick.bind(this)}>
         <i className={this.props.icon ? this.props.icon : ""} />
        {this.props.display}
      </li>
    )
  }
}

class CandidateViewTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: this.props.initialTab || 'overview'
    }
  }
  onTabSelect(tab) {
    this.setState({selectedTab: tab})
    this.props.onTabSelect(tab);
  }
  onStatusSelect(event) {

  }
  render() {
    return (
      <div className="tab-container">
        <div className="status" onClick={this.onStatusSelect.bind(this)}>
          ดำเนินการ
        </div>
        <div className="recruiter" onClick={this.onStatusSelect.bind(this)}>
          <h3>ผู้รับผิดชอบ</h3>
          <div>
            <div className="display-image" style={{backgroundImage: 'url('+this.props.candidate.recruiter.display_image+')'}} />
            {this.props.candidate.recruiter.name}
          </div>
        </div>
        <div className="tab-select">
          <ul>
            <CandidateViewTabOption value="overview"  display="ภาพรวม"           icon="ion ion-ios-home-outline"      selectedTab={this.state.selectedTab} onTabSelect={this.onTabSelect.bind(this)} />
            <CandidateViewTabOption value="resume"    display="ประวัติย่อ (Resume)" icon="ion ion-document"              selectedTab={this.state.selectedTab} onTabSelect={this.onTabSelect.bind(this)} />
            <CandidateViewTabOption value="interview" display="การสัมภาษณ์"        icon="ion ion-code"                  selectedTab={this.state.selectedTab} onTabSelect={this.onTabSelect.bind(this)} />
            <CandidateViewTabOption value="comment"   display="ความคิดเห็น"        icon="ion ion-ios-chatboxes-outline" selectedTab={this.state.selectedTab} onTabSelect={this.onTabSelect.bind(this)} />
          </ul>
        </div>
        <Rating />
      </div>
    )
  }
}

class CandidateViewInfo extends React.Component {
  getTab() {
    if(this.props.selectedTab === 'overview') {
      return (<OverviewTab candidate={this.props.candidate} />)
    } else {
      return (<div className="tab">{this.props.selectedTab}</div>)
    }
  }
  render() {
    const candidate = this.props.candidate
    const image_style = candidate && { backgroundImage: "url('"+candidate.display_image+"')" }
    return (
      <div className="candidate-info">
        <div className="general-info">
          <div className="display-image" style={image_style} />
          <div className="info">
            <div className="name">
              <h1>{candidate.name}</h1>
            </div>
            <div className="position">
              {candidate.position}
            </div>
          </div>
        </div>
        {this.getTab()}
      </div>
    )
  }
}

class CandidateView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      candidate: undefined,
      selectedTab: 'overview'
    }
  }
  fetchCandidateData() {
    this.setState({
      candidate: {
        id: 1,
        name: "ศรัณยู ภูษิต",
        position: "Software Developer Intern",
        status: "รอสัมภาษณ์",
        resume_url: "/public/resumes/gott.pdf",
        display_image: "https://scontent-lga3-1.xx.fbcdn.net/hphotos-xla1/v/t1.0-9/10460378_1086650394680517_6853281743052289354_n.jpg?oh=ea315d590ac5e339a241859d43b8ac87&oe=56B4C420",
        recruiter: {
          id: 1,
          name: "มนีรัตน์ อู่เต่าบิน",
          display_image: "https://scontent-lga3-1.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/65609_539354492801591_1108515227_n.jpg?oh=0b22fbeda4b9b74ae49f23f908eec5ea&oe=571EB5DF"
        }
      }
    })
  }
  onTabSelect(tab) {
    this.setState({selectedTab: tab})
  }
  componentDidMount() {
    this.fetchCandidateData()
  }
  render() {
    var initialTab = 'overview'
    return (
      <div className="candidate-view">
        {
          this.state.candidate ?
          [ <CandidateViewInfo candidate={this.state.candidate} selectedTab={this.state.selectedTab} />,
            <CandidateViewTab candidate={this.state.candidate} initialTab={initialTab} onTabSelect={this.onTabSelect.bind(this)} /> ] :
          <Loader />
        }

      </div>
    )
  }
}

class CandidateSelectItem extends React.Component {
  render() {
    var candidate = this.props.candidate
    return (
      <div className="candidate-item">
        <div className="status">
          { candidate.status }
        </div>
        <div className="name">
          { candidate.name }
        </div>
        <div className="position">
          { candidate.position }
        </div>
      </div>
    )
  }
}

class CandidateSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: 'id',
      filter: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  filteredAndSortedCandidates() {
    window.x = this.props.data
    return this.props.data.slice(0).filter(
      candidate => (candidate.name+candidate.status+candidate.position).indexOf(this.state.filter) > -1
    ).sort( (a, b) => String(a[this.state.sortBy]).localeCompare(String(b[this.state.sortBy])) )
  }
  handleSearch(event) {
    this.setState({filter: event.target.value})
  }
  onSortChange(event) {
    this.setState({sortBy: event.target.value})
  }
  render() {
    return (
      <div className="candidate-select">
        <div className="filter">
          <input type="text" placeholder="ค้นด้วยชื่อ ตำแหน่ง หรือสถานะ" onChange={this.handleSearch.bind(this)}/>
          <select className="sort" onChange={this.onSortChange.bind(this)}>
            <option value="status">สถานะ</option>
            <option value="position">ตำแหน่ง</option>
            <option value="name">ชื่อ</option>
          </select>
        </div>
        <div className="search-results">
          {
            this.filteredAndSortedCandidates().map(
              candidate => <CandidateSelectItem candidate={candidate}
                                                onClick={() => this.props.onSelectCandidate(candidate.id)}/>
            )
          }
        </div>
      </div>
    )
  }
}

class CandidateExplorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      selectedCandidate: undefined
    }
    this.onSelectCandidate = this.onSelectCandidate.bind(this)
  }
  fetchCandidateData() {
    setTimeout(function(){
      var data = [
        {
          id: 1,
          name: "ศรัณยู ภูษิต",
          position: "Swift Developer",
          status: "รอสัมภาษณ์"
        },
        {
          id: 2,
          name: "สรวิทย์​ สุริยกาญจน์",
          position: "Backend Engineer",
          status: "On-site"
        },
        {
          id: 3,
          name: "กสิ ชนพิมาย",
          position: "Frontend Engineer",
          status: "รอสัมภาษณ์"
        },
        {
          id: 4,
          name: "สาวิตรี อ่ำกลาง",
          position: "Database Engineer",
          status: "รอการตอบรับ"
        },
        {
          id: 5,
          name: "มนัสนันท์ เทพสุริยะศาสตรา",
          position: "Database Engineer",
          status: "On-site"
        },
        {
          id: 6,
          name: "กวินพร ม้าน้ำผ่องใส",
          position: "Android Developer",
          status: "รอการตอบรับ"
        },
        {
          id: 7,
          name: "วิจิตร ตระการตา",
          position: "Frontend Engineer",
          status: "รอการตอบรับ"
        },
        {
          id: 8,
          name: "ยาวดี ศรีทนได้",
          position: "Frontend Engineer",
          status: "On-site"
        },
        {
          id: 9,
          name: "บริโภคชนา ขวัญราษฎ์",
          position: "Android Developer",
          status: "รอสัมภาษณ์"
        },
        {
          id: 10,
          name: "พิมพ์มาดา แสงสีทอง",
          position: "Backend Engineer",
          status: "รอการตอบรับ"
        },
        {
          id: 11,
          name: "วานิชญ์ เกษมสราญ",
          position: "Frontend Engineer",
          status: "รอการตอบรับ"
        },
        {
          id: 12,
          name: "น้ำหยด วงศาเทพหัสดิน",
          position: "Swift Developer",
          status: "รอการตอบรับ"
        }
      ], selectedCandidate = data[0]

      this.setState({
        candidateData: data,
        selectedCandidate: selectedCandidate
      })
    }.bind(this), 500)
  }
  onSelectCandidate(candidate) {
    this.setState({
      selectedCandidate: candidate
    })
  }
  componentDidMount() {
    this.fetchCandidateData()
  }
  render() {
    return (
      this.state.candidateData ?
        <div className="candidate-explorer container">
          <CandidateView ref="view" candidate={this.state.selectedCandidate}/>
          <CandidateSelect ref="select" data={this.state.candidateData} onSelectCandidate={this.onSelectCandidate}/>
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

class Candidates extends React.Component {
  render() {
    return (
      <div className="page-container full candidates">
        <CandidateExplorer />
      </div>
    )
  }
}

module.exports = Candidates
