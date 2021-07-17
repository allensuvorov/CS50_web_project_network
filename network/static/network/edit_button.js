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
                    const postID = this.props.postID;
                    const postText = document.getElementById(postID).getElementsByClassName('text')[0]
                    
                    // acquire the token - read https://docs.djangoproject.com/en/3.2/ref/csrf/
                    function getCookie(name) {
                        let cookieValue = null;
                        if (document.cookie && document.cookie !== '') {
                            const cookies = document.cookie.split(';');
                            for (let i = 0; i < cookies.length; i++) {
                                const cookie = cookies[i].trim();
                                // Does this cookie string begin with the name we want?
                                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                    break;
                                }
                            }
                        }
                        return cookieValue;
                    }
                    
                    const csrftoken = getCookie('csrftoken');

                    // request has this route and token 
                    const request = new Request(`/save/${postID}`, {
                        // csrfmiddlewaretoken: '{{ csrf_token }}',
                        headers: {'X-CSRFToken': csrftoken}
                        });
                    
                    const data = {text: postText.firstChild.value};

                    fetch(request,{
                        method: 'POST', 
                        body: JSON.stringify(data),
                        mode: 'same-origin'  // Do not send CSRF token to another domain.
                        }) // unfollow
                        .then(response=> response.json())
                        .then(data=>{
                            this.setState({ editing: false });
                            postText.innerHTML ='<text>'+data.text+'</text>'
                            });
                    },
                
                },
            'Save' //+ this.props.postID
        );
    //   'You editing comment number ' + this.props.postID;
    }

    return e(
        'button', { 
            onClick: () => {
                this.setState({ editing: true });
                const postText = document.getElementById(this.props.postID).getElementsByClassName("text")[0];
                // console.log(post.innerText);
                console.log(postText);
                postText.innerHTML ='<textarea maxlength="500" cols="50" rows="2">'+postText.innerText+'</textarea>'
            }
        },
      'Edit'// + this.props.postID
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