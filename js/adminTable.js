var xmlhttp = new XMLHttpRequest();
//var url = "http://localhost:8080/question";
var url = "https://quiz-server-nd8za.ondigitalocean.app/question";


window.onload = function() {
	if(!window.location.hash) {
		window.location = window.location + '#loaded';
		window.location.reload();
    start();
	}
}
function start(){
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
    console.log(myArr)
  }
};
xmlhttp.open("GET",  url, true);
xmlhttp.send();
}
function myFunction(arr) {
  var out = "";

  var i;
  console.log(arr);
  for (i = 0; i < arr.length; i++) {    
    out += `
    <tr>
      <th scope="row">${i+1}</th>
        <td>${arr[i].question}</td>
        <td>${arr[i].answer}</td>
        <td>
          <a href="./editQuestion.html?id=${arr[i].questionId}&question=${arr[i].question}&option1=${arr[i].options[0]}&option2=${arr[i].options[1]}&option3=${arr[i].options[2]}&option4=${arr[i].options[3]}&answer=${arr[i].answer}"class="btn border-shadow update" id="updateBtn" data-id="${arr[i].questionId}" onclick='editQuestion("${arr[i].questionId}", "${arr[i].question}", "${arr[i].options[0]}", "${arr[i].options[1]}", "${arr[i].options[2]}", "${arr[i].options[3]}", "${arr[i].answer}")'>
            <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
          </a>
          <a class="btn border-shadow delete"  id="deleteBtn" data-id="${arr[i].questionId}" onclick="checkDelete(${arr[i].questionId})">
            <span class="text-gradient"><i class="fas fa-trash-alt"></i></span>
          </a>
        </td>
    </tr>
    `
  }
  document.getElementById("myTable").innerHTML = out;
}

function checkDelete(questionId){
  var txt;
  var check = confirm("Are you sure you want to delete this question???");
  if(check==false){
    txt=alert("Question Not Deleted");
  }else{
    deleteQuestion(questionId);
  }
}

function deleteQuestion(questionId) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, false);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  const id={
    questionID: `${questionId}`
  };
  xhr.send(JSON.stringify(id)); 
  
  window.location.reload();
}

function editQuestion(questionId, question, opt1,opt2,opt3,opt4, answer) {
  console.log(questionId, question, opt1, opt2, opt3, opt4, answer)
  sessionStorage.setItem("questionId", questionId)
  sessionStorage.setItem("question", question)
  sessionStorage.setItem("option1",opt1)
  sessionStorage.setItem("option2",opt2)
  sessionStorage.setItem("option3",opt3)
  sessionStorage.setItem("option4",opt4)
  sessionStorage.setItem("answer",answer)

}





