const pikachu = {
  name: "Pikachu",
  height: 0.4,
  weight: 6,
  type: {
    primary: "Electric",
    secondary: "",
  },
  ability: {
    primary: "Static",
    secondary: "",
    hidden: "Lightning Rod",
  },
  baseStats: {
    hp: 35,
    attack: 55,
    defense: 30,
    spAttack: 50,
    spDefense: 40,
    speed: 90,
  },
  pokedexNo: 25,
  level: 5,
  levelUp: function () {
    this.level = this.level + 1;
  },
};

const test1 = `
<ul>
  <li>Pokedex Number: ${pikachu.pokedexNo}</li>
  <li>Height: ${pikachu.height} m</li>
  <li>Weight: ${pikachu.weight} kg</li>
</ul>
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
  <tr>
    <td>${pikachu.baseStats.hp}</td>
    <td>${pikachu.baseStats.attack}</td>
    <td>${pikachu.baseStats.defense}</td>
    <td>${pikachu.baseStats.spAttack}</td>
    <td>${pikachu.baseStats.spDefense}</td>
    <td>${pikachu.baseStats.speed}</td>
  </tr>
</table>
`;

const newPokemon = document.querySelector("#test1");

const pokemonStats = document.createElement("div");
pokemonStats.setAttribute("id", "PikachuStats");
pokemonStats.innerHTML = test1;
newPokemon.append(pokemonStats);

class Pokemon {
  constructor(
    name,
    height,
    weight,
    typePrimary,
    typeSecondary,
    primaryAbility,
    secondaryAbility,
    hiddenAbility,
    pokedexNo,
    level
  ) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.type = {
      primary: typePrimary,
      secondary: typeSecondary,
    };
    this.ability = {
      primary: primaryAbility,
      secondary: secondaryAbility,
      hidden: hiddenAbility,
    };
    this.baseStats = {
      primary: typePrimary,
      secondary: typeSecondary,
    };
    (this.pokedexNo = pokedexNo), (this.level = level);
  }
  levelUp() {
    this.level = this.level + 1;
  }
}

const charmander = new Pokemon("Charmander", 0.6, 8.5, "Fire", "", "blaze", "", "Solar Power", 4, 5);

const test2 = `
      <h2>${charmander.name}</h2>
      <ul>
          <li>Height: ${charmander.height} m</li>
          <li>Weight: ${charmander.weight} kg</li>
          <li>Pokedex Number: ${charmander.pokedexNo}</li>
      </ul>
  `;

document.getElementById("test2").innerHTML = test2;

document.getElementById("selectPokemon").addEventListener("submit", async function (event) {
  event.preventDefault();
  const selectedValue = document.getElementById("pokemon-select").value;

  const response = await fetch(`/get-data?selectedValue=${selectedValue}`);
  const data = await response.json();

  const resultElement = document.getElementById("result");
  const displayInfo = `
  <ul>
    <li>Pokedex Number: ${data[0].pokedexnumber}</li>
    <li>Height: ${data[0].height} m</li>
    <li>Weight: ${data[0].weight} kg</li>
  </ul>
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
  <tr>
    <td>${data[0].hp}</td>
    <td>${data[0].att}</td>
    <td>${data[0].def}</td>
    <td>${data[0].spa}</td>
    <td>${data[0].spd}</td>
    <td>${data[0].spe}</td>
  </tr>
</table>
  `;

  resultElement.innerHTML = displayInfo;
});
