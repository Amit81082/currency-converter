// Currency codes and their symbols
const currencies = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    INR: "Indian Rupee",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    SGD: "Singapore Dollar",
    CHF: "Swiss Franc",
    MYR: "Malaysian Ringgit",
    JPY: "Japanese Yen",
    CNY: "Chinese Yuan"
};

// DOM Elements
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap');

// Populate currency dropdowns
function populateCurrencyDropdowns() {
    for (const currency in currencies) {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');
        
        optionFrom.value = currency;
        optionFrom.text = `${currency} - ${currencies[currency]}`;
        optionTo.value = currency;
        optionTo.text = `${currency} - ${currencies[currency]}`;
        
        fromCurrency.add(optionFrom);
        toCurrency.add(optionTo);
    }
    
    // Set default values
    fromCurrency.value = 'USD';
    toCurrency.value = 'INR';
}

// Format currency number
function formatCurrency(number) {
    return number.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}

// Convert currency
async function convertCurrency() {
    const amountValue = parseFloat(amount.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (isNaN(amountValue)) {
        alert('Please enter a valid amount');
        return;
    }

    convertBtn.textContent = 'Converting...';
    
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
        const data = await response.json();
        
        const rate = data.rates[toCurrencyValue];
        const convertedAmount = amountValue * rate;
        
        result.textContent = `${formatCurrency(amountValue)} ${fromCurrencyValue} = ${formatCurrency(convertedAmount)} ${toCurrencyValue}`;
    } catch (error) {
        result.textContent = 'Error fetching exchange rate. Please try again.';
    } finally {
        convertBtn.textContent = 'Get Exchange Rate';
    }
}

// Swap currencies
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
amount.addEventListener('input', () => {
    if (amount.value === '') {
        amount.value = '';
    }
});

// Initialize the app
populateCurrencyDropdowns();
convertCurrency();
