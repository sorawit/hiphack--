const React = require('react')
const { Link } = require('react-router')
const Loader = require('../components/loader')
const Rating = require('../components/rating')

const Menubar = require('../components/menubar')
const StatusTimeline = require('../components/status-timeline')
const ActivityTimeline = require('../components/activity-timeline')

const Ace = require('brace')

class CodingInterviewResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [
        {
          body: 'ม้านิลมังกรมีหางทั้งหมด 9 หาง แต่ละหางมักทะเลาะกันไม่จบสิ้น เพื่อฝึกความสามัคคีสุดสาครจึงให้หางแต่ละตัวไปหาจำนวนเฉพาะที่ไม่ซ้ำกัน และรวมกันได้เท่ากับ 10001 เท่าของตัวที่มีค่าน้อยที่สุดบวกกับ 2 เท่าของตัวที่มีค่ามากที่สุด ขอให้คุณเขียนโปรแกรมช่วยหางม้านิลมัลกรหาจำนวนเหล่านั้นที',
          result: {
            time: '23 นาที',
            code: '/* This is so ez\n' +
                  ' * You should hire me because ...\n' +
                  ' * I AM SO FREAKING SMART\n' +
                  ' * :) */\n\n' +
                  'console.log("2, 127, 1223, 2789, 5023, 5333, 5653, 5881, 6029")'
          }
        },
        {
          body: 'ถ้า A แทน 1, B แทน 2 ... Z แทน 26\n     AA แทน 27, AB แทน 28  ...\n     SEXY แทนอะไร',
          result: {
            time: '5 นาที',
            code: '/* Hey recruiters\n' +
                  ' * ARE YOU FREAKING KIDDING ME? ...\n' +
                  ' * Let\'s get over with stupid questions \n' +
                  ' * :/ */\n\n' +
                  'console.log("12876")'
          }
        }
      ],
      selectedQuestion: 0
    }
  }
  componentDidMount() {
    var editor = Ace.edit('code')
    editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/tomorrow_night_bright')
  }
  componentDidUpdate() {
    Ace.edit('code').destroy()
    this.refs.code.getDOMNode().innerHTML = this.state.questions[this.state.selectedQuestion].result.code
    var editor = Ace.edit('code')
    editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/tomorrow_night_bright')
  }
  getQuestionSelector() {
    var options = [];
    for(var i=0; i<this.state.questions.length; i++) {
      options.push(
        <div className={"option" + (this.state.selectedQuestion === i ? " selected" : "")}
             onClick={this.setState.bind(this, {selectedQuestion: i}, () => {})}>{i+1}</div>
      );
    }
    return (
      <div className="question-selector">
        {options}
      </div>
    )
  }
  render() {
    var question = this.state.questions[this.state.selectedQuestion]
    return (
      <div className="interview-result coding">
        <div className="info">
          <div className="label">ผู้สัมภาษณ์</div>
          <div className="value">ม้าน้ำ จ้าแสงแรงศักดา, มาดามแมว, จินดามนี ศรีแมงกระพรุนทอง</div>
        </div>
        <div className="info">
          <div className="label">เวลา</div>
          <div className="value">9:00 - 11:23 (2:23 ชั่วโมง)</div>
        </div>
        <div className="questions-container">
          {this.getQuestionSelector()}
          <div className="time"><i className="ion ion-android-stopwatch" />{question.result.time}</div>
          <div className="body">{question.body}</div>
          <div className="code" id="code" ref="code">{question.result.code}</div>
        </div>
      </div>
    )
  }
}

class InterviewTab extends React.Component {
  render() {
    return (
      <div className="tab interview">
        <h1>การสัมภาษณ์</h1>
        <select className="date-select">
          <option>8 ต.ค. 58</option>
          <option>1 พ.ย. 58</option>
          <option>9 พ.ย. 58</option>
        </select>
        <CodingInterviewResult />
      </div>
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
    } else if(this.props.selectedTab === 'interview') {
        return (<InterviewTab candidate={this.props.candidate} />)
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
    var className = "candidate-item" + (this.props.selected ? " selected" : "")
    return (
      <div className={className} onClick={this.props.onSelect}>
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
  componentDidMount() {
    $(this.refs['search-results'].getDOMNode()).perfectScrollbar()
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
  onSelectCandidate(candidateId) {
    console.log(candidateId)
    this.props.onSelectCandidate(candidateId)
    this.setState({ selectedId: candidateId })
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
        <div className="search-results" ref="search-results">
          {
            this.filteredAndSortedCandidates().map(
              candidate => <CandidateSelectItem candidate={candidate}
                                                selected={candidate.id === this.props.selectedCandidate}
                                                onSelect={this.onSelectCandidate.bind(this, candidate.id)} />
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
      ], selectedCandidate = 1

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
          <CandidateSelect ref="select" data={this.state.candidateData}
                           onSelectCandidate={this.onSelectCandidate}
                           selectedCandidate={this.state.selectedCandidate}/>
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
