const React = require('react')
const { Link } = require('react-router')

const UserLinks = require('./user-links')

class Navbar extends React.Component {
  render() {
    return (
      <nav className="main-nav" ref="header">
        <div className="container">
          <Link className="fl-lt logo" to="/company/dashboard">
            Hiphack
          </Link>
          <div className="fl-lt notification">
            <i className="ion ion-android-notifications"/>
            <span className="message">
              การสัมภาษณ์ครั้งต่อไปใน 3 วัน
            </span>
          </div>
          <div className="fl-rt">
            <UserLinks />
          </div>
        </div>
      </nav>
    )
  }
}

module.exports = Navbar
