document.addEventListener('DOMContentLoaded', initButtons);

function initButtons(){
  var studentbtn = document.querySelector('#studentbtn');
  studentbtn.addEventListener('click', loadStudentSignup);
  document.querySelector("#userforms").style.display = "none";
  document.querySelector("#studentform").style.display = "none";
  var professionalbtn = document.querySelector('#professionalbtn');
  professionalbtn.addEventListener('click', loadProfessionalSignup);
  document.querySelector("#userformp").style.display = "none";
  document.querySelector("#professionalform").style.display = "none";
}

function loadStudentSignup(){
  document.querySelector("#stdorp").style.display = "none";
  document.querySelector("#userforms").style.display = "block";
  document.querySelector("#addusers").addEventListener('click', showStudentForm);

  document.querySelector("#stdcancel").addEventListener('click', hideInputs);
  
}

function showStudentForm(event){
  document.querySelector("#studentform").style.display = "block";
  event.preventDefault();
}

function showProfessionalForm(event){
  document.querySelector("#professionalform").style.display = "block";
  event.preventDefault();
}

function loadProfessionalSignup(){
  document.querySelector("#stdorp").style.display = "none";
  document.querySelector("#userformp").style.display = "block";
  document.querySelector("#adduserp").addEventListener('click', showProfessionalForm);

  document.querySelector("#prfcancel").addEventListener('click', hideInputs);
  

}

function hideInputs(){
  document.querySelector("#stdorp").style.display = "block";
  document.querySelector("#userforms").style.display = "none";
  document.querySelector("#studentform").style.display = "none";
  document.querySelector('#userformp').style.display = "none"; 
  document.querySelector("#professionalform").style.display = "none";

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