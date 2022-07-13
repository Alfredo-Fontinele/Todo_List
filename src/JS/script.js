const inputText = document.querySelector("input");
const button = document.querySelector("button");
const lista = document.querySelector(".lista-tarefas");
const qtd_tarefas = document.getElementById("quantidade_tarefas");

const arrayTarefas = [];
// const arrayTarefas = JSON.parse(localStorage.getItem(lista));

// function salvarDados() {
//     localStorage.setItem(lista, JSON.stringify(arrayTarefas));
// }

function adicionarTarefa() {
    const textValue = inputText.value.trim();
    if (textValue !== "") {
        const novaTarefa = {};
        novaTarefa.nome = textValue;
        novaTarefa.status = false;
        arrayTarefas.push(novaTarefa);
        listarTarefas(arrayTarefas, lista);
        inputText.value = "";
        // salvarDados();
    }
}

function listarTarefas(arrayTarefas, secao) {
    secao.innerHTML = "";
    for (let i in arrayTarefas) {
        const tarefa = arrayTarefas[i];
        const template = criarTemplate(tarefa, i);
        secao.appendChild(template);
    }
    qtd_tarefas.innerText = `Quantidade de Tarefas: ${arrayTarefas.length}`;
}

function criarTemplate(tarefa, id) {
    const li = document.createElement("li");
    li.innerHTML = `
        <img class='remover' id=${id} src="./src/imgs/lixeira.svg" alt="lixeira | logo">
        <h4>${tarefa.nome}</h4>
        <img class='editar' id=${id} src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/2x/external-pencil-brand-identity-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png">
    `;
    li.classList.add("tarefa");
    return li;
}

function removerTarefa(event) {
    const localEvento = event.target;
    if (localEvento.classList.contains("remover")) {
        const index = localEvento.id;
        arrayTarefas.splice(index, 1);
        listarTarefas(arrayTarefas, lista);
        // salvarDados();
    }
}

function editarTarefa(event) {
    const localEvento = event.target;
    if (localEvento.classList.contains("editar")) {
        console.log("Editar");
    }
}

button.addEventListener("click", adicionarTarefa);
lista.addEventListener("click", removerTarefa);
lista.addEventListener("click", editarTarefa);

listarTarefas(arrayTarefas, lista); 