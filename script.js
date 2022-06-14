import { format, getUnixTime, fromUnixTime, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"

const datePickerButton = document.querySelector('.date-picker-button')
const datePickerCalendar = document.querySelector('.date-picker')
const dateNumbers = document.querySelector('.date-picker-grid-dates')
const date = document.querySelectorAll('.date')
const forwardMonthButton = document.querySelector('.next-month-button')
const previousMonthButton = document.querySelector('.prev-month-button')
const currentMonth = document.querySelector('.current-month')
let currentDate = new Date()


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
  currentMonth.innerText = format(currentDate, 'MMMM - yyyy')
  setupDates(selectedDate)
}

function setupDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate))
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  dateNumbers.innerHTML = ''

  dates.forEach(date => {
    const dateElement = document.createElement('button')
    dateElement.classList.add('date')
    dateElement.innerText = date.getDate()
    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add('date-picker-other-month-date')
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add('selected')
    }

    dateElement.addEventListener('click', () => {
      setDate(date)
      datePickerCalendar.classList.remove('show')
    })
    dateNumbers.appendChild(dateElement)
  })
}

forwardMonthButton.addEventListener('click', () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = addMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})

previousMonthButton.addEventListener('click', () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = subMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})


setDate(new Date())
