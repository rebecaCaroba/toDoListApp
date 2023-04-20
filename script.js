const add = document.querySelector('#add');
const res = document.querySelector('#res');
const btnAll = document.querySelector('#All');
const arrTask = [];
const cont = 0;

function criarItem(valor){
    const itemElementoDiv = document.createElement('div');
    itemElementoDiv.classList.add("tasks-res")

    const spanValor = document.createElement("span")
    spanValor.innerText = valor
    itemElementoDiv.appendChild(spanValor)
}

add.addEventListener('click', (e) => {
    e.preventDefault();
    const valor = document.querySelector('#text');
    if(valor) {
        console.log(valor)
        const itemList = criarItem(valor.value);
    }
})


// Delete
document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');


    if(targetEl.classList.contains("button-cross")){
        parentEl.classList.add('hidden')
        addActive(parentEl);
    }
})
