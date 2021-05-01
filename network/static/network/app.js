// here will start script
document.addEventListener('DOMContentLoaded', function() {
    console.log("page loaded");

    function onClick (){
        console.log("submit button pushed")
        // here we will send form input to the server via an ajax POST request, refer to project Pizza
        // is there value in using promises to send post text to the server?  
    }
    document.querySelector('input').onclick = onClick;
    });