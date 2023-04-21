const add = document.querySelector('#add');
const res = document.querySelector('#res');
const btnAll = document.querySelector('#All');
const btnActive = document.querySelector('#Active');
const btnCompleted = document.querySelector('#Completed');
const btnClear = document.querySelector('#Clear');
let incremento = 0
let i = 0;
const arrTask = [];

// Delete
document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');

    if(targetEl.classList.contains('button-cross')){
        const idParent = parentEl.id;
        const textParent = parentEl.textContent;
        
    //     const indexRemove = arrTask.find((x) => x.textParent === idParent);
    //    arrTask.splice(indexRemove, 1);

        parentEl.remove()
    }
})


function criarItem(valor){
    const idItem = `id-${incremento++}`
    const taskRes = document.createElement('div');
    taskRes.classList.add('tasks-res')
    const task = document.createElement('div')
    task.classList.add('tasks');
    taskRes.appendChild(task);
    taskRes.setAttribute('id', idItem);
    const inputCheck = document.createElement('input')
    inputCheck.setAttribute('type', 'checkbox');
    inputCheck.classList.add('checkbox-round')
    const span = document.createElement('span')
    span.classList.add('tasks-span')
    span.innerText = valor
    res.appendChild(span)
    task.appendChild(inputCheck)
    task.appendChild(span)
    const buttonRemove = document.createElement('button')
    buttonRemove.classList.add('button-cross')
    taskRes.appendChild(buttonRemove)
    res.appendChild(taskRes)
    
    const taskResString = taskRes.innerHTML
    return { idItem, valor, taskResString  }
}

add.addEventListener('click', (e) => {
    e.preventDefault();
    const valor = document.querySelector('#text');
    if(valor) {
        const itemList = criarItem(valor.value);
        arrTask.push(itemList);

        localStorage.setItem('taskStorage', JSON.stringify(arrTask));
        let getTaskStorage = localStorage.getItem('taskStorage');
    }
    
    valor.value = ' ';
    valor.focus() 
})

// localStorage.clear() 