function computerPlay() {
    out =  Math.floor(Math.random() * (3-1 + 1)) + 1;
    if (out == 1) {
        console.log("rock");
        return "rock"
    } else if (out == 2) {
        console.log("paper");
        return "paper"
    } else {
        console.log("scissor");
        return "scissor"
    }
}

function msg(user, computer, result) {
    if (result == -1) {
        return "You lose! " + computer + " beats " + user;
    } else if (result == 0) {
        return "Tie! " + user + " ties with " + computer;
    } else {
        return "You won! " + user + " beats " + computer;
    }
}

function playRound(playSelection, computerSelection) {
    if (playSelection == "rock") {
        if (computerSelection == "scissor") {
            return msg(playSelection, computerSelection, -1);
        } else if (computerSelection == "rock") {
            return msg(playSelection, computerSelection, 0);
        } else {
            return msg(playSelection, computerSelection, 1);
        }
    } else if (playSelection == "scissor") {
        if (computerSelection == "rock") {
            return msg(playSelection, computerSelection, -1);
        } else if (computerSelection == "scissor") {
            return msg(playSelection, computerSelection, 0);
        } else {
            return msg(playSelection, computerSelection, 1);
        }
    } else if (playSelection == "paper") {
        if (computerSelection == "rock") {
            return msg(playSelection, computerSelection, -1);
        } else if (computerSelection == "paper") {
            return msg(playSelection, computerSelection, 0);
        } else {
            return msg(playSelection, computerSelection, 1);
        }
    } else {
        return msg("ERROR")
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        var user = prompt("Choose your hand");
        out = playRound(user, computerPlay());
        console.log(out);
    }
}

game()

