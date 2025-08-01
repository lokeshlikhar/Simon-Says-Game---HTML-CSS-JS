// Modal Logic
let modal = document.getElementById("gameModal");
let startBtn = document.getElementById("startBtn");

//hide modal on click
startBtn.addEventListener("click" , ()=>{
  modal.style.display = "none";
})

//game Logic

let gameSeq = [];
let userSeq = [];
let allScore = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];

document.addEventListener("keypress", function () { //game start
  setTimeout(() => {
    if (started == false) {
      started = true;
      levelUp(); //when key press we call levelUp()
    }
  }, 250);
});

function levelUp() {
  userSeq = []; //make userSeq empty
  level++; //level increase
  h2.innerText = `Level ${level}`; //change text

  let randIdx = Math.floor(Math.random() * 4); //generate random index
  let randColor = btns[randIdx]; //get color by index 
  let randBtn = document.querySelector(`.${randColor}`); //select that box

  gameSeq.push(randColor); //add that box to gameSeq
  gameFlash(randBtn); //flash that box
}

function gameFlash(btn) { //flash the box by game
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

let allBtns = document.querySelectorAll(".btn"); //select all box
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress); //add event listener to box ..and when user press ..call function btnPress
}

function btnPress() { //when btn press
  if (started == false) {
    return;
  }
  let btn = this;

  userFlash(btn); //flash that button
  let userColor = btn.getAttribute("id"); //get that box color
  userSeq.push(userColor); //add that color to userSeq
  checkAns(userSeq.length - 1); //pass userSeq last index to check 
}

function userFlash(btn) { //when user click box
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
}

function checkAns(idx) { //check 
  if (userSeq[idx] === gameSeq[idx]) { //userSeq last index and gameSeq same index..if we check middle one then continue checking
    if (userSeq.length === gameSeq.length) { //if it is last idx .then call levelUp
      setTimeout(levelUp, 700); //levelUp will increase the level an another btn will flash
    }
  } else {//if user guess wrong ..then show its score ..and reset game
    h2.innerHTML = `Game Over !  Your Score was -  <b>${
      level - 1
    } </b> <br> Press key to start new game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 180);

    let score = level - 1;
    allScore.push(score);//add curr Score to highestscore array to get highest score or user
    reset();
  }
}
let newp = document.createElement("p");
function reset() { //to reset game
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

  let highScore = Math.max(...allScore); //display highest score

  newp.innerText = `Your Highest Score is ${highScore}`;
  newp.classList.add("p");
  document.body.appendChild(newp);
}
