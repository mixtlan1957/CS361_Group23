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
/******************************************************************************
 * when a Student selects signup, the create user form is shown first.
 * when a user creates their user, the SQL query is sent to create the user
 * and insert the user into the database so that the user ID can be queried
 * and the student fields added apporopirately      
******************************************************************************/
function loadStudentSignup(){
  document.querySelector("#stdorp").style.display = "none";
  document.querySelector("#userforms").style.display = "block";
  document.querySelector("#addusers").addEventListener('click', showStudentForm);

  document.querySelector("#stdcancel").addEventListener('click', hideInputs);
  
}


/******************************************************************************
 * builds user object from the username, email, and password inputs
 *                 
******************************************************************************/
function getUserFields(){
  var user = {};
  user.username = document.querySelector("#username").value;
  user.email = document.querySelector("#email").value;
  user.password = parseInt(document.querySelector("#password").value);
  return user;
}


/******************************************************************************
 * submitUser sends a POST request to sign up the user (INSERT the username
 * email and password into the DB)
******************************************************************************/
function submitUser(){
  var req = new XMLHttpRequest();
  var user = getUserFields();
  req.open("POST", "/signup/user", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      var results = JSON.parse(req.responseText);
      messageDisplay('Welcome ' + user.username + '!', 'successmsg', 1000);
    } else {
      console.log('unable to add user');
    }
  });
  req.send(JSON.stringify(user));
}



function showStudentForm(event){
  event.preventDefault();
  submitUser();
  document.querySelector("#studentform").style.display = "block";
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