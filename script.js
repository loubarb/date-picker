import { format, getUnixTime, fromUnixTime, addMonths, sub } from "date-fns"

const datePickerButton = document.querySelector('.date-picker-button')
const datePickerCalendar = document.querySelector('.date-picker')
const dateNumbers = document.querySelector('.date-picker-grid-dates')
const date = document.querySelectorAll('.date')
const forwardMonthButton = document.querySelector('.next-month-button')
const previousMonthButton = document.querySelector('.prev-month-button')
const currentMonth = document.querySelector('.current-month')


dateNumbers.addEventListener('click', (e) => {
  // e.currentTarget = grid div
  date.forEach((date) => {
    if (e.target.innerText === date.innerText) {
      date.classList.add('selected')
      datePickerCalendar.classList.remove('show')
    } else {
      date.classList.remove('selected')
    }
  })
})

datePickerButton.addEventListener('click', (e) => {
  datePickerCalendar.classList.toggle('show')
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  setupDatePicker(selectedDate)
})

function setDate(date) {
  datePickerButton.innerText = format(date, 'MMMM do, yyyy')
  datePickerButton.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(selectedDate) {
  currentMonth.innerText = format(selectedDate, 'MMMM - yyyy')
  setMonth(selectedDate)
}

function setMonth(selectedDate) {
  forwardMonthButton.addEventListener('click', () => {
    setupDatePicker(addMonths(selectedDate, 1))
  }, { once: true })
  previousMonthButton.addEventListener('click', () => {
    setupDatePicker(sub(selectedDate, {
      months: 1
    }))
  }, {once: true })
}


setDate(new Date())
