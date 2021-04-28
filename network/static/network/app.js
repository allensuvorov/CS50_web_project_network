// here will start script
document.addEventListener('DOMContentLoaded', function() {
    console.log("page loaded");

    document.getElementById('id_newpost').onsubmit = console.log("button pushed"); 
    // why is it fired without button push?
    });