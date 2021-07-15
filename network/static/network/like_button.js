'use strict';

const l = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return l(
                'button',
                { onClick: () => this.setState({ liked: false }) },
                'Unlike'
              );
            // return 'You liked comment number ' + this.props.postID;
        }

        return l(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
    }
    }

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.like_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const postID = parseInt(domContainer.dataset.postid, 10);
    ReactDOM.render(
      l(LikeButton, { postID: postID }),
      domContainer
    );
  });