document.addEventListener('DOMContentLoaded', () => {
    const api = 'https://disease.sh/v3/covid-19/countries';
    const container = document.getElementById('genCon');
  
    async function fetchCovidData(api) {
      try {
        const response = await fetch(api);
        return await response.json();
      } catch (error) {
        console.error('Error fetching COVID data:', error);
        return [];
      }
    }
  
    function createCard(country) {
      const card = document.createElement('div');
      card.className = 'card';
  
      const flag = document.createElement('img');
      flag.className = 'flag';
      flag.src = country.countryInfo.flag;
  
      const name = document.createElement('h2');
      name.textContent = `Country: ${country.country}`;
  
      const continent = document.createElement('h3');
      continent.textContent = `Continent: ${country.continent}`;
  
      const overlay = createOverlay(country);
  
      flag.addEventListener('click', () => {
        overlay.style.display = 'block';
      });
  
      card.append(flag, name, continent, overlay);
      return card;
    }
  
    function createOverlay(country) {
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
  
      const overCon = document.createElement('div');
      overCon.className = 'overCon';
  
      const country2 = createParagraph(`Country: ${country.country}`);
      const countryPop = createParagraph(`Population: ${country.population}`);
      const reportedToday = createParagraph(`Reported cases today: ${country.todayCases}`);
      const totalReported = createParagraph(`Total reported cases: ${country.cases}`);
      const deathCount = createParagraph(`Total deaths: ${country.deaths}`);
      const recovered = createParagraph(`Total recovered: ${country.recovered}`);
  
      const btn = document.createElement('button');
      btn.textContent = 'X';
      btn.className = 'closeBtn';
  
      btn.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
  
      overCon.append(country2, countryPop, reportedToday, totalReported, deathCount, recovered, btn);
      overlay.appendChild(overCon);
  
      return overlay;
    }
  
    function createParagraph(text) {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }
  
    async function getCovidData() {
      try {
        const data = await fetchCovidData(api);
  
        data.forEach((country) => {
          const card = createCard(country);
          container.append(card);
        });
      } catch (error) {
        console.error('Error getting COVID data:', error);
      }
    }
  
    getCovidData();
  });