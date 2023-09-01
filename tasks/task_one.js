const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
let catArray = [];
let currentPage = 1;
let itemsPerPage = 3;

let prevBtn = document.getElementById('previous');
let nextBtn = document.getElementById('next');

async function getApi() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        catArray = data.categories;
    } catch (error) {
        console.error(error);
    }
}

async function showPage() {
    await getApi();

    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    let itemsToShow = catArray.slice(startIndex, endIndex);

    let display = document.getElementById('menu');
    display.innerHTML = "";

    itemsToShow.forEach(item => {
        let numTag = document.createElement('p');
        let imgTag = document.createElement('img');
        let headerTag = document.createElement('h3');
        let descTag = document.createElement('p');

        numTag.innerText = item.idCategory;
        imgTag.src = item.strCategoryThumb;
        headerTag.innerText = item.strCategory;
        descTag.innerText = item.strCategoryDescription;

        display.appendChild(numTag);
        display.appendChild(headerTag);
        display.appendChild(imgTag);
        display.appendChild(descTag);
    });
    hideBtns();
}

showPage();

prevBtn.addEventListener('click', () => {
    currentPage--;
    showPage();
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    showPage();
});

function hideBtns() {
    if (currentPage === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'initial';
    }

    let pageLimit = Math.ceil(catArray.length / itemsPerPage);
    if (currentPage === pageLimit) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'initial';
    }
}