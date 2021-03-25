var questionId = sessionStorage.getItem('questionId')
var question = sessionStorage.getItem('question')
var option1 = sessionStorage.getItem('option1')
var option2 = sessionStorage.getItem('option2')
var option3 = sessionStorage.getItem('option3')
var option4 = sessionStorage.getItem('option4')
var ans = sessionStorage.getItem('answer')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
console.log(queryString)

checkQuesData();
function checkQuesData(){
  //ID
  if(document.getElementById("questionId").value==""){
    const questionId = urlParams.get('id')
    document.getElementById("questionId").value = questionId;
    console.log(questionId)
  }else{
    document.getElementById("questionId").value = questionId;
  }

  //Question
  if(document.getElementById("question").value==""){
    const question = urlParams.get('question')
    document.getElementById("question").value = question;
  }else{
    document.getElementById("question").value = question;
  }

  //Option-1
  if(document.getElementById("opt1").value ==""){
    const option1 = urlParams.get('option1')
    document.getElementById("opt1").value = option1;
  }else{
    document.getElementById("opt1").value = option1;
  }

  //Option-2
  if(document.getElementById("opt2").value ==""){
    const option2 = urlParams.get('option2')
    document.getElementById("opt2").value = option2;
  }else{
    document.getElementById("opt2").value = option2;
  }

  //Option-3
  if(document.getElementById("opt3").value ==""){
    const option3 = urlParams.get('option3')
    document.getElementById("opt3").value = option3;
  }else{
    document.getElementById("opt3").value = option3;
  }

  //Option-4
  if(document.getElementById("opt4").value ==""){
    const option4 = urlParams.get('option4')
    document.getElementById("opt4").value = option4;


  }else{
    document.getElementById("opt4").value = option4;
  }
  if(ans == ""){
    const answer = urlParams.get('answer')
    checkAnswer(answer)
  }else{
    checkAnswer(ans);
  }
}

function getBack(){
  window.sessionStorage.clear();
}

function checkAnswer(answer){
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
            window.sessionStorage.clear();
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
  

