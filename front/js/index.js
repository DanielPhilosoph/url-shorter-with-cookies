let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
emailInput.addEventListener("focus", hideError);
passwordInput.addEventListener("focus", hideError);
document.querySelector("#loginBtn").addEventListener("click", onClick);

function hideError(event) {
  event.target.parentElement.classList.remove("alert-validate");
}

function onClick(event) {
  event.preventDefault();
  let emailRegex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
  );
  console.log(emailInput.parentElement);
  if (emailRegex.test(emailInput.value) == false) {
    emailInput.parentElement.classList.add("alert-validate");
  }
  if (passwordInput.value === "") {
    passwordInput.parentElement.classList.add("alert-validate");
  }
}
