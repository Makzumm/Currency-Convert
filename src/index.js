import fetchCurrency from "./js/request.js";
import { refs } from "./js/vars.js";

let currencyData;

async function fetchData() {
    try {
        const data = await fetchCurrency();
        currencyData = filterCurrencyData(data.data);
        displayData(currencyData);
        populateCurrencyOptions(currencyData);
    } catch (error) {
        console.log(error);
    }
}

function filterCurrencyData(currencyData) {
    return Object.keys(currencyData)
        .filter((currencyCode) => currencyCode !== "RUB")
        .reduce((result, currencyCode) => {
            result[currencyCode] = currencyData[currencyCode];
            return result;
        }, {});
}

function displayData(currencyData) {
    const currencyList = refs.currencyListEl;
    currencyList.innerHTML = "";

    Object.entries(currencyData).forEach(([currencyCode, rate]) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${currencyCode}: ${rate.toFixed(2)}`;
        currencyList.appendChild(listItem);
    });
}

function populateCurrencyOptions(currencyData) {
    const currencyConvertListFirst = refs.currencyConvertListFirst;
    const currencyConvertListSecond = refs.currencyConvertListSecond;

    currencyConvertListFirst.innerHTML = "";
    currencyConvertListSecond.innerHTML = "";

    for (const currencyCode in currencyData) {
        if (currencyData.hasOwnProperty(currencyCode)) {
            const option1 = createOption(currencyCode);
            const option2 = createOption(currencyCode);

            currencyConvertListFirst.appendChild(option1);
            currencyConvertListSecond.appendChild(option2);
        }
    }

    updateSecondInputValue();
}

function createOption(value) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    return option;
}

function updateSecondInputValue() {
    const selectedCurrency = refs.currencyConvertListSecond.value;
    if (currencyData.hasOwnProperty(selectedCurrency)) {
        refs.currencyInputFieldSecond.value = currencyData[selectedCurrency].toFixed(2).toString();
    }
}

function currencyConvertationFunction() {
    const firstCurrency = refs.currencyConvertListFirst.value;
    const secondCurrency = refs.currencyConvertListSecond.value;
    const amount = parseFloat(refs.currencyInputFieldFisrt.value);

    if (!isNaN(amount) && currencyData.hasOwnProperty(firstCurrency) && currencyData.hasOwnProperty(secondCurrency)) {
        const rateFirst = currencyData[firstCurrency];
        const rateSecond = currencyData[secondCurrency];
        const convertedAmount = (amount / rateFirst) * rateSecond;
        refs.resultOfConvertEl.textContent = convertedAmount.toFixed(2);
    }
}

refs.convertButtonEl.addEventListener('click', (e) => {
    e.preventDefault();
    currencyConvertationFunction();
});

refs.currencyConvertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currencyConvertationFunction();
});

refs.currencyConvertListSecond.addEventListener('change', () => {
    updateSecondInputValue();
});

fetchData();