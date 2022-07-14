const inputText = document.getElementById("pesquisa");
const button = document.getElementById("adicionar-tarefa");
const qtd_tarefas = document.getElementById("quantidade_tarefas");
const lista = document.querySelector(".lista-tarefas");
const section_form = document.querySelector(".section-form");

let arrayTarefas = [];
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
        <h4 id='${id}'>${tarefa.nome}</h4>
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

let id = 0;

function editarTarefa(event) {
    const section_alteracao = document.getElementById("section-alteracao");
    const alterar = document.getElementById("img-alterar-tarefa");
    const manter = document.getElementById("img-manter-tarefa");
    const localEvento = event.target;

    id = event.target.id;

    if (localEvento.classList.contains("editar")) {
        section_alteracao.style.display = "flex";
        
        const input = document.getElementById("input-trocar-tarefa");

        alterar.addEventListener("click", () => {
            arrayTarefas[id].nome = input.value;
            listarTarefas(arrayTarefas, lista);
            section_alteracao.style.display = "none";
        })

        manter.addEventListener("click", () => {
            section_alteracao.style.display = "none";
        })

        input.value = "";
    }
}

function limparTarefas(event) {
    const localEvento = event.target;
    if (localEvento.classList.contains("limpar_tarefas")) {
        arrayTarefas = [];
        listarTarefas(arrayTarefas, lista);
    }
}

section_form.addEventListener("click", limparTarefas);
button.addEventListener("click", adicionarTarefa);
lista.addEventListener("click", editarTarefa);
lista.addEventListener("click", removerTarefa);

listarTarefas(arrayTarefas, lista);