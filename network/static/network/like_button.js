'use strict';

const l = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            like: false
        };
    }

    componentDidMount () {
        // get like status from server
        fetch(`/like_status/${this.props.postID}`) //sending to the server postID to check if liked
          .then(response=> response.json())
          .then(data=>{
            this.setState({
                like: data.like
            });

            // console.log(data.like);
        });
    }

    render() {
        if (this.state.like) {
            return l(
                'button', {
                    onClick: () => {
                        let postID = this.props.postID
                        const postLikes = document.getElementById(postID).getElementsByClassName('likes')[0]

                        fetch(`/unlike/${postID}`) // unlike
                        .then(response=> response.json())
                        .then(data=>{
                            this.setState({ like: data.like });
                            postLikes.innerHTML = "Likes: " + data.likes_count;
                            
                            });
                    },
                },
                'Unlike'
            );
            // return 'You liked comment number ' + this.props.postID;
        }

        return l(
            'button', { 
                onClick: () => {
                    let postID = this.props.postID
                    const postLikes = document.getElementById(postID).getElementsByClassName('likes')[0]

                    fetch(`/like/${postID}`) // like
                    .then(response=> response.json())
                    .then(data=>{
                        this.setState({ like: data.like });
                        postLikes.innerHTML = "Likes: " + data.likes_count;
                        });
                    },
            },
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