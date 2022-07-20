const body = document.querySelector("body")
const inputText = document.getElementById("pesquisa")
const button = document.getElementById("adicionar-tarefa")
const qtd_tarefas = document.getElementById("quantidade-tarefas")
const lista = document.querySelector(".lista-tarefas")
const section_form = document.querySelector(".section-form")

let arrayTarefas = []
// const arrayTarefas = JSON.parse(localStorage.getItem(lista))

// function salvarAlteracoes() {
//     localStorage.setItem(lista, JSON.stringify(arrayTarefas))
// }

function adicionarTarefa() {
    const textValue = inputText.value.trim()
    if (textValue !== "") {
        const novaTarefa = {}
        novaTarefa.nome = textValue
        novaTarefa.status = false
        arrayTarefas.push(novaTarefa)
        listarTarefas(arrayTarefas, lista)
        inputText.value = ""
        // salvarAlteracoes()
    }
}

function listarTarefas(arrayTarefas, secao) {
    secao.innerHTML = ""
    arrayTarefas.forEach((i, item) => {
        const tarefa = i
        const template = criarTemplate(tarefa, item)
        secao.appendChild(template)
    })
    qtd_tarefas.innerText = `Quantidade de Tarefas: ${arrayTarefas.length}`
}

function criarTemplate(tarefa, id) {
    const li = document.createElement("li")
    li.innerHTML = `
        <img class='remover' id=${id} src="./src/imgs/lixeira.svg" alt="lixeira | logo">
        <h4 id='${id}'>${tarefa.nome}</h4>
        <img class='editar' id=${id} src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/2x/external-pencil-brand-identity-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png">
    `
    li.classList.add("tarefa")
    return li
}

function removerTarefa(event) {
    const localEvento = event.target
    if (localEvento.classList.contains("remover")) {
        const index = localEvento.id
        arrayTarefas.splice(index, 1)
        listarTarefas(arrayTarefas, lista)
        // salvarAlteracoes()
    }
}

let id = 0

function editarTarefa(event) {
    const section_alteracao = document.getElementById("section-alteracao")
    const alterar = document.getElementById("img-alterar-tarefa")
    const manter = document.getElementById("img-manter-tarefa")
    const localEvento = event.target
    id = event.target.id
    if (localEvento.classList.contains("editar")) {
        section_alteracao.style.display = "flex"
        const input = document.getElementById("input-trocar-tarefa")
        alterar.addEventListener("click", () => {
            if (input.value == "") {
                const section = document.querySelector(".section-alert")
                section.style.display = "flex"
                section.innerHTML = `
                    <div class="camp-alert">
                        <h2>Campo não pode estar vazio</h2>
                        <img class="closed" src="https://cdn-icons-png.flaticon.com/512/18/18297.png" alt="botao | fechar">
                    <div>
                `
                const closed = document.querySelector(".closed")
                closed.addEventListener("click", (event) => {
                    let localEvento = event.target
                    if (localEvento.tagName == "IMG") {
                        section.style.display = "none"
                    }
                })
            } else {
                arrayTarefas[id].nome = input.value
                listarTarefas(arrayTarefas, lista)
                section_alteracao.style.display = "none"
            }
        })
        manter.addEventListener("click", () => {
            section_alteracao.style.display = "none"
        })
        input.value = ""
    }
}

function limparTarefas(event) {
    const localEvento = event.target
    if (localEvento.classList.contains("limpar-tarefas")) {
        const section = document.createElement("section")
        section.style.display = "flex"
        section.classList.add("section-limpeza")
        section.innerHTML = `
            <div class="camp-limpeza">
                <h2>Você tem certeza?</h2>
                <div class="confirmar-limpeza">
                    <img class="confirmar" src="https://cdn-icons-png.flaticon.com/512/25/25179.png" alt="botao | confirmação">
                    <img class="fechar" src="https://cdn-icons-png.flaticon.com/512/18/18297.png" alt="botao | fechar">
                <div>
            <div>
        `
        body.append(section)

        const confirmar = document.querySelector(".confirmar")
        const fechar = document.querySelector(".confirmar")

        section.addEventListener("click", (event) => {
            const localEvento = event.target
            if (localEvento.classList.contains("confirmar")) {
                arrayTarefas = []
                listarTarefas(arrayTarefas, lista)
                section.style.display = "none";
            } else if (localEvento.classList.contains("fechar")) {
                section.style.display = "none";
            }
        })
    }
}

section_form.addEventListener("click", limparTarefas)
button.addEventListener("click", adicionarTarefa)
lista.addEventListener("click", editarTarefa)
lista.addEventListener("click", removerTarefa)

listarTarefas(arrayTarefas, lista)