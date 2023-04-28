const add = document.querySelector('.tasks-input');
const spanTask = document.querySelector('.tasks-span');
const res = document.querySelector('#res');
const noTask = document.querySelector('.no-task');
const btnAll = document.querySelector('#All');
const btnActive = document.querySelector('#Active');
const btnCompleted = document.querySelector('#Completed');
const btnClear = document.querySelector('#Clear');
const amout = document.querySelector('#amout');
const allDatas = JSON.parse(localStorage.getItem('datas'));
let itens = localStorage.getItem('datas') !== null ? allDatas : [];
const charMax = 30;


function IdAleatorio() {
    const id = Date.now();
    return id;
}

add.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValor = document.querySelector('#text');
    const valor = inputValor.value;
    if (valor.trim() === '' || valor.split(' ').join('').length > charMax) {
        alert('invalid Task');
    } else {
        const data = {
            valor,
            id: IdAleatorio()
        }

        itens.push(data);
        contagemDeItens();
        renderizarListaVazia();
        Renderizar();
        atualizarLocalStorage();
        inputValor.value = ' '
        inputValor.focus()
    }
});

function atualizarLocalStorage() {
    localStorage.setItem('datas', JSON.stringify(itens));
}

function Renderizar() {
    res.innerHTML = ' '
    itens.forEach(item => {
        res.insertAdjacentHTML("afterbegin", `
                <div class="tasks-res" id="${item.id}">
                    <form class="tasks">
                        <input type="checkbox" class="checkbox-round">
                        <span class="tasks-span" contenteditable="true">
                            ${item.valor}
                        </span>
                    </form>
                    <button class="button-cross" onClick='Delete(${item.id})' />
                </div>`
        )
    });
}

function contagemDeItens() {
    amout.innerText = `${itens.length}`;
}

function Delete(id) {
    itens = itens.filter(item => item.id !== id);
    const itemremove = document.getElementById(`${id}`);
    itemremove.remove();

    contagemDeItens();
    renderizarListaVazia();
    atualizarLocalStorage();
}

function renderizarListaVazia() {
    if (itens.length === 0) {
        res.innerHTML = '<div class="no-task"><span class="hidden-tasks"> No Exixting Records</span ></div >';
    }
}

btnClear.addEventListener('click', () => {
    localStorage.clear();
    itens = [];
    res.innerHTML = ' ';
    renderizarListaVazia();
});


// Update
document.querySelector('#res').addEventListener('input', (e) => {
    const targetEl = e.target;
    const editEl = targetEl.innerText;
    const idEl = Number(targetEl.parentElement.parentElement.id);
    const objeto = itens.find(item => item.id === idEl)
    objeto.valor = editEl;
    atualizarLocalStorage();

});

Renderizar();
renderizarListaVazia();
contagemDeItens();