import {addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, fromUnixTime, getUnixTime, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths} from 'date-fns'



const datePickerbutton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const currentMonth = document.querySelector('.current-month')
const prevButton = document.querySelector('.prev')
const nextButton = document.querySelector('.next')
const grid = document.querySelector('.date-picker-grid-dates')
let currentTime = new Date()

datePickerbutton.addEventListener('click', () => {
 datePicker.classList.toggle('show')

  const selectedDate = fromUnixTime(datePickerbutton.dataset.itemId)
  setDateMonth(selectedDate)
  createGrid(selectedDate)
})

function setDate(date){
    datePickerbutton.innerText = format(date, 'MMMM - yyyy')
    datePickerbutton.dataset.itemId = getUnixTime(date)
    console.log(datePickerbutton)
}

function setDateMonth(selectedDate){
    currentMonth.innerText = format(selectedDate, "MMMM - yyyy")
}


nextButton.addEventListener('click', () => {
   currentTime = addMonths(currentTime,1)
   setDateMonth(currentTime)
})


prevButton.addEventListener('click', () => {
    currentTime = subMonths(currentTime,1)
    setDateMonth(currentTime)
})


function createGrid(selectedDate){
    const strtweek = startOfWeek(startOfMonth(currentTime))
    const endweek = endOfWeek(endOfMonth(currentTime))

    const gridDates = eachDayOfInterval({start:strtweek, end:endweek})
    grid.innerHTML = ''
    gridDates.forEach(date => {
        const gridElement = document.createElement('button')
        gridElement.innerText = date.getDate()
        gridElement.classList.add('date')
        if(!isSameMonth(date,currentTime)){
            gridElement.classList.add('date-picker-other-month-date')
        }
        if(isSameDay(date,selectedDate)){
            gridElement.classList.add('selected')
        }
         gridElement.addEventListener('click', () => {
            setDate(date)
            datePicker.classList.remove('show')
            gridElement.classList.add('selected')
         })

        grid.appendChild(gridElement)
    })
}

setDate(new Date())