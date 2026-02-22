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

//პროდუქტების წამოღება და ქარდებში ჩასმა

fetch("https://fakestoreapi.com/products?limit=9")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("products-container");
    if (container) {
      let allCardPage2 = "";
      products.forEach((product) => {
        //ქარდების დამატება ცვლადში
        allCardPage2 =
          allCardPage2 +
          `
              <article id = "product-${product.id}" class="page-2-products-catalog-card">
                    <div class="page-2-products-catalog-card-image-box">
                        <img
                            src="${product.image}"
                            alt="${product.title}"
                            class="page-2-products-catalog-card-image"
                        />
                    </div>
                    <div class="page-2-products-catalog-card-title-price-and-button-container">
                        <h2 class="page-2-products-catalog-card-title">${product.title.slice(0, 9)}...</h2>
                        <div class="page-2-products-catalog-card-price-and-button-container">
                            <h3 class="page-2-products-catalog-card-price">$${product.price}</h3>
                            <button class="page-2-products-catalog-card-button">
                                <img
                                    src="./images/cart-icon-button.svg"
                                    alt="shopping-white-cart-icon"
                                />
                            </button>
                        </div>
                    </div>
                </article>
            `;
      });
      container.innerHTML = allCardPage2;
    }
  });

//სლაიდერის აწყობა წამოღებული პროდუქტებით
fetch("https://fakestoreapi.com/products?limit=9")
  .then((res) => res.json())
  .then((products) => {
    const page1SectionContainer = document.querySelector(".page-1-section-1");
    if (page1SectionContainer) {
      let myImageArrays = products.map((product) => product.image);
      let currentIndex = 0;
      let autoSlide = "";

      const myImg = document.getElementById("page-1-slider-image");
      const prevBtn = document.querySelector(".page-1-slider-previous-button");
      const sliderLink = document.getElementById("slider-link");
      const nextBtn = document.querySelector(".page-1-slider-next-button");
      //საწყისი ფოტოს გამოტანა
      myImg.src = myImageArrays[currentIndex];

      function updateSlider() {
        // 1. სურათის განახლება
        myImg.src = products[currentIndex].image;
        // 2. ლინკის განახლება (მივუთითებთ იმ ID-ს, რომელიც ქარდს მივეცით)
        sliderLink.href = `./catalog.html#product-${products[currentIndex].id}`;
        startTimer();
      }

      // ტაიმერის მართვის ფუნქცია
      function startTimer() {
        clearTimeout(autoSlide); // ძველის გაუქმება (დუბლირების თავიდან ასაცილებლად)
        autoSlide = setTimeout(nextSlide, 3000);
      }

      // ფუნქცია, რომელიც გადართავს შემდეგ სურათზე
      function nextSlide() {
        currentIndex++;
        if (currentIndex >= products.length) {
          currentIndex = 0;
        }
        updateSlider();
      }
      // წინა სურათზე გადასვლა
      function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = products.length - 1;
        }
        updateSlider();
      }

      // ღილაკებზე მიბმა
      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);

      // საწყისი გაშვება
      updateSlider();
    }
  });

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

if (myForm && formBtn) {
  formBtn.addEventListener("click", (element) => {
    element.preventDefault(); //რეფრეშის გათიშვა

    const formData = new FormData(myForm);
    let isValid = true; //ცვლადი კონტროლისთვის რამდენად სწორია ინფორმაცია

    const fullName = formData.get("fullName");
    const email = formData.get("Email");
    const telephoneNumber = formData.get("Telephone-number");
    const moreDetailsText = formData.get("more-details");
    const hasNumbers = /\d/; //ციფრის გადამოწმების მიზნით

    // ვალიდაცია: თუ რომელიმე ველი არასწორია, isValid ხდება false
    if (!fullName || fullName.trim() === "" || hasNumbers.test(fullName)) {
      erorMsgFullName.style.display = "block";
      erorMsgFullName.textContent = "fullName is required";
      isValid = false;
    }

    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "" || !checkEmail.test(email)) {
      erorMsgEmail.style.display = "block";
      erorMsgEmail.textContent = "Email is required";
      isValid = false;
    }

    if (
      !telephoneNumber ||
      telephoneNumber.trim() === "" ||
      telephoneNumber.length !== 9
    ) {
      erorMsgTelephone.style.display = "block";
      erorMsgTelephone.textContent = "9 digits required";
      isValid = false;
    }
    if (
      !moreDetailsText ||
      moreDetailsText.trim() === "" ||
      moreDetailsText.length < 10
    ) {
      erorMsgText.style.display = "block";
      erorMsgText.textContent = "Min 10 characters required";
      isValid = false;
    }

    // 2. შენახვა მოხდება მხოლოდ მაშინ, თუ isValid არის true
    if (isValid) {
      const userData = {
        name: fullName,
        email: email,
        phone: telephoneNumber,
        details: moreDetailsText,
      };

      sessionStorage.setItem("userinformation", JSON.stringify(userData)); //JSON.stringify გვჭირდება სტრინგად გამოსატანად
      alert("ინფორმაცია წარმატებით შეინახა!");
    }
  });
}
