
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function computerPlay() {
    out =  Math.floor(Math.random() * (3-1 + 1)) + 1;
    if (out == 1) {
        return "rock"
    } else if (out == 2) {
        return "paper"
    } else {
        return "scissors"
    }
}

function msg(user, computer, result) {
    if (result == -1) {
        return "You lost! " + computer + " beats " + user;
    } else if (result == 0) {
        return "Tie! " + user + " ties with " + computer;
    } else {
        return "You won! " + user + " beats " + computer;
    }
}

function playRound(playSelection, computerSelection) {
    if (playSelection == "rock" && computerSelection == "scissors")  {return 1;}
    if (playSelection == "rock" && computerSelection == "rock")     {return 0;}
    if (playSelection == "rock" && computerSelection == "paper")    {return -1;}

    if (playSelection == "paper" && computerSelection == "scissors") {return -1;}  
    if (playSelection == "paper" && computerSelection == "rock")    {return 1;}
    if (playSelection == "paper" && computerSelection == "paper")   {return 0;}

    if (playSelection == "scissors" && computerSelection == "scissors")   {return 0;}
    if (playSelection == "scissors" && computerSelection == "rock")      {return -1;}
    if (playSelection == "scissors" && computerSelection == "paper")     {return 1;}

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
            button.classList.remove('do-nothing');
        }
    });

    // Hide retry button
    document.getElementById('retry').style.visibility = 'hidden';

    // Reset results and displays
    document.getElementById('round-result').style.visibility='hidden';
    document.getElementById('player-score').innerHTML = player_score;
    document.getElementById('player-score').classList.remove('green');
    document.getElementById('comp-score').innerHTML = comp_score;
    document.getElementById('comp-score').classList.remove('green');
}

// Create retry button and disable rock paper scissors button
function prompt_retry() {
    const retry_button =  document.getElementById('retry');
    retry_button.style.visibility = 'visible';
    retry_button.addEventListener('click', retry);

    // Disable game buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        // Disable all buttons except for 'retry' button
        if (button.id != "retry") {
            button.classList.add('do-nothing');
        }
    });
}

function play_game(e) {
    // Play round based on selected button 
    comp_selection = computerPlay();
    round_result = playRound(this.id, comp_selection);

    const player = document.getElementById('player-score');
    const computer = document.getElementById('comp-score');

    // Increment player or comp score
    if (round_result == 1) {
        player_score++;
        player.classList.add('green');
        computer.classList.remove('green');
    }
    else if (round_result == -1) {
        comp_score++;
        computer.classList.add('green');
        player.classList.remove('green');
    }

    message = msg(capitalize(this.id), capitalize(comp_selection), round_result);

    // Display round-result
    round_result = document.getElementById('round-result');
    round_result.innerHTML = message; 
    round_result.style.visibility='visible';
    
    // Display user and comp score
    document.getElementById('player-score').innerHTML = player_score;
    document.getElementById('comp-score').innerHTML = comp_score;

    // Hide retry button
    document.getElementById('retry').style.visibility = 'hidden';

    // Reset game if max round reached
    if (player_score >= max_round) {
        round_result.innerHTML = "Congratulations. It seems you are indeed luckier than a computer.";
        prompt_retry();
    } else if (comp_score >= max_round) {
        round_result.innerHTML = "Too bad. Unfortunately, you are not luckier than a computer.";
        prompt_retry();
    } 
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