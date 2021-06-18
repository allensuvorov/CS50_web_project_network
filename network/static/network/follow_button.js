'use strict';

const e = React.createElement;

class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { following: false };
    
  }

  render() {
    
    
    // fetch(`/unfollow/${userID}`) // unfollow
    
    if (this.state.following) {
      // tell server to follow that user
      // fetch(`/follow/${userID}`) // follow

      // show "unfollow" button 
      // return 'You are following ' + this.props.userID;
      return e(
        'button',
        { onClick: () => this.setState({ following: false }) },
        'Unfollow'
      );  
    };

    return e(
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
    
    // here will fetch... to get following status from server
    fetch(`/follow_status_check/${userID}`) //sending to the server userID to check if following
      .then(response=> response.json())
      .then(data=>{
        console.log(data)
      });
    
    
    ReactDOM.render(
      e(FollowButton, { userID: userID }),
      domContainer
    );
  });

// ... the starter code you pasted ...

// const domContainer = document.querySelector('.follow_button_container');
// ReactDOM.render(e(FollowButton), domContainer);