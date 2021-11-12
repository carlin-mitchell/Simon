var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var hints = 3;

document.querySelector(".hint-box h3 span").innerText = hints;
document.querySelector(".show-pattern").addEventListener("click", function () {
    if (level > 0){
        if (hints > 0) {
            hints--;
            document.querySelector(".hint-box h3 span").innerText = hints;
            playCurrentPattern();
            if (hints === 0) {
                document.querySelector(".show-pattern").classList.add("hidden");
            }
        }
    }
});





document.addEventListener("keydown", function () {
    if (!started) {
        document.querySelector("h1").innerText = `Level ${level}`;
        nextSequence();
        started = true;
        console.log(`GP: ${gamePattern}\nUP: ${userClickedPattern}`);
    }
});

$('.btn').on("click", function (event) {
    var userChosenColor = $(this).attr("id");
    // DEBUG: console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    // DEBUG: console.log(userClickedPattern);
    palySound(userChosenColor);
    animatePress(userChosenColor);
    console.log(`GP: ${gamePattern}\nUP: ${userClickedPattern}`);
    checkAnswer(userClickedPattern.length - 1);
})


function randIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("h1").innerText = `Level ${level}`;
    var randomNumber = randIntInclusive(0, 3);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    // flash the selected button
    $('#' + randomColor).fadeOut(200).fadeIn(200);

    // play the appropriate sound
    palySound(randomColor);
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100);

}

function palySound(name) {
    switch (name) {
        case "red":
            var audio = new Audio("sounds/" + name + ".mp3");
            audio.play();
            break;
        case "green":
            var audio = new Audio("sounds/" + name + ".mp3");
            audio.play();
            break;
        case "blue":
            var audio = new Audio("sounds/" + name + ".mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("sounds/" + name + ".mp3");
            audio.play();
            break;
        case "wrong":
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
        default:
            console.log(name);
            break;
    }
}

function gameOver() {
    document.querySelector("h1").innerText = "Game Over, Press Any Key to Restart.";

    palySound("wrong");

    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
        document.querySelector("body").classList.remove("game-over")
    }, 200);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("failure");
        gameOver();
        restart();
    }
};

function restart() {
    level = 0;
    gamePattern = [];
    started = false;
    hints = 3;
    // reset the hint button and number of hints remaining
    document.querySelector(".show-pattern").classList.remove("hidden");
    document.querySelector(".hint-box h3 span").innerText = hints;

};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function replayButton(currentColor) {
    document.querySelector("#" + currentColor).classList.add(currentColor + "-replay");
    setTimeout(function () {
        document.querySelector("#" + currentColor).classList.remove(currentColor + "-replay");
    }, 500);
};

function playCurrentPattern() {
    gamePattern.forEach((color, i) => {
        setTimeout(() => {
            replayButton(color);
            palySound(color);
        }, i * 1000);
    });
};