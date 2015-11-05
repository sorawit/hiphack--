const React = require('react')
const { Link } = require('react-router')

const Menubar = require('../components/menubar')

class CandidateSelectyy extends React.Component {
  getFilterMap() {
    const map = { position: {}, status: {} }
    this.props.data.map((d) => {
      map.position[d.position] ? map.position[d.position]++ : map.position[d.position] = 1
      map.status[d.status] ? map.status[d.status]++ : map.status[d.status] = 1
    })
    return map
  }
  searchFor(keyword) {
    this.props.getCandidateTable().searchFor(keyword)
  }
  render() {
    const filterMap = this.getFilterMap()
    return (
      <div className="candidate-filter">
        <h3>
          ตำแหน่งที่มีการสมัคร
        </h3>
        <ul>
          {
            Object.keys(filterMap.position).map((p) => {
              return (
                <li>
                  <i className="ion ion-android-person" />
                  <a onClick={this.searchFor.bind(this, p)}>
                    {p} ({filterMap.position[p]})
                  </a>
                </li>
              )
            })
          }
        </ul>
        <h3>
          สถานะของการสมัคร
        </h3>
        <ul>
          {
            Object.keys(filterMap.status).map((s) => {
              return (
                <li>
                  <i className="ion ion-chatbox-working" />
                  <a onClick={this.searchFor.bind(this, s)}>
                    {s} ({filterMap.status[s]})
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

class CandidateSelectxx extends React.Component {
  componentDidMount() {
    $(React.findDOMNode(this.refs.table)).DataTable({
      "language": {
        "lengthMenu": "แสดง _MENU_ คนต่อหน้า",
        "zeroRecords": "Nothing found - sorry",
        "info": "หน้า _PAGE_  จาก _PAGES_",
        "infoEmpty": "No records available",
        "infoFiltered": "(ผลการค้นหาจากทั้งหมด _MAX_ รายการ)",
        "search": "",
        "searchPlaceholder": "ค้นหาผู้สมัคร",
        "paginate": {
          "next": "ถัดไป",
          "previous": "ก่อนหน้า"
        }
      }
    })
  }
  searchFor(keyword) {
    $(React.findDOMNode(this)).find('.dataTables_filter input').val(keyword).trigger('keyup');
  }
  getTableBody() {
    return (
      <tbody>
        {this.props.data.map( (d, i) => {
          return (
            <tr>
              <td>
                <Link to={"/company/candidate/"+d.id}>
                  {d.name}
                </Link>
              </td>
              <td>{d.position}</td>
              <td>{d.status}</td>
            </tr>
          )
        })}
      </tbody>
    )
  }
  render() {
    return (
      <div className="candidate-table">
        <div className="search-container">
        </div>
        <table ref="table">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>ตำแหน่ง</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          {this.getTableBody()}
        </table>
      </div>
    )
  }
}

class CandidateView extends React.Component {
  render() {
    return (
      <div className="candidate-view">
      </div>
    )
  }
}

class CandidateSelectItem extends React.Component {
  render() {
    let candidate = this.props.candidate
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
  render() {
    console.log(this.filteredAndSortedCandidates())
      return (
        <div className="candidate-select">
          <div className="filter">
            <input type="text" placeholder="ค้นด้วยชื่อ ตำแหน่ง หรือสถานะ" onChange={this.handleSearch.bind(this)}/>
            <div className="sort">
              เรียงตาม
              <button className="button" onClick={() => this.setState({ sortBy: 'status' })}>สถานะ</button>
              <button className="button" onClick={() => this.setState({ sortBy: 'position' })}>ตำแหน่ง</button>
              <button className="button" onClick={() => this.setState({ sortBy: 'name' })}>ชื่อ</button>
            </div>
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
