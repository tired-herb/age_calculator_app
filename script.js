const button = document.querySelector('.button');
const fildset = document.querySelector('fieldset');

const errorText = document.querySelectorAll('.errorText');
const label = document.querySelectorAll('.label');

let inputDay = document.querySelector('#day');
let inputMonth = document.querySelector('#month');
let inputYear = document.querySelector('#year');

const errorDay = document.querySelector('#errorDay');
const errorMonth = document.querySelector('#errorMonth');
const errorYear = document.querySelector('#errorYear');

let outputDay = document.querySelector('#spanDays');
let outputMonth = document.querySelector('#spanMonths');
let outputYear = document.querySelector('#spanYears');

let checkDay = true;
let checkMonth = true;
let checkYear = true;

fildset.addEventListener('submit', validation);
button.addEventListener('click', validation);

function validation(e) {
  e.preventDefault();

  let dayInput = document.querySelector('#day').value;
  let monthInput = document.querySelector('#month').value;
  let yearInput = document.querySelector('#year').value;

  //blank input or not valid
  if (!dayInput) {
    errorDay.style.display = 'flex';
    inputDay.classList.add('inputError');
    errorDay.textContent = 'This field is required';
    checkDay = false;
  } else {
    if (dayInput > 31 || dayInput < 1) {
      errorDay.style.display = 'flex';
      errorDay.textContent = 'Must be a valid day';
      inputDay.classList.add('inputError');
      checkDay = false;
    } else {
      errorDay.style.display = 'none';
      inputDay.classList.remove('inputError');
      checkDay = true;
    }
  }
  //blank input or not valid
  if (!monthInput) {
    errorMonth.style.display = 'flex';
    inputMonth.classList.add('inputError');
    errorMonth.textContent = 'This field is required';
    checkMonth = false;
  } else {
    if (monthInput > 12 || monthInput < 1) {
      errorMonth.style.display = 'flex';
      errorMonth.textContent = 'Must be a valid month';
      inputMonth.classList.add('inputError');
      checkMonth = false;
    } else {
      errorMonth.style.display = 'none';
      inputMonth.classList.remove('inputError');
      checkMonth = true;
      //30 days in month
      if (
        monthInput == 4 ||
        monthInput == 6 ||
        monthInput == 9 ||
        monthInput == 11
      ) {
        console.log(inputDay);
        inputDay.setAttribute('max', 30);
        if (dayInput > 30) {
          errorDay.style.display = 'flex';
          errorDay.textContent = 'Must be a valid day';
          inputDay.classList.add('inputError');
          checkDay = false;
        } else {
          errorDay.style.display = 'none';
          inputDay.classList.remove('inputError');
          checkDay = true;
        } //February in the leap year
      } else if (monthInput == 2) {
        if (
          (yearInput % 4 == 0 && yearInput % 100 != 0) ||
          yearInput % 400 == 0
        ) {
          inputDay.setAttribute('max', 29);
          if (dayInput > 29) {
            errorDay.style.display = 'flex';
            errorDay.textContent = 'Must be a valid day';
            inputDay.classList.add('inputError');
            checkDay = false;
          } else {
            errorDay.style.display = 'none';
            inputDay.classList.remove('inputError');
            checkDay = true;
          } //February not in the leap year
        } else {
          inputDay.setAttribute('max', 28);
          if (dayInput > 28) {
            errorDay.style.display = 'flex';
            errorDay.textContent = 'Must be a valid day';
            inputDay.classList.add('inputError');
            checkDay = false;
          } else {
            errorDay.style.display = 'none';
            inputDay.classList.remove('inputError');
            checkDay = true;
          }
        }
      } else {
        inputDay.setAttribute('max', 31);
        checkDay = true;
      }
    }
  }
  //blank input or not valid
  if (!yearInput) {
    errorYear.style.display = 'flex';
    inputYear.classList.add('inputError');
    errorYear.textContent = 'This field is required';
    checkYear = false;
  } else {
    if (yearInput > 2024 || yearInput < 1900) {
      errorYear.style.display = 'flex';
      errorYear.textContent = 'Must be a valid year';
      inputYear.classList.add('inputError');
      checkYear = false;
    } else {
      errorYear.style.display = 'none';
      inputYear.classList.remove('inputError');
      checkYear = true;
    }
  }
  if ((dayInput, monthInput, yearInput) && checkDay && checkMonth && checkYear)
    calculate(dayInput, monthInput, yearInput);
  else {
    outputDay.innerText = '--';
    outputMonth.innerText = '--';
    outputYear.innerText = '--';
  }
}

//calculate
function calculate(day, month, year) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  //today's month is before the input month
  if (months < 0 || (months == 0 && days < 0)) {
    years--;
    months += 12;
  }

  //today's day is before the input day
  if (days < 0) {
    const daysInLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += daysInLastMonth;
    months--;
  }

  //output
  outputDay.innerText = days;
  outputMonth.innerText = months;
  outputYear.innerText = years;
  console.log(days, months, years);
}
