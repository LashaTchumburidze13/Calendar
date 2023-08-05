

export default function setup(onDragComplete){
document.addEventListener('mousedown', e => {
    if(!e.target.matches('[data-draggable]')) return
   
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)
    const ghost = selectedItem.cloneNode(true)
renderItems(itemClone,selectedItem,ghost,e)
renderEvents(itemClone,selectedItem,ghost,onDragComplete)


})
}




function renderItems(itemClone,selectedItem,ghost,e){
    const originalRect = selectedItem.getBoundingClientRect()
    selectedItem.classList.add('hide')
    itemClone.classList.add('dragging')
    document.body.append(itemClone)
    positionItems(itemClone,e)
 
 ghost.classList.add('ghost')
 ghost.style.height = `${originalRect.height}px`
 ghost.innerHTML = ''
 selectedItem.parentElement.insertBefore(ghost,selectedItem)
 
}

function renderEvents(itemClone,selectedItem,ghost,onDragComplete){

    const moveFunction = e => {
        const dropZone = getDropZone(e.target)
    if(dropZone == null) return
    const closestDrop = Array.from(dropZone.children).find(child => {
        const rect = child.getBoundingClientRect()
        return e.clientY < rect.top + rect.height / 2
    })



    if(closestDrop != null){
        dropZone.insertBefore(ghost,closestDrop)
    }else{
        dropZone.append(ghost)
    }
        positionItems(itemClone,e)

    }


    document.addEventListener('mousemove',moveFunction)
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveFunction)
        selectedItem.classList.remove('hide')
        
const dropZone = getDropZone(ghost)
if(dropZone){
    onDragComplete({
        startZone: getDropZone(selectedItem),
        endZone: dropZone,
        dragElement:selectedItem,
        index:Array.from(dropZone.children).indexOf(ghost)

    })
    dropZone.insertBefore(selectedItem,ghost)
}
        itemClone.remove()
        ghost.remove()
        console.log('up')
    },{once:true})
}


function getDropZone(element){
    if(element.matches('[data-dropzone]')){
        return element
    }else{
        return element.closest('[data-dropzone]')
    }
}


function positionItems(itemClone,e){
    itemClone.style.top = `${e.clientY}px`
    itemClone.style.left = `${e.clientX}px`
}
