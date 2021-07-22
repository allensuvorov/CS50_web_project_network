'use strict';

const f = React.createElement;

class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { following: false };
    
  }

  componentDidMount () {
    //sending to the server userID to check if following
    fetch(`/follow_status/${this.props.userID}`) 
      .then(response=> response.json())
      .then(data=>{
        this.setState({following: data.following});
      });
  }

  render() {
    if (this.state.following) {
      
      // show "unfollow" button
      return f(
        'button',
        { onClick: () => {
          fetch(`/unfollow/${this.props.userID}`) // unfollow
          .then(response=> response.json())
          .then(data=>{
            this.setState({following: data.following})
            });
          },
        },
        'Unfollow'
        );  
      };
      
      return f(
        'button',
        { onClick: () => {
        // tell server to follow that user
        fetch(`/follow/${this.props.userID}`) // follow
        .then(response=> response.json())
        .then(data=>{
          this.setState({following: data.following})
          });
        },
      },
      'Follow'
    );
  }
}

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.follow_button_container')
  .forEach(domContainer => {
    // Read the user ID from a data-* attribute.
    const userID = parseInt(domContainer.dataset.userid, 10);
    
    ReactDOM.render(
      f(FollowButton, { userID: userID }),
      domContainer
    );
  });
