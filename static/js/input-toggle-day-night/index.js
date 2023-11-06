const INPUT_TOGGLE_DAY_NIGHT_HTML = `
<div style="width: 100%; display: flex; justify-content: center; position: relative;height: 50px;">
<div class="toggleWrapper" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <input type="checkbox" class="dn" id="input-toggle-day-night" checked/>
    <label for="input-toggle-day-night" class="toggle">
      <span class="toggle__handler">
        <span class="crater crater--1"></span>
        <span class="crater crater--2"></span>
        <span class="crater crater--3"></span>
      </span>
      <span class="star star--1"></span>
      <span class="star star--2"></span>
      <span class="star star--3"></span>
      <span class="star star--4"></span>
      <span class="star star--5"></span>
      <span class="star star--6"></span>
    </label>
</div>
</div>
`;

$(document).ready(function() {
  $('#input-toggle-day-night-target').html(INPUT_TOGGLE_DAY_NIGHT_HTML);
});
