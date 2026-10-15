import "./styles.css";

const email = document.getElementById("email");
const country = document.getElementById("country");
const postcode = document.getElementById("postcode");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

// email functionality

const checkEmail = function () {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Please format as such: email@example.com");
  } else {
    email.setCustomValidity("");
  }
};

email.addEventListener("input", () => {
  checkEmail();
  email.reportValidity();
});

// country functionality

const checkCountry = function () {
  if (country.value === "") {
    country.setCustomValidity("select a country");
  } else {
    country.setCustomValidity("");
    postcode.disabled = false;
  }
  country.reportValidity();
};

country.addEventListener("change", () => {
  checkCountry();
});

// postcode functionality

const checkPostcode = function () {
  const constraints = {
    ch: ["^(CH-)?\\d{4}$", "Do swiss correctly thx"],
    fr: ["^(F-)?\\d{5}$", "Do french correctly thx"],
    de: ["^(D-)?\\d{5}$", "Do german correctly thx"],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Do netherlands correctly thx",
    ],
  };

  let currentCountry = country.value;
  console.log("test" + currentCountry);
  let currentRegex = new RegExp(constraints[currentCountry][0], "");

  if (currentRegex.test(postcode.value)) {
    postcode.setCustomValidity("");
  } else {
    postcode.setCustomValidity(`${constraints[currentCountry][1]}`);
  }
  postcode.reportValidity();
};

postcode.addEventListener("input", () => {
  checkPostcode();
});

// password functionality

const checkPassword = function () {
  const passwordRegex = new RegExp("^(?=(?:.*\\d){3,}).{8,20}$", "");

  if (!passwordRegex.test(password.value)) {
    if (password.value.length < 8 || password.value.length > 20) {
      password.setCustomValidity("password must be 8-20 chars");
    } else if (!new RegExp("^(?=(?:.*\\d){3,})").test(password.value)) {
      password.setCustomValidity("password must have at least 3 numbers");
    }
    passwordConfirmation.disabled = true;
  } else {
    password.setCustomValidity("");
    passwordConfirmation.disabled = false;
  }
  password.reportValidity();
};

password.addEventListener("input", () => {
  checkPassword();
});

// password confirmation functionality

const checkPasswordConfirmation = function () {
  if (!(password.value === passwordConfirmation.value)) {
    passwordConfirmation.setCustomValidity("passwords do not match!");
  } else {
    passwordConfirmation.setCustomValidity("");
  }
  passwordConfirmation.reportValidity();
};

passwordConfirmation.addEventListener("input", () => {
  checkPasswordConfirmation();
});
