'use strict';

const e = React.createElement;

class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    if (this.state.editing) {
        return e(
            'button', { 
                onClick: () => {
                    postID = this.props.postID;
                    const post = document.getElementById(postID);
                    console.log(post.innerHTML);
                    
                    const request = new Request(`/save/${this.props.postID}`, {method: 'POST', body: `{"text": ${post.firstChild.value}}`});
                    
                    fetch(`/save/${postID}`) // unfollow
                        .then(response=> response.json())
                        .then(data=>{
                            this.setState({ editing: false });
                            document.getElementById(postID).innerHTML ='<text>'+post.firstChild.value+'</text>'
                            });
                    },
                }
            },
            'Save ' + this.props.postID
          );
    //   'You editing comment number ' + this.props.postID;
    }

    return e(
        'button', { 
            onClick: () => {
                this.setState({ editing: true });
                const post = document.getElementById(this.props.postID);
                console.log(post.innerText);
                document.getElementById(this.props.postID).innerHTML ='<textarea maxlength="500" cols="50" rows="2">'+post.innerText+'</textarea>'
            }
        },
      'Edit ' + this.props.postID
    );
  }
}

// Find all DOM containers, and render Edit buttons into them.
document.querySelectorAll('.edit_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const postID = parseInt(domContainer.dataset.postid, 10);
    ReactDOM.render(
      e(EditButton, { postID: postID }),
      domContainer
    );
  });