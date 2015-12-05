const React = require('react')

class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      displayRating: 0
    }
  }
  componentDidMount() {
    if(this.props.rating !== undefined) {
      this.setState({
        rating: this.props.rating,
        displayRating: this.props.rating
      })
    }
  }
  onMouseOver(rating) {
    this.setState({
      displayRating: rating
    })
  }
  onMouseLeave() {
    this.setState({
      displayRating: this.state.rating
    })
  }
  onClick(rating) {
    this.setState({
      rating: rating
    })
  }
  render() {
    var stars = []
    for(var i=1; i<=5; i++) {
      stars.push(
        <i className={"ion " + (i <= this.state.displayRating ? "ion-android-star":"ion-android-star-outline")} 
           onMouseOver={this.onMouseOver.bind(this, i)}
           onClick={this.onClick.bind(this, i)}
           />
      )
    }
    return (
      <div className="rating-component" onMouseLeave={this.onMouseLeave.bind(this)}>
        { stars }
      </div>
    )
  }
}

module.exports = Rating
