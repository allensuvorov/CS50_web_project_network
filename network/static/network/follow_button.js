'use strict';

const e = React.createElement;

class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { following: false };
    
  }

  componentDidMount () {
    // here will fetch... to get following status from server
    fetch(`/status/${this.props.userID}`) //sending to the server userID to check if following
      .then(response=> response.json())
      .then(data=>{
        this.setState({following: data.following})
        console.log(data);
        console.log(data.following);
      });
  }

  render() {
    if (this.state.following) {
      
      // show "unfollow" button 
      // return 'You are following ' + this.props.userID;
      return e(
        'button',
        { onClick: () => {
          
          // fetch(`/unfollow/${this.props.userID}`) // unfollow
          //   .then()
          this.setState({ following: false }) 
          }
        },
        'Unfollow'
        );  
      };
      
      return e(
      // tell server to follow that user
      // fetch(`/follow/${userID}`) // follow
      'button',
      { onClick: () => this.setState({ following: true }) },
      'Follow'
    );
  }
}

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.follow_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const userID = parseInt(domContainer.dataset.userid, 10);
    
    ReactDOM.render(
      e(FollowButton, { userID: userID }),
      domContainer
    );
  });
