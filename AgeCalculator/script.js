let userInput = document.getElementById("date");
let result = document.getElementById("result");
userInput.max = new Date().toISOString().split("T")[0];

function calcualteAge() {
  let birthdate = new Date(userInput.value);

  let d1 = birthdate.getDate();
  let m1 = birthdate.getMonth() + 1; // starts with 0 so added 1 //
  let y1 = birthdate.getFullYear();

  let today = new Date();

  let d2 = today.getDate();
  let m2 = today.getMonth() + 1;
  let y2 = today.getFullYear();

  let d3, m3, y3;

  y3 = y2 - y1;

  if (m2 >= m1) {
    m3 = m2 - m1;
  } else {
    y3--;
    m3 = 12 + m2 - m1;
  }

  if (d2 >= d1) {
    d3 = d2 - d1;
  } else {
    m3--;
    d3 = getDaysInMonth(y1, m1) + d2 - d1;
  }
  if (m3 < 0) {
    m3 = 11;
    yr--;
  }

  console.log(y3, m3, d3);
  result.innerHTML = `You are on this planet since ${y3} years ${m3} months and ${d3} days!!`;

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate(); // will return last date of a month //
  }
}
