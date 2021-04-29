// here will start script
document.addEventListener('DOMContentLoaded', function() {
    console.log("page loaded");

    function onClick (){
        console.log("submit button pushed")
    }
    document.querySelector('input').onclick = onClick;
    // why is it fired without button push?
    });