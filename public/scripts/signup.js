document.addEventListener('DOMContentLoaded', initButtons);
var studentsignupVisible = false;

function initButtons(){
  var studentbtn = document.querySelector('#studentbtn');
  studentbtn.addEventListener('click', loadStudentSignup);
}

function loadStudentSignup(){
  if(!studentsignupVisible){

    document.querySelector("#stdorp").style.display = "none";
    // create elements of student signup form
    var container = document.createElement('div');
    var h1 = document.createElement('h1');
    var studentsignupform = document.createElement('form');
    var studentname = document.createElement('input');
    var username = document.createElement('input');
    var email = document.createElement('input');
    var password = document.createElement('input');
    // set attributes 
    container.setAttribute('class', 'container');
    studentsignupform.setAttribute('action', '/signup');
    studentsignupform.setAttribute('method', 'post');

    // set value attributes
    studentname.setAttribute('type', 'text');
    initInput(studentname, "Student's name");
    username.setAttribute('type', 'text');
    initInput(username, "username");
    email.setAttribute('type', 'email');
    initInput(email, "e-mail");
    password.setAttribute('type', 'password');
    initInput(password, "password");

    h1.textContent = "Create your Student Account";
    // append to the body
    studentsignupform.appendChild(studentname);
    studentsignupform.appendChild(username);
    studentsignupform.appendChild(email);
    studentsignupform.appendChild(password);
    container.appendChild(h1);
    container.appendChild(studentsignupform);
    document.body.appendChild(container);
    studentsignupVisible = true;
  }
}

/******************************************************************************
 * adds the appropriate function to the input box for displaying blur text
 *****************************************************************************/
function initInput(inputBox, value){
  blurInput(inputBox, value);
  switch(value)
  {
    case "Student's name":
      inputBox.setAttribute('onblur', "blurInput(this, 'Students name')");
      break;
    case "username":
      inputBox.setAttribute('onblur', "blurInput(this, 'username')");
      break;
    case "e-mail":
      inputBox.setAttribute('onblur', "blurInput(this, 'e-mail')");
      break;
    case "password":
      inputBox.setAttribute('onblur', "blurInput(this, 'password')");
      break;
      
  }
  inputBox.setAttribute('onfocus', 'focusInput(this)');
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