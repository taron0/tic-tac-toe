const game = document.querySelector('#game');
let hod = 0;
game.onclick = function(event) {
    console.log(event);
    if(event.target.className === "block"){
       if(hod % 2 === 0) {
        event.target.innerHTML = "X"
       }
       if(hod % 2 !== 0) {
        event.target.innerHTML = "0"
       }
       hod++

    }
}