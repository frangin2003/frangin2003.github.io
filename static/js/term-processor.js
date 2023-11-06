

const strategies = [
    // Acronyms
    {
        match: term => ['Acronym'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#D8BFD8'; // Pastel purple
            term.placeholder = window.faker.hacker.abbreviation();
        }
    },
    // Emails
    {
        match: term => ['Email'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#FFDAB9'; // Pastel peach
            term.placeholder = window.faker.internet.email();
        }
    },
    // Dates
    {
        match: term => /^(Mon|Tue|Tues|Wed|Wednes|Thu|Thurs|Fri|Sat|Satur|Sun)(day)?$/i.test(term.text),
        execute: term => {
            term.backgroundColor = '#FFFFE0'; // Pastel yellow
            term.placeholder = window.faker.date.weekday();
        }
    },
    {
        match: term => /^Q[1-4]$/i.test(term.text),
        execute: term => {
            term.backgroundColor = '#FFFFE0'; // Pastel yellow
            const quarters = ['Q1', 'Q2', 'Q3', 'Q4'].filter(q => q.toLowerCase() !== term.text.toLowerCase());
            term.placeholder = quarters[Math.floor(Math.random() * quarters.length)];
        }
    },
    {
        match: term => ['Date'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#FFFFE0'; // Pastel yellow
            const dateFormat = detectDateFormat(term.text);
            const fakeDate = new Date(window.faker.date.anytime(
                {
                    refDate: new Date(term.text)
                }
            ));
            try {
                term.placeholder = luxon.DateTime.fromJSDate(fakeDate).toFormat(dateFormat);
            } catch (error) {
                console.error(`Error generating fake date: ${fakeDate} ${dateFormat}`, error);
            }
        }
    },
    // Money
    {
        match: term => [
            "Value",
            "TextValue",
            "Multiple",
            "Cardinal"].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#98FB98'; // Pastel green
            const fuse = new Fuse([term.normal], { threshold: 0.3 });
            if (fuse.search('million').length > 0) {
                term.placeholder = "gazillion";
            } else if (fuse.search('billion').length > 0) {
                term.placeholder = "zillion";
            } else if (fuse.search('hundred').length > 0) {
                term.placeholder = "thousands";
            } else if (fuse.search('thousand').length > 0) {
                term.placeholder = "hundred";
            }
        }
    },
    {
        match: term => ['Money'].some(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#98FB98'; // Pastel green
            const moneyObject = detectAndExtractAmountDetails(term.text)
            if (typeof moneyObject === 'object') {
                term.placeholder = moneyObject.placeholder;
            } else {
                term.placeholder = 'MONEY_AMOUNT';
            }
        }
    },
    {
        match: term => ['Currency'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#98FB98'; // Pastel green
            term.placeholder = getRandomCurrency(term.text);
        }
    },
    // Nouns
    {
        match: term => ['Organization'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#40E0D0'; // Pastel turquoise
            term.placeholder = window.faker.company.name();
        }
    },
    // Addresses
    {
        match: term => ['Address', 'Place', 'Cardinal', 'NumericValue'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#F08080'; // Pastel red
            term.placeholder = window.faker.location.buildingNumber();
        }
    },
    {
        match: term => ['Address', 'Place', 'City'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#F08080'; // Pastel red
            term.placeholder = window.faker.location.city();
        }
    },
    {
        match: term => ['Address', 'Place'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#F08080'; // Pastel red
            term.placeholder = window.faker.location.street();
        }
    },
    {
        match: term => ['Person', 'FirstName'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#FFC0CB'; // Pastel pink
            term.placeholder = window.faker.person.firstName();
        }
    },
    {
        match: term => ['Person', 'LastName'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#FFC0CB'; // Pastel pink
            term.placeholder = window.faker.person.lastName();
        }
    },
    {
        match: term => ['Person'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#FFC0CB'; // Pastel pink
            term.placeholder = window.faker.person.firstName();
        }
    },
    {
        match: term => ['Actor'].every(tag => term.tags.includes(tag)),
        execute: term => {
            term.backgroundColor = '#FDB0C0'; // Pastel coral
            term.placeholder = window.faker.person.jobTitle();
        }
    },
    {
        match: term => /^\d+(-\d+)+$/.test(term.text),
        execute: term => {
            term.backgroundColor = '#ADD8E6'; // Pastel blue
            term.placeholder = faker.finance.accountNumber();
        }
    },
    // Password
    {
        match: term => term.previousId
            && TERMS_BY_ID.get(term.previousId).tags.includes('Noun')
            && !TERMS_BY_ID.get(term.previousId).tags.includes('Password'),
        execute: term => {
            const fuse = new Fuse([TERMS_BY_ID.get(term.previousId).text], { threshold: 0.3 });
            if (fuse.search('password').length > 0) {
                term.backgroundColor = '#FF0000'; // Red
                term.tags.push("Password");
                term.placeholder = window.faker.internet.password();
            }
        }
    },
];

