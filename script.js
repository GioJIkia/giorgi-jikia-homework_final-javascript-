//burger მენიუს აწყობა
const burger = document.querySelector(".header-burger-icon");
const xmark = document.querySelector(".header-x-icon");
const menu = document.querySelector(".header-menu");
burger.addEventListener("click", () => {
  burger.style.display = "none";
  xmark.style.display = "block";
  menu.style.left = "0";
});
xmark.addEventListener("click", () => {
  xmark.style.display = "none";
  burger.style.display = "block";
  menu.style.left = "-100%";
});

//dark და ligh mode-ის გაკეთება
const darkBtn = document.getElementById("dark-mode-button");
const myContainer = document.querySelector(".container");
let themeValue = "white";

darkBtn.addEventListener("click", () => {
  if (themeValue === "white") {
    themeValue = "black";
    darkBtn.textContent = "light mode";
  } else {
    themeValue = "white";
    darkBtn.textContent = "dark mode";
  }
  localStorage.setItem("theme", themeValue);
  myContainer.style.backgroundColor = themeValue;
});

function checkTheme() {
  themeValue = localStorage.getItem("theme");
  if (themeValue === "black") {
    myContainer.style.backgroundColor = "black";
    darkBtn.textContent = "light mode";
  } else {
    myContainer.style.backgroundColor = "white";
    darkBtn.textContent = "dark mode";
  }
}

checkTheme();

//სლაიდერი პირველი გვერდი

// იუზერ აიქონზე დაჭერისას ფორმაზე გადმოყვანა
const userIcon = document.querySelector(".user-icon");
userIcon.addEventListener("click", () => {
  window.location.href = "contact.html";
});

//ფორმის ვალიდაციები
const myForm = document.getElementById("my-form");
const formBtn = document.querySelector(".page-3-section-form-button");
const erorMsgFullName = document.querySelector(".error-msg-fullName");
const erorMsgEmail = document.querySelector(".error-msg-email");
const erorMsgTelephone = document.querySelector(".error-msg-telephone-number");
const erorMsgText = document.querySelector(".error-msg-more-details");

formBtn.addEventListener("click", (element) => {
  element.preventDefault();
  const formData = new FormData(myForm);

  for (let userInformation of formData.entries()) {
    console.log(userInformation);
  }

  const fullName = formData.get("fullName");
  const hasNumbers = /\d/; //ციფრის გადამოწმების მიზნით
  if (!fullName || fullName.trim() === "" || hasNumbers.test(fullName)) {
    erorMsgFullName.style.display = "block";
    erorMsgFullName.textContent = "fullName is required";
    // return;
  }

  const email = formData.get("Email");
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //იმაილის სწორად შეყვანის მიზნით
  if (!email || email.trim() === "" || !checkEmail.test(email)) {
    erorMsgEmail.style.display = "block";
    erorMsgEmail.textContent = "Email is required";
    // return;
  }

  const telephoneNumber = formData.get("Telephone-number");
  if (
    !telephoneNumber ||
    telephoneNumber.trim() === "" ||
    telephoneNumber.length !== 9 ||
    !hasNumbers.test(telephoneNumber)
  ) {
    erorMsgTelephone.style.display = "block";
    erorMsgTelephone.textContent = "Telephone number is required";
  }

  const moreDetailsText = formData.get("more-details");
  if (
    !moreDetailsText ||
    moreDetailsText.trim() === "" ||
    moreDetailsText.length !== 10
  ) {
    erorMsgText.style.display = "block";
    erorMsgText.textContent = "More details is required";
  }
});
