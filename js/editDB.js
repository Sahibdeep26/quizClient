var questionId = localStorage.getItem('questionId')
var question = localStorage.getItem('question')
var option1 = localStorage.getItem('option1')
var option2 = localStorage.getItem('option2')
var option3 = localStorage.getItem('option3')
var option4 = localStorage.getItem('option4')
var answer = localStorage.getItem('answer')

document.getElementById("question").value = question;
document.getElementById("questionId").value = questionId;
document.getElementById("opt1").value = option1;
document.getElementById("opt2").value = option2;
document.getElementById("opt3").value = option3;
document.getElementById("opt4").value = option4;



checkAnswer();
function checkAnswer(){
    if(answer == option1) {
        document.getElementById("checkOption1").checked = true;
    } else if(answer == option2){
            document.getElementById("checkOption2").checked = true;
    } else if(answer == option3){
            document.getElementById("checkOption3").checked = true;
    } else {
        document.getElementById("checkOption4").checked = true;
    }
}




function empty() {
    var questionId =document.getElementById("questionId").value;
    var questionString = document.getElementById("question").value;
    var opt1 = document.getElementById("opt1").value;
    var opt2 = document.getElementById("opt2").value;
    var opt3 = document.getElementById("opt3").value;
    var opt4 = document.getElementById("opt4").value;
    let answerVal = document.getElementsByName('Answer');
    let Answer = 0;
     var answerKey;
    for (let i = 0; i < answerVal.length; i++) {
        if (answerVal[i].checked) {
            // do whatever you want with the checked radio
            Answer = answerVal[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    console.log(questionId)
  
    if(Answer=="1"){
      answerKey = opt1
    }else if(Answer=="2"){
      answerKey = opt2
    }else if(Answer=="3"){
      answerKey = opt3
    }else{
      answerKey = opt4
    }
    console.log(answerKey)
  
    if(questionString == ""){
      alert("Question must be filled out!!!");
      return false;
    }else if((opt1 == "")||(opt2 == "")){
      alert("Please fill Option 1 and Option 2 values!!!");
      return false;
    }else if(Answer==""){
      alert("Provide an answer for your question!!!!")
      return false;
    }else if((opt3 == "undefined")||(opt4 == "undefined")){
        var txt;
/*
    This undefined is coming from the admin.html. 
    Sure I could have if implemented it in a way that when the value is undefined
    then we just don't show the value at all but sometimes, a user can actually put the word undefined as one of the options. 
    I am only check for option 3 and option 4 because with the current front-end, no user can put the option 1 and option 2 as null/empty/undefined.
*/
        var check = confirm("It look like one of the options is undefined. Are you sure you want to update the question???");
        if(check==false){
            txt=alert("Question Not Updated");
            return false;
        }else{
            checkAgain(questionId,questionString, opt1, opt2, opt3, opt4, answerKey);
            window.localStorage.clear();
        }
    }
    else{
      checkAgain(questionId,questionString, opt1, opt2, opt3, opt4, answerKey);
    }
    window.location.href= "./admin.html";
  }
  
function loadFormData(questionId,question, opt1, opt2, opt3, opt4, Answer) {
    
    var xmlhttp = new XMLHttpRequest(); 
    //var url = "http://localhost:8080/question";
    var url = "https://quiz-server-nd8za.ondigitalocean.app/question"
  
    xmlhttp.open("PUT", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({"questionId":questionId,"question": question, "opt1": opt1, "opt2":opt2,"opt3":opt3,"opt4":opt4, "Answer": Answer}));
}
  
function checkAgain(questionId,questionString, opt1, opt2, opt3, opt4, Answer){
    var txt;
    var check = confirm("Are you sure you want to save this question???");
    if(check==false){
      txt=alert("Question Not Saved");
    }else{
      loadFormData(questionId,questionString, opt1, opt2, opt3, opt4, Answer);
    }
}
  

