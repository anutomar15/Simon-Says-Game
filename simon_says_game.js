let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let p = document.querySelector("p");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
    
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("user_flash");
    setTimeout(function(){
        btn.classList.remove("user_flash");
    }, 250);
}


function levelUp(){
    userSeq=[];
    level++;
    p.innerText = `Level ${level}`;
    // random btn choose
    let radIdx = Math.floor(Math.random()*btns.length);
    let radColor = btns[radIdx];
    let radBtn = document.querySelector(`.${radColor}`);
    // console.log(radBtn);
    // console.log(radColor);
    // console.log(radIdx);
    gameSeq.push(radColor);
    gameFlash(radBtn);
}

function checkAns(idx){
    // console.log("curr level: ", level);

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        p.innerHTML = `Game Over! Your score was <b>${level}</b> <br/> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 250);
        reset();
    }
}


function btnpress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns){
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level=0;
}