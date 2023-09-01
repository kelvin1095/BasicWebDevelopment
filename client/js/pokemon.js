function formNameDisplay(form) {
  let formDisplay = "";
  if (form !== null) {
    formDisplay = "(" + form + ")";
  }
  return formDisplay;
}

function displayPokemonInfo(data, index) {
  const resultElement = document.getElementById("pokemonResult");
  const displayInfo = `
  <div id="pokemonDisplay">
    <div id="pokemonTitle">
      <h3>#${data[index].pokedexnumber.toString().padStart(4, "0")} ${data[index].name} ${formNameDisplay(
    data[index].form
  )}</h3>
    </div>
    <div id="pokemonImage">
      <img
        src="/public/pokemonAssets/PokemonHome/${data[index].pokemonimagefilename}"
        alt="${data[index].name}"
        height="512px"
        width="512px"
      />
    </div>
    <div id="buttonContainer"></div>
    <div id="pokemonType" class="infoTable">
    <table>
      <thead>
        <tr>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>    
            <div id="type1">${data[index].type1}</div>
            <div id="type2">${data[index].type2 || ""}</div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div id="pokemonInfo" class="infoTable">
      <table>
        <thead>
          <tr>
            <th>Height</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${data[index].height} m</td>
            <td>${data[index].weight} kg</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="pokemonAbility" class="infoTable">
      <table>
        <thead>
          <tr>
            <th>Ability 1</th>
            <th>Ability 2</th>
            <th>Hidden Ability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${data[index].ability1}</td>
            <td>${data[index].ability2 || ""}</td>
            <td>${data[index].hiddenability || ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="pokemonStats" class="infoTable">
      <table>
        <thead>
          <tr>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Sp. Atk</th>
            <th>Sp. Def</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${data[index].hp}</td>
            <td>${data[index].att}</td>
            <td>${data[index].def}</td>
            <td>${data[index].spa}</td>
            <td>${data[index].spd}</td>
            <td>${data[index].spe}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  resultElement.innerHTML = displayInfo;
  createButtons(data.length);
  document.getElementById("pokemon-select").value = "";
}

function createButtons(numButtons) {
  const container = document.getElementById("buttonContainer");

  for (let i = 1; i <= numButtons; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("changeFormButton");
    button.addEventListener("click", function () {
      displayPokemonInfo(appData, i - 1);
    });
    container.appendChild(button);
  }
}

document.getElementById("selectPokemon").addEventListener("submit", async function (event) {
  event.preventDefault();
  const selectedValue = document.getElementById("pokemon-select").value;

  const response = await fetch(`/get-data?selectedValue=${selectedValue}`);
  const data = await response.json();

  if (data.length === 0) {
    alert("No results found. Please check spelling");
    return;
  }

  window.appData = data;

  displayPokemonInfo(data, 0);
});

document.getElementById("selectType").addEventListener("submit", async function (event) {
  event.preventDefault();
  const selectedValue1 = document.getElementById("type-select-primary").value;
  const selectedValue2 = document.getElementById("type-select-secondary").value;

  const response = await fetch(`/get-data-type?selectedValue1=${selectedValue1}&selectedValue2=${selectedValue2}`);
  const data = await response.json();

  const resultElement = document.getElementById("typeResult");
  resultElement.innerHTML = "";
  const ul = document.createElement("ul");
  data.map(({ pokedexnumber, name }) => {
    const li = document.createElement("li");
    li.textContent = `#${pokedexnumber.toString().padStart(4, "0")} - ${name}`;
    ul.appendChild(li);
  });
  resultElement.appendChild(ul);
});
