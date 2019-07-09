$(document).ready(() => {
  var context;

  //Login
  $('#form-login').submit((e) => {
    e.preventDefault();
    var form = document.getElementById('form-login');
    var formData = new FormData(form);
    loginAjax(formData);
  });
});

function loginAjax(formData){
  $.ajax({
    url: '/dashboard/login',
    type: 'POST',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (response) {
        console.log(response);
        //Dismiss modal
        $('#login-modal').modal('toggle');
        alertMessage('Login successfuly', 'alert-success', 3000);
        //Create cookie
        createCookie("jwt", response.token, 7);
    },
    error: function (err){
        console.log(err);
        alertMessage('Login unsuccessfuly', 'alert-warning', 3000);
    }
});
}

 /* Decode token info */
 function getTokenInfo(ca){
  var base64Url = ca.split('.')[1];
  var decodedValue = JSON.parse(window.atob(base64Url));
  return decodedValue;
}


/* Check if token is valid */
function isValidToken(token){
  if (Date.now() / 1000 > getTokenInfo(token).exp) {
      return false;
  }else{
      return true;
  }
}


// function createCookie(key, value){
//   var cookie = escape(key) + '=' + escape(value) + ';';
//   document.cookie = cookie;
//   console.log('Creating cookie with key: ' + key + ' value: ' + value);
// }

function createCookie(name,value,exdays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  document.cookie=encodeURIComponent(name) 
    + "=" + encodeURIComponent(value)
    + (!exdays ? "" : "; expires="+exdate.toUTCString());
    ;
}


function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function deleteCookie(name){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/* Creates new alert message */
function alertMessage(message, type, timeInMills){
  const alert = document.querySelector('.alert');
  alert.classList.add(type);
  alert.textContent = message;
  alert.style.display='block';
  setTimeout(() => { 
      alert.classList.remove(type);
      alert.textContent = '';
      alert.style.display='none';
  }, timeInMills);
}