let btn = document.querySelector("button");
btn.addEventListener("click", () => {
    validation();
});
const Password = document.getElementById('pass');
const userName = document.getElementById('userName');
const errorMessages = document.getElementById("responseMessage");


function validation() {

  if (!userName.value || !Password.value) {
     errorMessages.innerText = "All Fields are Required";
     errorMessages.classList.add("resp")
      userName.value = '';
      Password.value = '';
      
  } else {
      login();
      userName.value = '';
      Password.value = '';
  }
}

async function login(){
  const loginDetails = {
      username: userName,
      password: Password,
  };

  try {
      const resp = await fetch('https://6538e36aa543859d1bb22255.mockapi.io/api/v1/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginDetails),
      });

      if (resp.ok) {
          const responseData = await resp.json();

          if (responseData.success) {
              alert('Login successful!');
              window.location.href("./index.html");
          } else {
              errorMessages.innerText = 'Invalid username or password.';
          }
      } else {
         
          errorMessages.innerText = 'An error occurred. Please try again.';
      }
  } catch (error) {
     
      console.error('Error:', error);
      errorMessages.innerText = 'An error occurred. Please try again.';
  }
}
  

