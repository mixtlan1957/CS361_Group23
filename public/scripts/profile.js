document.addEventListener('DOMContentLoaded', initInputs);

function initInputs(){
  console.log('profile js');
  var inputs = document.getElementsByTagName('input');

  for(var i = 0; i < inputs.length; i++){
    console.log('i: ' + inputs[i] );
    inputs[i].addEventListener('dblclick', function(){
      inputs[i].removeAttribute("diabled");
    });
  }

}