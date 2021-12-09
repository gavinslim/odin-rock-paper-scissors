

function computerPlay() {
    out =  Math.floor(Math.random() * (3-1 + 1)) + 1;
    if (out == 1) {
        // console.log("rock");
        return "rock"
    } else if (out == 2) {
        // console.log("paper");
        return "paper"
    } else {
        // console.log("scissor");
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
    if (playSelection == "rock" && computerSelection == "scissor")  {return 1;}
    if (playSelection == "rock" && computerSelection == "rock")     {return 0;}
    if (playSelection == "rock" && computerSelection == "paper")    {return -1;}

    if (playSelection == "paper" && computerSelection == "scissor") {return -1;}  
    if (playSelection == "paper" && computerSelection == "rock")    {return 1;}
    if (playSelection == "paper" && computerSelection == "paper")   {return 0;}

    if (playSelection == "scissor" && computerSelection == "scissor")   {return 0;}
    if (playSelection == "scissor" && computerSelection == "rock")      {return -1;}
    if (playSelection == "scissor" && computerSelection == "paper")     {return 1;}

    return "ERROR"
}

function retry() {
    // Reset scores
    player_score = 0;
    comp_score = 0;

    // Enable game buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.id != "retry") {
            button.disabled = false;
        }
    });

    // Remove retry button
    const body = document.querySelector('body');
    const retry_button = document.getElementById("retry");
    const throwaway_node = body.removeChild(retry_button);

    // Reset results and displays
    document.getElementById('round-result').innerHTML = ""; 
    document.getElementById('player-score').innerHTML = player_score;
    document.getElementById('comp-score').innerHTML = comp_score;
    document.getElementById('game-result').innerHTML = "";     
}

// Create retry button and disable rock paper scissors button
function create_retry() {
    // Add 'retry' button
    const body = document.querySelector('body');
    const retry_button = document.createElement('button');
    retry_button.innerHTML = "Retry";
    retry_button.id = "retry";

    body.appendChild(retry_button);
    retry_button.addEventListener('click', retry);

    // Disable game buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        // Disable all buttons except for 'retry' button
        if (button.id != "retry") {
            button.disabled = true;
        }
    });
}

function play_game(e) {

    // Play round 
    comp_selection = computerPlay();
    round_result = playRound(this.id, comp_selection);

    // Increment player or comp score
    if (round_result == 1) {player_score++;}
    else if (round_result == -1) {comp_score++;}

    message = msg(this.id, comp_selection, round_result);

    // Display round-result
    document.getElementById('round-result').innerHTML = message; 

    // Display user and comp score
    document.getElementById('player-score').innerHTML = player_score;
    document.getElementById('comp-score').innerHTML = comp_score;

    // Reset game if max round reached
    if (player_score >= max_round) {
        final_result = "YOU WON! :)";
        create_retry();
    } else if (comp_score >= max_round) {
        final_result = "YOU LOSE! :(";
        create_retry();
    } else {
        final_result = "";
    }

    // Display final result
    document.getElementById('game-result').innerHTML = final_result;
}

function game() {
    // Get selectors for buttons
    const buttons = document.querySelectorAll('button');

    // When buttons are clicked
    buttons.forEach(button => button.addEventListener('click', play_game));
}

var max_round = 5;
var player_score = 0;
var comp_score = 0;

game();