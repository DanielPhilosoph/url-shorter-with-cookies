let usernameInput = document.querySelector("#username");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
emailInput.addEventListener("focus", hideError);
passwordInput.addEventListener("focus", hideError);
usernameInput.addEventListener("focus", hideError);
document.querySelector("#createBtn").addEventListener("click", onClick);

function hideError(event) {
  event.target.parentElement.classList.remove("alert-validate");
}

function onClick(event) {
  event.preventDefault();
  let check = true;
  let emailRegex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
  );
  let regex = new RegExp(/[A - Za - z0 - 9]/);
  if (usernameInput.value === "") {
    check = false;
    usernameInput.parentElement.dataset.validate = "Username is required";
    usernameInput.parentElement.classList.add("alert-validate");
  } else if (regex.test(usernameInput.value)) {
    check = false;
    usernameInput.parentElement.dataset.validate =
      "Username is not valid a-zA-Z0-9";
    usernameInput.parentElement.classList.add("alert-validate");
  } else if (usernameInput.value.length < 3) {
    check = false;
    usernameInput.parentElement.dataset.validate =
      "Username is to short - should be 3 or more";
    usernameInput.parentElement.classList.add("alert-validate");
  }
  if (emailRegex.test(emailInput.value) == false) {
    check = false;
    emailInput.parentElement.classList.add("alert-validate");
  }
  if (passwordInput.value === "") {
    check = false;
    passwordInput.parentElement.dataset.validate = "Password is required";
    passwordInput.parentElement.classList.add("alert-validate");
  } else if (passwordInput.value.length < 8) {
    check = false;
    passwordInput.parentElement.dataset.validate =
      "Password is to short - should be 8 or more";
    passwordInput.parentElement.classList.add("alert-validate");
  }

  if (check) {
    let isAdded = AddUser();
    if (isAdded) {
      location.replace("./index.html");
    } else {
      alert("Huge problem");
    }
  }
}

function AddUser() {}
