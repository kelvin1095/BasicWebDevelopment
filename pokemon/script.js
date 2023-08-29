document.getElementById("selectPokemon").addEventListener("submit", async function (event) {
  event.preventDefault();
  const selectedValue = document.getElementById("pokemon-select").value;

  const response = await fetch(`/get-data?selectedValue=${selectedValue}`);
  const data = await response.json();

  if (data.length === 0) {
    alert("No results found. Please check spelling");
    return;
  }

  const resultElement = document.getElementById("pokemonResult");
  const displayInfo = `
  <div id="pokemonDisplay">
  <div id="pokemonTitle">
    <h3>#${data[0].pokedexnumber.toString().padStart(4, "0")} ${data[0].name}</h3>
  </div>
  <div id="pokemonImage">
    <img
      src="/pokemonAssets/PokemonHome/${data[0].pokemonimagefilename}"
      alt="Bulbasaur"
      width="512px"
    />
  </div>
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
          <div id="type1">${data[0].type1}</div>
          <div id="type2">${data[0].type2 || ""}</div>
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
          <td>${data[0].height} m</td>
          <td>${data[0].weight} kg</td>
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
          <td>${data[0].ability1}</td>
          <td>${data[0].ability2 || ""}</td>
          <td>${data[0].hiddenability || ""}</td>
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
          <td>${data[0].hp}</td>
          <td>${data[0].att}</td>
          <td>${data[0].def}</td>
          <td>${data[0].spa}</td>
          <td>${data[0].spd}</td>
          <td>${data[0].spe}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `;

  resultElement.innerHTML = displayInfo;
  document.getElementById("pokemon-select").value = "";
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
  data.map(({ name }) => {
    const li = document.createElement("li");
    li.textContent = name;
    ul.appendChild(li);
  });
  resultElement.appendChild(ul);
});
