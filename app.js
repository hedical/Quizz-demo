$(document).ready(function () {
    // Global scope
    var secondsLeft = 75;
    var scores = JSON.parse(window.localStorage.getItem("scores"))

    var d = new Date();

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

    // Event Listener on Submit btn to store score
    // $("#btnSubmit").on("click", function (e) {
    //     console.log("hello");
    //     e.preventDefault();
    //     storeScore($("#textInput").val());
    //     window.location.href = "./scoreboard.html";
    // })


    $("#alert").hide();



    // Starting timer
    function startTimer() {
        var timerInterval = setInterval(function () {
            secondsLeft--;
            $("#timer").text("Timer : " + secondsLeft + " sec");
            if (secondsLeft < 0) {
                clearInterval(timerInterval);
            }
        }, 1000)
    };

    function stopTimer() {
        clearInterval(secondsLeft);
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

            $("li").on("click", function () {
                // verifyAnswer()
                var answer = $(this).text();
                if (answer === quizzObject.correctAnswer) {
                    showAlert("Good Job!", "success");
                } else {
                    showAlert("Wrong Answer!", "danger")
                    secondsLeft = secondsLeft - 15;
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
                    <input id="textInput" class="form-control mb-2" type="text" placeholder="Put Initials" />
                    <div class="text-right">
                        <button id="btnSubmit" class="btn btn-info" type="submit" value="Submit">Submit</button>
                    </div>
        
                </div>
            </form >
                `);
        $("#btnSubmit").on("click", function (e) {
            e.preventDefault();
            // setScoreObject($("#textInput").val());
            scores.push({
                "initials": $("#textInput").val(),
                "score": secondsLeft,
                "difficulty": "",
                "date": d,
            });
            window.localStorage.setItem("scores", JSON.stringify(scores));
            window.location.href = "./scoreboard.html";
        })

    };



    // function setScoreObject(name) {
    //     var scoresArray = JSON.stringify({
    //         initials: name,
    //         score: secondsLeft,
    //         difficulty: "",
    //         date: "",
    //     })
    // };
});