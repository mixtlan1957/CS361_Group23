document.addEventListener('DOMContentLoaded', initButtons);

function initButtons(){
  var studentbtn = document.querySelector('#studentbtn');
  studentbtn.addEventListener('click', loadStudentSignup);
  document.querySelector("#studentform").style.display = "none";
  var professionalbtn = document.querySelector('#professionalbtn');
  professionalbtn.addEventListener('click', loadProfessionalSignup);
  document.querySelector("#professionalform").style.display = "none";

}

function loadStudentSignup(){
  document.querySelector("#stdorp").style.display = "none";
  document.querySelector("#studentform").style.display = "block";
  document.querySelector("#stdcancel").addEventListener('click', hideInputs);
}

function loadProfessionalSignup(){
  document.querySelector("#stdorp").style.display = "none";
  document.querySelector("#professionalform").style.display = "block";
  document.querySelector("#prfcancel").addEventListener('click', hideInputs);

}

function hideInputs(){
  document.querySelector("#stdorp").style.display = "block";
  document.querySelector("#studentform").style.display = "none";
  document.querySelector('#professionalform').style.display = "none"; 
}

/******************************************************************************
 *blur shows the original text value
 *****************************************************************************/
function blurInput(input, content){
  input.setAttribute('value', content);
}

/******************************************************************************
 * removes text when input is in focus
 *****************************************************************************/
function focusInput(input){
  input.setAttribute('value', '');
}


function blurNumInput(input, content){
  input.setAttribute("type", "text");
  blurInput(input, content);
}

/******************************************************************************
 * removes text when input is in focus
 *****************************************************************************/
function focusNumInput(input){
  input.setAttribute("type", "number");
  focusInput(input);
}