$(document).ready(function () {
    // Global scope
    var secondsLeft = 75;
    var d = new Date();

    if (location.href.endsWith('scoreboard.html')) {
        showHighscores();
    }

    // Array of objects containing each page with the question associated
    var quizz = [
        { // object --> page 1
            title: "Question 1",
            description: "description 1",
            possibleAnswers: ["a1", "a2", "a3", "a4"],
            correctAnswer: "a2",
        },
        { // object --> page 2
            title: "Question 2",
            description: "description 2",
            possibleAnswers: ["a1", "a2", "a3", "a4"],
            correctAnswer: "a2",
        },
        { // object --> page 3
            title: "Question 3",
            description: "description 3",
            possibleAnswers: ["a1", "a2", "a3", "a4"],
            correctAnswer: "a2",
        },
        { // object --> page 4
            title: "Question 4",
            description: "description 4",
            possibleAnswers: ["a1", "a2", "a3", "a4"],
            correctAnswer: "a2",
        },
        { // object --> page 4
            title: "Question 5",
            description: "description 5",
            possibleAnswers: ["a1", "a2", "a3", "a4"],
            correctAnswer: "a2",
        },
    ];


    // Event Listener on Start button
    $("#startBtn").on("click", startTimer);


    $("#startBtn").on("click", function () {
        showPage(0)
    });

    // Event Listener on Highscore page
    $("#clearScoresBtn").on("click", function () {
        window.localStorage.clear();
        location.reload();
    })

    $("#scoreBoardPage").on("click", showHighscores)

    $("#alert").hide();



    // Starting timer
    function startTimer() {
        timerInterval = setInterval(function () {
            secondsLeft--;
            $("#timer").text("Timer : " + secondsLeft + " sec");
            if (secondsLeft < 0) {
                clearInterval(timerInterval);
            }
        }, 1000)
    };

    // Stoping timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Clearing main content
    function clearContent(page) {
        $(page).html("");
    };




    // Display the question page
    function showPage(page) {
        clearContent("main");
        // Calling the page to load
        if (page < quizz.length) {
            var quizzObject = quizz[page];
            // Creating elements for question
            $("#questionContainer").prepend(`<h1 id="questionNumber">${quizzObject.title}</h1>
                <p id="questionText" class="">${quizzObject.description}</p>
                <ul id="questionList">
                    <li><button id="a1" type="button" class="btn btn-info">${quizzObject.possibleAnswers[0]}</button></li>
                    <li><button id="a2" type="button" class="btn btn-info">${quizzObject.possibleAnswers[1]}</button></li>
                    <li><button id="a3" type="button" class="btn btn-info">${quizzObject.possibleAnswers[2]}</button></li>
                    <li><button id="a4" type="button" class="btn btn-info">${quizzObject.possibleAnswers[3]}</button></li>
                </ul>
                `);
            // Event listeners on 
            $("li").on("click", function () {
                // verifyAnswer()
                var answer = $(this).text();
                if (answer === quizzObject.correctAnswer) {
                    showAlert("Good Job!", "success");
                } else {
                    showAlert("Wrong Answer!", "danger")
                    secondsLeft -= 15;
                }

                clearContent("#questionContainer")
                // alertUser()
                showPage(page + 1);
            })
        } else {
            stopTimer();
            endQuizz();
        }


    };

    function showAlert(str, type) {
        $("#alert").show();

        $("#alert").attr("class", `alert alert-${type}`);
        $("#alert").text(str);
        window.setTimeout(function () {
            $("#alert").hide();
        }, 2000)

    }

    function endQuizz() {

        $("#questionContainer").prepend(`        
            <form>
                <div class="form-group">
                    <input id="textInput" class="form-control mb-2" type="text" placeholder="Put your Name" />
                    <div class="text-right">
                        <button id="btnSubmit" class="btn btn-info" type="submit" value="Submit">Submit</button>
                    </div>
        
                </div>
            </form >
                `);
        // Event Listener on Submit btn to store user score
        $("#btnSubmit").on("click", function (e) {
            e.preventDefault();

            if ($("#textInput").val() === "") {
                showAlert("Come on, I'm sure you have a super name", "danger");
            }
            if (secondsLeft < 0) {
                secondsLeft = 0;
            }
            else {
                var score = {
                    "name": $("#textInput").val(),
                    "score": secondsLeft,
                    "difficulty": "",
                    "date": d,
                };

                saveScore(score);
                // localStorage.setItem("scores", JSON.stringify(scores));
                location.href = "./scoreboard.html";
            }
        })



    };

    function saveScore(name) {
        var localScores = JSON.parse(window.localStorage.getItem("scores")) || [];

        localScores.push(name);

        localStorage.setItem("scores", JSON.stringify(localScores));
    };

    function showHighscores() {
        var scores = JSON.parse(window.localStorage.getItem("scores"));
        scores = sortScores(scores)
        console.log(scores)

        for (i = 0; i < 10; i++) {
            var currentScore = scores[i];

            if (!currentScore) {
                continue;
            }
            $("main").append(`        
            <div class="row">
            <div class="card mb-3 text-center col-12" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${currentScore.name}</h5>
                    <h8 class="card-subtitle mb-2 text-muted">${currentScore.date}</h8>
                    <h1 class="card-text">${currentScore.score}</h1>
                    <a class="card-link">${currentScore.difficulty}</a>
                </div>
            </div>
        </div>
                    `);
        }

    }

    function sortScores(scores) {
        return scores.sort(function (a, b) {
            return b.score - a.score;
        });
    }

});