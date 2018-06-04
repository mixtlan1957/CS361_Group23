document.addEventListener('DOMContentLoaded', initButtons);
/******************************************************************************
 * initalizes [Student] and [Professional] buttons to display the appropriate
 * signup form
 *****************************************************************************/
function initButtons(){
  var studentbtn = document.querySelector('#studentbtn');
  studentbtn.addEventListener('click', showStudentSignup);
  document.querySelector("#userforms").style.display = "none";

  var professionalbtn = document.querySelector('#professionalbtn');
  professionalbtn.addEventListener('click', showProfessionalSignup);
  document.querySelector("#userformp").style.display = "none";
}

/******************************************************************************
 * displays the student signup form to the user
******************************************************************************/
function showStudentSignup(){
  document.querySelector("#stdorp").style.display = "none";
  document.querySelector("#userforms").style.display = "block";
  document.querySelector("#stdcancel").addEventListener('click', hideInputs);
}

/******************************************************************************
 * displays the professional signup form to the user
******************************************************************************/
function showProfessionalSignup(){
  document.querySelector("#stdorp").style.display = "none";
  document.querySelector("#userformp").style.display = "block";
  document.querySelector("#prfcancel").addEventListener('click', hideInputs);
}

/******************************************************************************
 * cancel button hides the sign up forms and presents the original choice
******************************************************************************/
function hideInputs(){
  document.querySelector("#userforms").style.display = "none";
  document.querySelector('#userformp').style.display = "none"; 
  document.querySelector("#stdorp").style.display = "block";
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


/******************************************************************************
 * generic message display, creates a temporary div in the middle of the 
 * screen to display the passed in content for the passed in length of time.
 *****************************************************************************/
function messageDisplay(content, type, time){
  var message = document.createElement("div");
  var msgId = type;
  message.setAttribute('id', msgId);
  message.textContent = content;
  message.setAttribute('class', 'message');
  document.body.appendChild(message);
  window.setTimeout(removeMessage, time);
}

/******************************************************************************
 * removes the message from the DOM
 *****************************************************************************/
function removeMessage(){
  document.body.removeChild(
    document.querySelector('.message'));
}