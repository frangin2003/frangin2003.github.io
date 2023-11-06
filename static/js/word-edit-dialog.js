const showEditWord = (termId, idPrefix) => {
    const term = TERMS_BY_ID.get(termId);
    const previousTerm = term.previousId ? TERMS_BY_ID.get(term.previousId) : { pre: '', text: '', post: '' };
    const nextTerm = term.nextId ? TERMS_BY_ID.get(term.nextId) : { pre: '', text: '', post: '' };
    const sentence = "..." + previousTerm.pre + previousTerm.text + previousTerm.post + term.pre + term.text + term.post + nextTerm.pre + nextTerm.text + nextTerm.post + "...";
    const placeholder = term.placeholder ? term.placeholder : term.text;

    $EDIT_SENTENCE.text(sentence);
    $EDIT_ORIGINAL_VALUE.text(term.text);
    $EDIT_NEW_WORD.val(placeholder);

    $EDIT_SAVE.off("click").on("click", () => {
        term.placeholder = $EDIT_NEW_WORD.val();
        term.backgroundColor = term.backgroundColor ? term.backgroundColor : '#FFB6C1';
        TEXT_PLACEHOLDER.set(term.text, {
            placeholder: term.placeholder,
            backgroundColor: term.backgroundColor
        });
        TEXT_NORMAL.set(term.placeholder, {
            text: term.text,
            backgroundColor: term.backgroundColor
        });
        $EDIT_DIALOG.dialog("close");
        keyupProtect();
    });

    $EDIT_DIALOG.dialog();
};