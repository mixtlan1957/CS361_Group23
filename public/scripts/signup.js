document.addEventListener('DOMContentLoaded', initButtons);
var studentsignupVisible = false;
var professionalsignupVisible = false;

function initButtons(){
  var studentbtn = document.querySelector('#studentbtn');
  studentbtn.addEventListener('click', loadStudentSignup);
  var professionalbtn = document.querySelector('#professionalbtn');
  professionalbtn.addEventListener('click', loadProfessionalSignup);
}

function loadStudentSignup(){
  hideInputs();
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
    var cancel = document.createElement('button');
    var signup = document.createElement('input');
    // set attributes 
    container.setAttribute('class', 'container');
    container.setAttribute('id', 'studentform');
    cancel.setAttribute('class', 'btn btn-warning');
    cancel.textContent = 'cancel';
    signup.setAttribute('type', 'submit');
    signup.setAttribute('class', 'btn btn-success');
    studentsignupform.setAttribute('action', '/signup');
    studentsignupform.setAttribute('method', 'post');

    // set value attributes
    studentname.setAttribute('type', 'text');
    initInput(studentname, "Student's name");
    username.setAttribute('type', 'text');
    username.setAttribute('name', 'username');
    initInput(username, "username");
    email.setAttribute('type', 'email');
    initInput(email, "e-mail");
    password.setAttribute('type', 'password');
    initInput(password, "password");
    signup.setAttribute('value', 'Signup');
    signup.setAttribute('name', 'student_signup');

    h1.textContent = "Create your Student Account";
    // append to the body
    studentsignupform.appendChild(studentname);
    studentsignupform.appendChild(username);
    studentsignupform.appendChild(email);
    studentsignupform.appendChild(password);
    studentsignupform.appendChild(signup);
    cancel.addEventListener('click', hideInputs);
    container.appendChild(h1);
    container.appendChild(studentsignupform);
    container.appendChild(cancel);
    document.body.appendChild(container);
    studentsignupVisible = true;
  } else {
    document.querySelector("#studentform").style.display = "block";
    document.querySelector("#stdorp").style.display = "none";
  }
}

function loadProfessionalSignup(){
  hideInputs();
  if(!professionalsignupVisible){
    document.querySelector("#stdorp").style.display = "none";
    // create elements of student signup form
    var container = document.createElement('div');
    var h1 = document.createElement('h1');
    var professionalsignupform = document.createElement('form');
    var professionalname = document.createElement('input');
    var company = document.createElement('input');
    var username = document.createElement('input');
    var email = document.createElement('input');
    var password = document.createElement('input');
    var cancel = document.createElement('button');
    var signup = document.createElement('input');
    // set attributes 
    container.setAttribute('class', 'container');
    container.setAttribute('id', 'professionalform');
    cancel.setAttribute('class', 'btn btn-warning');
    cancel.textContent = 'cancel';
    signup.setAttribute('type', 'submit');
    signup.setAttribute('class', 'btn btn-success');
    professionalsignupform.setAttribute('action', '/signup');
    professionalsignupform.setAttribute('method', 'post');

    // set value attributes
    professionalname.setAttribute('type', 'text');
    initInput(professionalname, "Professional's name");
    company.setAttribute('type', 'text');
    initInput(company, "Company");
    username.setAttribute('type', 'text');
    username.setAttribute('name', 'username');
    initInput(username, "username");
    email.setAttribute('type', 'email');
    initInput(email, "e-mail");
    password.setAttribute('type', 'password');
    initInput(password, "password");
    signup.setAttribute('value', 'Signup');
    signup.setAttribute('name', 'professional_signup');

    h1.textContent = "Create your Professional Account";
    // append to the body
    professionalsignupform.appendChild(professionalname);
    professionalsignupform.appendChild(company);
    professionalsignupform.appendChild(username);
    professionalsignupform.appendChild(email);
    professionalsignupform.appendChild(password);
    professionalsignupform.appendChild(signup);
    cancel.addEventListener('click', hideInputs);
    container.appendChild(h1);
    container.appendChild(professionalsignupform);
    container.appendChild(cancel);
    document.body.appendChild(container);
    professionalsignupVisible = true;
  } else {
    document.querySelector("#professionalform").style.display = "block";
    document.querySelector("#stdorp").style.display = "none";
  }
}

function hideInputs(){
  if(document.querySelector("#studentform"))
  {
    document.querySelector("#studentform").style.display = "none";
  }
  if(document.querySelector("#professionalform"))
  {
    document.querySelector('#professionalform').style.display = "none"; 
  }
  document.querySelector("#stdorp").style.display = "block";
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
    case "Company":
      inputBox.setAttribute('onblur', "blurInput(this, 'Company')");
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