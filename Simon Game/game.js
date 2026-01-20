// alert("working")
userClickedPattern=[]
gamePattern=[]
buttonColours=["red", "blue", "green", "yellow"]
var level=0
function nextSequence() {
    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColor=buttonColours[randomNumber]
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level=level+1
    $("h1").text("level "+level)
    playSound(randomChosenColor);
    return randomChosenColor;
}

$(".btn").on("click",function (clicked){
    // console.log(clicked.target.id)
    var userChosenColor=clicked.target.id
    let str=userChosenColor.toString();
    var indexAnswer=userClickedPattern.push(clicked.target.id)
    console.log(userClickedPattern);
    console.log(indexAnswer-1)
    checkAnswer(indexAnswer-1)
    playSound(str);
});
function playSound(name) {
    var sound= new Audio("./sounds/"+ name +".mp3");
    sound.play();
}
function animateColor(currentColor){
    $("#"+currentColor).on("click",function () {
        $("#"+currentColor).addClass("pressed")
    setTimeout(function() {
        $("#"+currentColor).removeClass('pressed');
        }, 100);
    });
}
if(level>0){
    animateColor(nextSequence())

}
$(document).on("keypress",function(){
    if(level===0){
    animateColor(nextSequence())      
    }
});
function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
        console.log("right")
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){animateColor(nextSequence())
        },1000)
            userClickedPattern=[]
        }
    }
    else{
        console.log("wrong")
        var wrong= new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver()
    }    
}
function startOver(){
    level=0
    gamePattern=[]
    userClickedPattern=[]
   
}


