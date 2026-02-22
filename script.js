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
//ფილტრაციის აწქყობა
const nameInput = document.getElementById("name-search");
const categorySelect = document.getElementById("category-filter");
const priceInput = document.getElementById("price-range");
const priceLabel = document.getElementById("price-value");
const productContainer = document.getElementById("products-container");

let allProducts = [];

if (productContainer) {
  fetch("https://fakestoreapi.com/products?limit=9")
    .then((res) => res.json())
    .then((products) => {
      allProducts = products;
      renderProducts(allProducts); // საწყისი ჩვენება
      allProducts.forEach((product) => {
        updateProductPrice(product.id, product.price);
      });
    });
}

// ივენთების მიბმა - თუ არსებობს ელემენტები

if (nameInput && categorySelect && priceInput) {
  nameInput.addEventListener("input", filterAll);
  categorySelect.addEventListener("change", filterAll);
  priceInput.addEventListener("input", filterAll);
}

// მთავარი ფილტრაციის ფუნქცია
function filterAll() {
  const searchTerm = nameInput.value.toLowerCase(); //დიდი ასოებიც რომ წაიკითხოს
  const selectedCategory = categorySelect.value;
  const maxPrice = Number(priceInput.value); //რიცხვად გადაქცევა

  // ფასის მნიშვნელობის განახლება მითითებული ფასით
  priceLabel.textContent = maxPrice;

  // ფილტრაციის ჯაჭვი
  const filtered = allProducts.filter((product) => {
    const includesName = product.title.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const selectedPrice = product.price <= maxPrice;

    return includesName && matchesCategory && selectedPrice; //თუ სამივე სრულდება დარჩება სიაში
  });

  renderProducts(filtered);
}
// პროდუქტების ეკრანზე გამოტანის და ქარდებში ჩასმის ფუნქცია
function renderProducts(productsList) {
  const productContainer = document.getElementById("products-container");
  let html = "";

  productsList.forEach((product) => {
    //10%-ით ვზრდი ფასს
    const increasedPrice = (product.price * 1.1).toFixed(1);
    html =
      html +
      `
      <article id="product-${product.id}" class="page-2-products-catalog-card">
        <div class="page-2-products-catalog-card-image-box">
          <img src="${product.image}" alt="${product.title}" class="page-2-products-catalog-card-image" />
        </div>
        <div class="page-2-products-catalog-card-title-price-and-button-container">
          <h2 class="page-2-products-catalog-card-title">${product.title.slice(0, 9)}</h2>
          <div class="page-2-products-catalog-card-price-and-button-container">
            <h3 class="page-2-products-catalog-card-price">$${increasedPrice}</h3>
            <button class="page-2-products-catalog-card-button">
              <img src="./images/cart-icon-button.svg" alt="cart" />
            </button>
          </div>
        </div>
      </article>`;
  });
  if (html === "") {
    productContainer.innerHTML = "<p>No products found...</p>";
    productContainer.style.color = "var(--primary-coror-bright-cyan)";
  } else {
    productContainer.innerHTML = html;
  }
}

//პროდუქტის ფასის გაძვირების ფუნქცია 10%-ით
function updateProductPrice(productId, oldPrice) {
  fetch(`https://fakestoreapi.com/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price: (oldPrice * 1.1).toFixed(1), //დამრგვალება წერტილის მერე ერთ ციფრზე
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(`product ${productId} Updated:`, data.price));
}

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
      console.log(userData);
    }
  });
}
