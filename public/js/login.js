const passwordField = document.getElementById('password');
const chnageText = document.getElementById('changeText');
const showPassword = document.getElementById('showPassword');

showPassword.addEventListener('click' , function (){
  if (passwordField.type === 'password'){
    passwordField.type = 'text';
    chnageText.textContent = 'hide password';
  } else {
    passwordField.type = 'password';
    chnageText.textContent = 'show password';
  }
}) 
