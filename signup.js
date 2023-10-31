const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const userName = document.getElementById('username');
const Email = document.getElementById('email');
const Gender = document.getElementById('gender');
const tele = document.getElementById('phone');
const Password = document.getElementById('pass');
const input = document.querySelector("input");
const errorMessages = document.getElementById("responseMessage")
let btn = document.querySelector("button");
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    validation();
});

async function signup() {

    const loginData = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: Email.value,
        gender: Gender.value,
        phone: tele.value,
        password: Password.value,
        username: userName.value,
    };

    try {
        const resp = await fetch('https://6538e36aa543859d1bb22255.mockapi.io/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (resp.ok) {
            let result = await resp.json();
            console.log(result);
            alert("User profile created");
            window.location.href = 'login.html';
        } else {
            alert("There was a problem creating the user");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
function validation() {

    if (!userName.value || !Password.value || !firstName.value || !lastName.value || !Email.value || !Gender.value || !tele.value) {
       errorMessages.innerText = "All Fields are Required";
       errorMessages.classList.add("resp")
        userName.value = '';
        Password.value = '';
        firstName.value = '';
        lastName.value = '';
        Email.value = '';
        Gender.value = '';
        tele.value = '';
        Password.value = '';
    } else {
        signup();
         userName.value = '';
        Password.value = '';
        firstName.value = '';
        lastName.value = '';
        Email.value = '';
        Gender.value = '';
        tele.value = '';
        Password.value = '';
    }
}


