import setup from "./script.js";
import {v4} from 'uuid'
setup(onDragComplete)

const SEASON = 'SEASONSTORAGE'


const DEFAULT_LANES = {
    backlog:[{id:v4(),text:'trello clone todo text'}],
    doing:[],
    done:[]
}




let lanes = loadLanes()
renderLanes()


document.addEventListener('submit', e => {
    if(!e.target.matches('[data-task-form]'))return

    e.preventDefault()

    const taksInput = e.target.querySelector('[data-task-input]')

    const inputText = taksInput.value

    const parent = e.target.closest('.lane').querySelector('[data-lane-id]')
    const tasks = {id:v4(), text:inputText}

    lanes[parent.dataset.laneId].push(tasks)
  taksInput.value = ''
    const taskElement = document.createElement('div')
    taskElement.innerText = tasks.text
    taskElement.classList.add('task')
    taskElement.id = tasks.id
    taskElement.dataset.draggable = true
    parent.append(taskElement)

saveLanes()


})



function onDragComplete(e){
    const startLane = e.startZone.dataset.laneId
    const endLane = e.endZone.dataset.laneId

    const startTask = lanes[startLane]
    const endTasks = lanes[endLane]
  
    const task = startTask.find(t => t.id === e.dragElement.id)
    startTask.splice(startTask.indexOf(task))
    endTasks.splice(e.index,0,task)
    saveLanes()
   
}


function renderLanes(){
    Object.entries(lanes).forEach(obj => {
        const laneId = obj[0]
        const laneText = obj[1]

        const lane = document.querySelector(`[data-lane-id="${laneId}"]`)

        laneText.forEach(task => {
            const element = document.createElement('div')
            element.classList.add('task')
            element.id = task.id
            element.innerText = task.text
            element.dataset.draggable = true
            lane.append(element)
            
        })
        
    })
  
}


function loadLanes(){
    const item = localStorage.getItem(SEASON)
    return JSON.parse(item) || DEFAULT_LANES
}

function saveLanes(){
    localStorage.setItem(SEASON,JSON.stringify(lanes))
}