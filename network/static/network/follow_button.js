'use strict';

const e = React.createElement;

class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { following: false };
  }

  render() {
    
    // here will fetch... to get following status from server
    // fetch('/follow')
      // .then(response=> response.)
    
    if (this.state.following) {

      // fetch('follow')
      
      return 'You are following ' + this.props.userID;
    }

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
    ReactDOM.render(
      e(FollowButton, { userID: userID }),
      domContainer
    );
  });

// ... the starter code you pasted ...

// const domContainer = document.querySelector('.follow_button_container');
// ReactDOM.render(e(FollowButton), domContainer);