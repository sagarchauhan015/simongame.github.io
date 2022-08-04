botArr = [];
userArr = [];
var goFlag = true;
var gameOver = false;
var level = 1;
var colFlag = false;

if(window.innerWidth<450){
    $('.subheading').text('Press "PLAY" button to Start');
};
document.addEventListener("keydown", go);
$(".box").click(
function(){
    userArr.push(this.id);
    soundAnimate(this.id);
    checkAns(userArr.length-1);
});
setInterval(changeColor,600);
$(".plbtn").click(function(event){
    this.style.visibility = 'hidden';
    event.key = 's';
    go(event);
});

function checkAns(currIndex){
    if(userArr[currIndex]==botArr[currIndex]){
        if(userArr.length == botArr.length){
            setTimeout(fromStart, 1500);
        }
    }
    else{
        gameOver = true;
        if(gameOver == true){
            setTimeout(soundAnimate,500);
            reset();
        }
    }
}

function go(event){
    if(event.key == "s" && goFlag == true){
        colFlag = true;
        changeColor();
        document.querySelector(".subheading").textContent = "Level "+level;
        goFlag = false;
        play();
    }
}

function reset(){
    botArr.length = 0;
    userArr.length = 0;
    goFlag = true;
    gameOver = false;
    colFlag = false;
    changeColor();
    if(window.innerWidth <= 450){
        document.querySelector(".subheading").innerHTML = 'Game Over! <br> Press "PLAY" button to Start';
    }
    else{
        document.querySelector(".subheading").innerHTML = 'Game Over! &nbsp;&nbsp; Press "S" to Start';
    }
    
    level = 1;
    document.querySelector('.plbtn').style.visibility = 'visible';
}
function fromStart(){
    userArr = [];
    level++;
    document.querySelector(".subheading").textContent = "Level "+level;
    for(var i =0;i<botArr.length;i++){
        loop(i);
    }
    function loop(i){
        setTimeout(function(){
            var temp = botArr[i];
            soundAnimate(temp);
        }, 1000*i)
    }
    setTimeout(play,(botArr.length)*1000);
}

function play(){
    var rand = Math.floor(Math.random()*4)+1;
        if(rand == 1){
            soundAnimate("box1");
            botArr.push("box1");
        }
        else if(rand == 2){
            soundAnimate("box2");
            botArr.push("box2");
        }
        else if(rand == 3){
            soundAnimate("box3");
            botArr.push("box3");
        }
        else if(rand == 4){
            soundAnimate("box4");
            botArr.push("box4");
        }
}

function soundAnimate(boxNo){
    var path;
    if(boxNo == "box1"){
        $("#box1").fadeOut(100).fadeIn(100);
        path =  "/SimonGame/sounds/blue.mp3";
    }
    else if(boxNo == "box2"){
        $("#box2").fadeOut(100).fadeIn(100);
        path =  "/SimonGame/sounds/green.mp3";
    }
    else if(boxNo == "box3"){
        $("#box3").fadeOut(100).fadeIn(100);
        path =  "/SimonGame/sounds/red.mp3";
    }
    else if(boxNo == "box4"){
        $("#box4").fadeOut(100).fadeIn(100);
        path =  "/SimonGame/sounds/yellow.mp3";
    }
    else{
        path =  "/SimonGame/sounds/wrong.mp3";
    }
    var audio = new Audio(path);
    audio.play();
}

function randomColor(){
    var color = "#";
    var comb = "0123456789ABCDEF";
    for(var i =0;i<6;i++){
        color = color + comb[Math.floor(Math.random()*16)];
    }
    return color;
}

function changeColor(){
    if(colFlag == false){
        document.querySelector(".subheading").style.color = randomColor();
    }
    else if(colFlag == true){
        document.querySelector(".subheading").style.color = "#60FF42";
    }
}
