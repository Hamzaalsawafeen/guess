const inputElement = document.getElementById("inputElement");
const searchButton = document.getElementById("searchButton");
const ageElement = document.getElementById("age");
const genderElement = document.getElementById("gender");
const nameElement = document.getElementById("name");
const countriesElement = document.getElementById("countries");
const imagesElement = document.getElementById("images");

function getName() {
  const nameInput = inputElement.value;
  fetchingData(nameInput);
}

const fetchingData = (myName) => {
  if (myName.includes(" ")) {
    return alert("first name can't have spaces");
  }
  if (myName === "") {
    return alert("please enter name");
  }

  const fetchingCountriesById = (id) => {
    fetch(`https://restcountries.com/v2/alpha/${id}`)
      .then((response) => response.json())
      .then((data) => {
        document.body.innerHTML += `<div><img style="height: 50px; width: 100px; margin: 50px" src=${data.flag} alt=${data.name}> <span>${data.name}</span></div>`;
      });
  };

  nameElement.innerText += myName;
  fetch(`https://api.agify.io/?name=${myName}`)
    .then((response) => response.json())
    .then((data) => (ageElement.innerText += data.age));

  fetch(`https://api.genderize.io/?name=${myName}`)
    .then((response) => response.json())
    .then((data) => (genderElement.innerText += data.gender));

  fetch(`https://api.nationalize.io/?name=${myName}`)
    .then((response) => response.json())
    .then((data) =>
      data.country.map((element) => fetchingCountriesById(element.country_id))
    );
};