const protect = (nlpJson, anonimize) => {
    TERMS_BY_ID.clear();
    let previousTermId = undefined;

    // refine the terms by grouping them by type (eg. Money) and then populate
    // terms in TERMS_BY_ID map
    for (let i = 0; i < nlpJson.length; i++) {
        let terms = nlpJson[i].terms;
        for (let j = 0; j < terms.length; j++) {
            let term = terms[j];
            term.previousId = previousTermId;
            nextTermId = terms[j + 1] ? terms[j + 1].id : undefined;
            term.nextId = nextTermId;
            TERMS_BY_ID.set(term.id, term);
            previousTermId = term.id;
        }
    }

    let output = '';
    let termIds = Array.from(TERMS_BY_ID.keys());

    for (let i = 0; i < termIds.length; i++) {
        let term = TERMS_BY_ID.get(termIds[i]);

        let textPlaceholder = TEXT_PLACEHOLDER.get(term.text);
        if (textPlaceholder === undefined) {
            term.placeholder = term.text;
            term.backgroundColor = '';

            for (const strategy of strategies) {
                if (strategy.match(term)) {
                    strategy.execute(term);
                    break;
                }
            }

            TEXT_PLACEHOLDER.set(term.text, {
                placeholder: term.placeholder,
                backgroundColor: term.backgroundColor
            });
            TEXT_NORMAL.set(term.placeholder, {
                text: term.text,
                backgroundColor: term.backgroundColor
            });
        } else {
            term.placeholder = textPlaceholder.placeholder;
            term.backgroundColor = textPlaceholder.backgroundColor;
        }

        const idPrefix = term.id.replace('|', '_');

        const openingTag = term.backgroundColor ?
            `<mark id="${idPrefix}" style="border-radius:3px;padding: 0 2px 0 2px;background-color:${term.backgroundColor};color:" data-placeholder="${term.placeholder}"`
            : `<span id="${idPrefix}"`;

        output +=
            term.pre
            + openingTag
            + ` ondblclick="showEditWord('${term.id}', '${idPrefix}');">`
            + (anonimize ? term.placeholder : term.text)
            + (term.backgroundColor ? `</mark>` : '</span>')
            + `<input id="${idPrefix}_input" style="display:none;" type="text" value="${term.text}" onkeydown="validateWordChange(event, '${idPrefix}');"/>`
            + term.post;
    }
    return output;
}

const uncover = (nlpJson, anonimize) => {
    let termsById = new Map();

    // refine the terms by grouping them by type (eg. Money) and then populate
    // terms in termsById map

    for (let i = 0; i < nlpJson.length; i++) {
        let terms = nlpJson[i].terms;
        for (let j = 0; j < terms.length; j++) {
            termsById.set(terms[j].id, terms[j]);
        }
    }

    let output = '';
    let termIds = Array.from(termsById.keys());

    for (let i = 0; i < termIds.length; i++) {
        let term = termsById.get(termIds[i]);

        let textPlaceholder = TEXT_NORMAL.get(term.text);
        if (textPlaceholder === undefined) {
            term.placeholder = term.text;
        } else {
            term.placeholder = textPlaceholder.text;
            term.backgroundColor = textPlaceholder.backgroundColor;
        }

        const idPrefix = term.id.replace('|', '_');

        const openingTag = term.backgroundColor ?
            `<mark id="${idPrefix}" style="border-radius:3px;padding: 0 2px 0 2px;background-color:${term.backgroundColor};color:" data-placeholder="${term.placeholder}"`
            : `<span id="${idPrefix}"`;

        output +=
            term.pre
            + openingTag
            + ` ondblclick="showEditWord('${term.id}', '${idPrefix}');">`
            + (anonimize ? term.placeholder : term.text)
            + (term.backgroundColor ? `</mark>` : '</span>')
            + `<input id="${idPrefix}_input" style="display:none;" type="text" value="${term.text}" onkeydown="validateWordChange(event, '${idPrefix}');"/>`
            + term.post;
    }
    return output;
}


