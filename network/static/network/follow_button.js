'use strict';

const e = React.createElement;

class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { following: false };
  }

  render() {
    if (this.state.following) {
      return 'You are following this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ following: true }) },
      'Follow'
    );
  }
}

// ... the starter code you pasted ...

const domContainer = document.querySelector('#follow_button_container');
ReactDOM.render(e(FollowButton), domContainer);