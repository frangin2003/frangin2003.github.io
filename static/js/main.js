$(function () {
  $(document).ready(function () {
    $BODY = $("body");
    $SKY = $(".sky");
    $INPUT_TOGGLE_DAY_NIGHT = $("#input-toggle-day-night");

    $TEXTAREA_LEFT_AND_RIGHT = $("#textarea-left-and-right");
    $TEXTAREA_1 = $("#textarea-1");
    $TEXTAREA_2 = $("#textarea-2");
    $TEXTAREA_3 = $("#textarea-3");
    $TEXTAREA_4 = $("#textarea-4");

    $TITLE_1 = $("#title-1");
    $TITLE_2 = $("#title-2");
    $TITLE_3 = $("#title-3");
    $TITLE_4 = $("#title-4");
    $BUTTON_2_COPY = $("#button-2-copy");
    $BUTTON_4_COPY = $("#button-4-copy");

    $EDIT_DIALOG = $("#editDialog");
    $EDIT_SENTENCE = $("#editSentence");
    $EDIT_ORIGINAL_VALUE = $("#editOriginalValue");
    $EDIT_NEW_WORD = $("#editNewWord");
    $EDIT_SAVE = $("#editSave");

    $MESSAGE = $("#messages");

    $("#button-1-clear").tooltip();
    $("#button-3-clear").tooltip();
    $("#button-2-copy").tooltip();
    $("#button-4-copy").tooltip();

    paintStars(387, 1);

    const runCode = () => {
      nlp.plugin(compromiseDates);

      $INPUT_TOGGLE_DAY_NIGHT.click((e) => {
        $BODY.toggleClass("body-day").toggleClass("body-night");
        $SKY.toggle();
        $TITLE_1.toggle();
        $TITLE_2.toggle();
        $TITLE_3.toggle();
        $TITLE_4.toggle();
        $TEXTAREA_1.toggle();
        $TEXTAREA_2.toggle();
        $TEXTAREA_3.toggle();
        $TEXTAREA_4.toggle();
        $TEXTAREA_4.toggle();
        $TEXTAREA_4.toggle();

        $("#button-1-clear").toggle();
        $("#button-3-clear").toggle();
        $("#button-2-copy").toggle();
        $("#button-4-copy").toggle();
        $("#click-example-1").toggle();
        // $("#click-example-3").toggle();

        e.stopPropagation();
      });

      $BUTTON_2_COPY.click(() => {
        navigator.clipboard.writeText($TEXTAREA_2.text());
      });

      $("#button-1-clear").click(() => {
        $TEXTAREA_1.html("");
        keyupProtect();
      });
      $("#button-3-clear").click(() => {
        $TEXTAREA_3.html("");
        keyupUncover();
      });
      $("#click-example-1").click(() => {
        $TEXTAREA_1.html(SAMPLE_TEXT);
        keyupProtect();
      });
      $TEXTAREA_1.toTextarea({ allowHTML: true, allowImg: true });
      $TEXTAREA_2.toTextarea({ allowHTML: true, allowImg: true }).prop({
        contentEditable: false,
      });

      $EDIT_NEW_WORD.on("keypress", (e) => {
        if (e.keyCode == 13) {
          $EDIT_SAVE.trigger("click");
        }
      });

      $BUTTON_4_COPY.click(() => {
        navigator.clipboard.writeText($TEXTAREA_4.text());
      });
      $TEXTAREA_3.toTextarea({ allowHTML: true, allowImg: true });
      $TEXTAREA_4.toTextarea({ allowHTML: true, allowImg: true }).prop({
        contentEditable: false,
      });

      // to remove / just for test
      $TEXTAREA_1.html("");
      $TEXTAREA_2.html("");
      $TEXTAREA_3.html("");
      $TEXTAREA_4.html("");
      // to remove / just for test

      $TEXTAREA_1.on("keyup", keyupProtect);
      $TEXTAREA_3.on("keyup", keyupUncover);

      keyupProtect();

      document.body.addEventListener("mousemove", function (e) {
        document.body.style.setProperty("--mouse-x", e.clientX + "px");
        // console.log('Mouse X position: ' + e.clientX + 'px');
        document.body.style.setProperty("--mouse-y", e.clientY + "px");
        // console.log('Mouse Y position: ' + e.clientY + 'px');
      });
    };

    const checkFakerAndRunCode = () => {
      if (window.faker) {
        runCode();
      } else {
        setTimeout(checkFakerAndRunCode, 100);
      }
    };

    checkFakerAndRunCode();
  });
});