const getCaretCharacterOffsetWithin = (element) => {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

const setCaretCharacterOffsetWithin = (element, offset) => {
    var range = document.createRange();
    range.selectNodeContents(element);
    var textNodes = getTextNodesIn(element);
    var counter = 0;
    var found = false;
    textNodes.forEach(function (node) {
        var length = node.textContent.length;
        if (!found && offset <= counter + length) {
            range.setStart(node, offset - counter);
            found = true;
        }
        counter += length;
    });
    if (!found) {
        if (element.lastChild) {
            range.setStart(element.lastChild, element.lastChild.textContent.length);
        } else {
            range.setStart(element, 0);
        }
    }
    range.collapse(true);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

const getTextNodesIn = (node) => {
    var textNodes = [];
    if (node.nodeType == 3) {
        textNodes.push(node);
    } else {
        var children = node.childNodes;
        for (var i = 0; i < children.length; i++) {
            textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
        }
    }
    return textNodes;
}

const keyupProtect = () => {

    // Save caret position
    var caretPos = getCaretCharacterOffsetWithin($TEXTAREA_1.get(0));
    // console.log('Caret position:', caretPos);


    // // Save the word and its position where the caret was
    // var textBeforeCaret = $div.text().substring(0, caretPos);
    // var wordsBeforeCaret = textBeforeCaret.split(' ');
    // var lastWord = wordsBeforeCaret[wordsBeforeCaret.length - 1];
    // var positionInLastWord = lastWord.length;

    // Parse text and add HTML tags
    const nlpInstance = nlp($TEXTAREA_1[0].innerText);
    const nlpJson = nlpInstance.json();
    var newHtmlContent = protect(nlpJson); // replace 'parseText' with your parsing function
    var newHtmlContentProtected = protect(nlpJson, true); // replace 'parseText' with your parsing function
    // Repopulate div
    $TEXTAREA_1.html(newHtmlContent);
    $TEXTAREA_2.html(newHtmlContentProtected);

    $MESSAGE.html(JSON.stringify(nlpJson, null, 2));

    // Restore caret position
    setTimeout(function () {
        setCaretCharacterOffsetWithin($TEXTAREA_1.get(0), caretPos);
    }, 0);
};

const keyupUncover = () => {

    // Save caret position
    var caretPos = getCaretCharacterOffsetWithin($TEXTAREA_3.get(0));
    // console.log('Caret position:', caretPos);


    // // Save the word and its position where the caret was
    // var textBeforeCaret = $div.text().substring(0, caretPos);
    // var wordsBeforeCaret = textBeforeCaret.split(' ');
    // var lastWord = wordsBeforeCaret[wordsBeforeCaret.length - 1];
    // var positionInLastWord = lastWord.length;

    // Parse text and add HTML tags
    const nlpInstance = nlp($TEXTAREA_3[0].innerText);
    const nlpJson = nlpInstance.json();
    var newHtmlContent = uncover(nlpJson); // replace 'parseText' with your parsing function
    var newHtmlContentUncovered = uncover(nlpJson, true); // replace 'parseText' with your parsing function

    // Repopulate div
    $TEXTAREA_3.html(newHtmlContent);
    $TEXTAREA_4.html(newHtmlContentUncovered);

    $MESSAGE.html(JSON.stringify(nlpJson, null, 2));

    // Restore caret position
    setTimeout(function () {
        setCaretCharacterOffsetWithin($TEXTAREA_3.get(0), caretPos);
    }, 0);
};