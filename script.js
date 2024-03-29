const add = document.querySelector('.tasks-input');
const res = document.querySelector('#res');
const noTask = document.querySelector('.no-task');
const cancel = document.querySelector('#cancel');
const btnClear = document.querySelector('#Clear');
const amout = document.querySelector('#amout');
const inputAdd = document.querySelector('#addInput')
const inputValor = document.querySelector('#text');
const allDatas = JSON.parse(localStorage.getItem('datas'));
let itens = localStorage.getItem('datas') !== null ? allDatas : [];
const charMax = 55;

function IdAleatorio() {
    const id = Date.now();
    return id;
}

function tarefaFeita(id){
    const dados = JSON.parse(localStorage.getItem('datas'));
    const tarefa = dados.find(item => item.id === id);
    tarefa.finalizado = !tarefa.finalizado;
    localStorage.setItem('datas', JSON.stringify(dados));
    itens = dados;

    Renderizar();
}

add.addEventListener("submit", (event) => {
    event.preventDefault();
    const valor = inputValor.value;
    if (valor.trim() === ''  || valor.split(" ").join("").length > charMax) {
        alert('Número de caracteres inválido');
    } else {
        const data = {
            valor,
            id: IdAleatorio(),
            finalizado: false
        }

        itens.push(data);
        contagemDeItens();
        renderizarListaVazia();
        Renderizar();
        atualizarLocalStorage();
        inputValor.value = ' '
        inputValor.focus();
    }
});

function atualizarLocalStorage() {
    localStorage.setItem('datas', JSON.stringify(itens));
}

function Renderizar() {
    res.innerHTML = ' ';
    itens.map(item => {
        res.insertAdjacentHTML("afterbegin", `
                <div class="tasks-res ${item.finalizado ? 'finalizada' : ''}" id="${item.id}">
                    <form class="tasks">
                        <input type="checkbox" class="checkbox-round" onClick='tarefaFeita(${item.id})' ${item.finalizado ? 'checked' : ''}>
                        <button type="submit" class="button-edit hidden" onClick="Update(${item.id})"><i class="fa-solid fa-right-left"></i></button>
                        <div class="container-tasks-span">
                            <span class="tasks-span">
                                ${item.valor}
                            </span>
                        </div>
                        <span class="input-span">
                        <input type="text" id="editText-${item.id}" class="hidden editText">
                        </span>
                    </form>
                    <div class="tasks-btn">
                    <button class="button-toggle" onClick='toggleForm(${item.id})'${item.finalizado ? 'disabled' : ''} ><img src='./assets/editar.png' alt="excluir"></button>
                    <button class="button-cross" onClick='Delete(${item.id})'><img src='./assets/excluir.png' alt="excluir"></button>
                    <button class="cancel hidden" onClick=Cancelar(${item.id})><i class="fa-solid fa-circle-xmark"></i></button>
                    </div>
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
    atualizarLocalStorage();
    itemremove.remove();
    contagemDeItens();
    renderizarListaVazia();
}

function renderizarListaVazia() {
    if (itens.length === 0) {
        res.innerHTML = '<div class="no-task"><span class="hidden-tasks">Nenhum registro existente</span ></div >';
    }
}

btnClear.addEventListener('click', () => {
    localStorage.clear();
    itens = [];
    res.innerHTML = ' ';
    contagemDeItens()
    renderizarListaVazia();
});

function toggleForm(id) {
    const taskRes = document.querySelector(`.tasks-res[id="${id}"]`);
    const btnEdit = taskRes.querySelector('.button-edit');
    const checkbox = taskRes.querySelector('.checkbox-round');
    const spanTask = taskRes.querySelector('.tasks-span');
    const inputEdit = taskRes.querySelector(`#editText-${id}`);
    const btnUpdate = taskRes.querySelector('.button-toggle');
    const btnDelete = taskRes.querySelector('.button-cross');
    const btnCancel = taskRes.querySelector('.cancel');

    btnEdit.classList.toggle('hidden');
    checkbox.classList.toggle('hidden');
    spanTask.classList.toggle('hidden');
    inputEdit.classList.toggle('hidden');
    btnUpdate.classList.toggle('hidden');
    btnDelete.classList.toggle('hidden');
    btnCancel.classList.toggle('hidden');

    const editEl = spanTask.innerText;
    inputEdit.value = editEl.trim();

}

function Update(id) {
    const taskRes = document.querySelector(`.tasks-res[id="${id}"]`);
    const inputEdit = taskRes.querySelector(`#editText-${id}`);
    const objeto = itens.find(item => item.id === id);
    const valor = inputEdit.value.trim();
  
    if (valor === "" || valor.split(" ").join("").length > charMax) {
      alert("Invalid Task");

    } else {
      objeto.valor = valor;
      atualizarLocalStorage();
      toggleForm(id);
      Renderizar();
    }
  }
  

function Cancelar(id) {
    toggleForm(id);
}

Renderizar();
renderizarListaVazia();
contagemDeItens();