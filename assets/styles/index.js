const api = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const searchInput = document.getElementById('search-value')
let currentIndex = 0
let drinks = []

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    drinks = data.drinks

    displayDrinks()
    setInterval(() => {
      currentIndex = (currentIndex + 1) % drinks.length
      displayDrinks()
    }, 5000)
  })
  .catch((error) => console.error('Error fetching data:', error))

function displayDrinks() {
  const drinksContainer = document.getElementById('result')
  drinksContainer.innerHTML = `
            <h2>${drinks[currentIndex].strDrink}</h2>
            <img src="${drinks[currentIndex].strDrinkThumb}" alt="${drinks[currentIndex].strDrink}" style="max-width: 100%;" class="img" id="apiImg">
            <div class="popup" id="instructionsPopup">${drinks[currentIndex].strInstructions}</div>
        `

  const img = document.getElementById('apiImg')
  const popup = document.getElementById('instructionsPopup')

  img.addEventListener('mouseover', function () {
    popup.classList.add("show")
  })

  img.addEventListener('mouseout', function () {
    popup.classList.remove('show')
  })
}

next.addEventListener('click', () => {
  currentIndex++

  if (currentIndex > result.length) {
    currentIndex = result.length
  }

  displayDrinks()
})

prev.addEventListener('click', () => {
  currentIndex--

  if (currentIndex < 0) {
    currentIndex = 1
  }

  displayDrinks()
})
