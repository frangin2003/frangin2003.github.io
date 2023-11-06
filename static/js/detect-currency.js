const currencySymbols = ["$", "€", "£", "¥", "₹", "₽", "₺", "₱", "฿", "₦", "₡",
    "₢", "₣", "₤", "₧", "₨", "₩", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵",
    "₸", "₻", "₽", "₾", "៛", "₪", "₨", "৳", "₠", "₪", "₸", "₺", "₺", "₮", "₷",
    "₻", "₿", "元", "圆", "圓", "﷼", "₺", "₡", "₢", "₣", "₤", "₧", "₨", "₩",
    "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₹", "₻", "₼", "₽", "₾",
    "₫", "₨", "₺", "₷", "₿", "ƒ", "₹", "₸", "₡", "₢", "₣", "₤", "₥", "₦", "₧",
    "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽",
    "₾", "₺", "₷", "₿", "¥", "元", "圆", "圓", "₹", "₨", "৳", "₠", "₢", "₣",
    "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴",
    "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧",
    "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽",
    "₾", "₺", "₷", "₿", "¥", "元", "圆", "圓", "₹", "₨", "৳", "₠", "₢", "₣",
    "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴",
    "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧",
    "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽",
    "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫",
    "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿",
    "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰",
    "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤",
    "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵",
    "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨",
    "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾",
    "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭",
    "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡",
    "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲",
    "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥",
    "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸",
    "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩",
    "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺",
    "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮",
    "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢",
    "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳",
    "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦",
    "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻",
    "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪",
    "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷",
    "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯",
    "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣",
    "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴",
    "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧",
    "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽",
    "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫",
    "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿",
    "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰",
    "₲", "₳", "₴", "₵", "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₡", "₢", "₣", "₤",
    "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴", "₵",
    "₸", "₻", "₽", "₾", "₺", "₷", "₿", "₿", "₨", "₸", "лв", "₣", "₡", "₢", "₣",
    "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₮", "₯", "₰", "₲", "₳", "₴",
    "₵", "₸", "₻", "₽", "₾", "₷", "₿"];

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const currencyRegex = new RegExp(currencySymbols.map(escapeRegExp).join('|'), 'g');

function detectAndExtractAmountDetails(text) {

    let currency = undefined;
    let textWithoutCurrency = undefined;
    let replacementCurrency = undefined;

    const detectedCurrencies = text.match(currencyRegex);
    if (detectedCurrencies) {
        currency = detectedCurrencies[0];

        textPlaceholder = TEXT_PLACEHOLDER.get(currency);
        if (textPlaceholder === undefined) {
            replacementCurrency = getRandomCurrency(currency);
            TEXT_PLACEHOLDER.set(currency, {
                placeholder: replacementCurrency,
                backgroundColor: '#98FB98' // Pastel green
            });
        } else {
            replacementCurrency = textPlaceholder.placeholder;
        }

        textWithoutCurrency = text.replace(currency, '');
    }

    // Remove any spaces from the input string
    const cleanedText = textWithoutCurrency.replace(/ /g, '');

    let parsedNumber = undefined;
    // Check if the string contains a '.' for decimal places
    if (cleanedText.includes('.')) {
        // Remove any commas from the string
        parsedNumber = parseFloat(cleanedText.replace(/,/g, ''));
    } else {
        // Determine the comma for decimals and comma for thousands
        const decimalSeparator = cleanedText.includes(',') ? ',' : '.';
        const thousandsSeparator = decimalSeparator === ',' ? '.' : ',';

        // Remove the thousands separator and replace the decimal separator with '.'
        parsedNumber = parseFloat(cleanedText.replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '').replace(decimalSeparator, '.'));
    }

    // Check if the parsing was successful
    if (!isNaN(parsedNumber)) {
        // Determine the locale format
        const localeFormat = Intl.NumberFormat().resolvedOptions().locale;

        // Create the result object
        return {
            text: text,
            currency: currency,
            textWithoutCurrency: textWithoutCurrency,
            replacementCurrency: replacementCurrency,
            placeholder: replacementCurrency + (parsedNumber * 10).toLocaleString(localeFormat),
            amount: parsedNumber,
            locale: localeFormat,
        };
    }

    return text;
}

function getRandomCurrency(currentCurrency) {
    const availableSymbols = currencySymbols.filter(symbol => symbol !== currentCurrency);
    const randomIndex = Math.floor(Math.random() * availableSymbols.length);
    return availableSymbols[randomIndex];
}