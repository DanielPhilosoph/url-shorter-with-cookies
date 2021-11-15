let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
usernameInput.addEventListener("focus", hideError);
passwordInput.addEventListener("focus", hideError);
document.querySelector("#loginBtn").addEventListener("click", onClick);

function hideError(event) {
  event.target.parentElement.classList.remove("alert-validate");
}

function onClick(event) {
  event.preventDefault();
  let check = true;
  if (usernameInput.value === "") {
    check = false;
    usernameInput.parentElement.classList.add("alert-validate");
  }
  if (passwordInput.value === "") {
    check = false;
    passwordInput.parentElement.classList.add("alert-validate");
  }

  if (check) {
    login();
  }
}

async function login() {
  try {
    let response = await axios.post("http://localhost:3000/login", {
      username: usernameInput.value,
      password: passwordInput.value,
    });
    location.replace("./urlshorter.html");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Could not login!",
      footer: `<p>${error.response.data.message}</p>`,
    });
  }
}
