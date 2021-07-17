'use strict';

const l = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { like: false };
    }

    componentDidMount () {
        // get like status from server
        fetch(`/like_status/${this.props.postID}`) //sending to the server postID to check if liked
          .then(response=> response.json())
          .then(data=>{
            this.setState({like: data.like});
            console.log(data.like);
        });
    }

    render() {
        if (this.state.like) {
            return l(
                'button',
                { onClick: () => {
                    fetch(`/unlike/${this.props.postID}`) // like
                    .then(response=> response.json())
                    .then(data=>{
                        this.setState({ like: data.like });
                        // document.getElementById(postID)
                        // like counter -1
                        //
                        
                        });
                    },
                },
                'Unlike'
              );
            // return 'You liked comment number ' + this.props.postID;
        }

        return l(
            'button',
            { onClick: () => this.setState({ like: true }) },
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