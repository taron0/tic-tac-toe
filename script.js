window.onload = function () {
  let game = document.getElementById("game");
  let goo = 0;
  let score = document.querySelector(".score");
  let scoreOwn = document.querySelector(".score-1");
  let scoreTwo = document.querySelector(".score-2");
  const clickAudio = new Audio("./Music/a.mp3");

  for (let i = 0; i < 9; i++) {
    game.innerHTML += `<div class="block"></div>`;
  }
  let allblock = document.getElementsByClassName("block");

  function getPossibleMovesInvexes() {
    let index = [];
    let j = 0;
    for (let i = 0; i < allblock.length; i++) {
      if (allblock[i].innerHTML === "") {
        index[j] = i;
        j++;
      }
    }
    return index;
  }

  function computerMove() {
    let index = getPossibleMovesInvexes();
    let random = Math.floor(Math.random() * index.length);
    let randblock = index[random];

    allblock[randblock].innerHTML = `<p class="symbol-O">o</p>`;
    clickAudio.play();
    goo = 0;

    isGameOver();
  }

  function restart() {
    count = 0;
    goo = 0;
    game.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      game.innerHTML += '<div class="block"></div>';
    }
  }

  function isGameOver() {
    const blocks = document.getElementsByClassName("block");
    let rez = check();
    let index = getPossibleMovesInvexes();

    if (!!rez) {
      switch (rez) {
        case 1:
          goo = 1;
          scoreOwn.textContent++;
          break;
        case 2:
          goo = 1;
          scoreTwo.textContent++;
          break;
      }
    } else {
      if (index.length === 0) {
        for (let i = 0; i < blocks.length; i++) {
          blocks[i].classList.add("active");
        }

        goo = 1;
        score.textContent++;
      }
    }
    clickAudio.play();
    if (!!rez || index.length === 0) {
      setTimeout(restart, 2000);
      return true;
    }
    return false;
  }

  function check() {
    let winer = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winer.length; i++) {
      let winX =
        allblock[winer[i][0]].innerHTML === `<p class="symbol-X">x</p>` &&
        allblock[winer[i][1]].innerHTML === `<p class="symbol-X">x</p>` &&
        allblock[winer[i][2]].innerHTML === `<p class="symbol-X">x</p>`;

      let winO =
        allblock[winer[i][0]].innerHTML === `<p class="symbol-O">o</p>` &&
        allblock[winer[i][1]].innerHTML === `<p class="symbol-O">o</p>` &&
        allblock[winer[i][2]].innerHTML === `<p class="symbol-O">o</p>`;

      if (!!winX) {
        allblock[winer[i][0]].classList.add("active");
        allblock[winer[i][1]].classList.add("active");
        allblock[winer[i][2]].classList.add("active");

        return 1;
      }
      if (winO) {
        allblock[winer[i][0]].classList.add("active");
        allblock[winer[i][1]].classList.add("active");
        allblock[winer[i][2]].classList.add("active");
        return 2;
      }
    }
  }

  game.onclick = function (e) {
    if (goo === 0) {
      if (e.target.innerHTML === "") {
        clickAudio.play();
        e.target.innerHTML = `<p class="symbol-X">x</p>`;
        goo = 1;
        if (!isGameOver()) {
          clickAudio.play();
          setTimeout(computerMove, 1000);
        }
      }
    }
  };
};
