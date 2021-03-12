let xhr = new XMLHttpRequest(); // фетч работает пока не везде.
let app = "https://script.google.com/macros/s/AKfycbzUElGeDkGB82YeyaxXr1ZvDAuss7fVFJjCg8PGj5uBC4wmgF7DnxK0lA/exec?mode=links"; // ссылка на веб-приложение, опубликованное на основе гугловского скрипта с параметром для получения только данных о ссылках.

let firstLecturesElememt = document.getElementById("list-lectures-1");
let firstQuestionsElememt = document.getElementById("link-questions-test-1");
let firstHomeworkElememt = document.getElementById("link-homework-1");
let secondLecturesElememt = document.getElementById("list-lectures-2");
let secondQuestionsElememt = document.getElementById("link-questions-test-2");
let secondHomeworkElememt = document.getElementById("link-homework-2");
let secondExamQuestionsElememt = document.getElementById("link-questions-exam-2");

xhr.open('GET', app);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 0 || xhr.readyState === 1 || xhr.readyState === 2 || xhr.readyState === 3) {
        return;
    }
    
    if (xhr.readyState === 4 && xhr.status === 200) {
        //console.log("Loaded. Ok.");
        try {
            let response = JSON.parse(xhr.responseText);
            
            let output = "";
            let lectures = response.links.semesterFirstLectures;
            for (var i = 0; i < lectures.length; i++) {
                output += "<li><a href=\"" + lectures[i].link + "\">" + lectures[i].name + "</a></li>";
            }
            //console.log("firstLecturesElememt: " + output);
            firstLecturesElememt.innerHTML = output;
            //console.log("firstQuestionsElememt: " + response.links.semesterFirstQuestionsTest);
            firstQuestionsElememt.href = response.links.semesterFirstQuestionsTest;
            //console.log("firstHomeworkElememt: " + response.links.semesterFirstHomework);
            firstHomeworkElememt.href = response.links.semesterFirstHomework;
            
            output = "";
            lectures = response.links.semesterSecondLectures;
            for (var i = 0; i < lectures.length; i++) {
                output += "<li><a href=\"" + lectures[i].link + "\">" + lectures[i].name + "</a></li>";
            }
            //console.log("secondLecturesElememt: " + output);
            secondLecturesElememt.innerHTML = output; 
            //console.log("secondQuestionsElememt: " + response.links.semesterSecondQuestionsTest);
            secondQuestionsElememt.href = response.links.semesterSecondQuestionsTest;
            //console.log("secondHomeworkElememt: " + response.links.semesterSecondHomework);
            secondHomeworkElememt.href = response.links.semesterSecondHomework;
            //console.log("secondExamQuestionsElememt: " + response.links.semesterSecondQuestionsExam);
            secondExamQuestionsElememt.href = response.links.semesterSecondQuestionsExam;
        } catch(e) {
            console.log("Error. " + e);
            console.log(xhr.responseText);
        }
    }
};
xhr.send();