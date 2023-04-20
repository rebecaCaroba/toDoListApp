const form = document.querySelector('form');
const res = document.querySelector('#res');

const arrTask = [];
const cont = 0;

function criarItem(valor){
    const itemElementoDiv = document.createElement('div');
    itemElementoDiv.classList.add("tasks-res")

    const spanValor = document.createElement("span")
    spanValor.innerText = valor
    itemElementoDiv.appendChild(spanValor)

    
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valor = document.querySelector('#text');
    if(valor) {
        const itemList = criarItem(valor.value);
    }
})