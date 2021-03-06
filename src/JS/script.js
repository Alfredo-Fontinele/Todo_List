const body = document.querySelector("body")
body.classList.add("animation-gradient")

const inputText = document.getElementById("pesquisa")
const button = document.getElementById("adicionar-tarefa")
const qtd_tarefas = document.getElementById("quantidade-tarefas")
const lista = document.querySelector(".lista-tarefas")
const section_form = document.querySelector(".section-form")

let arrayTarefas = []
// const arrayTarefas = JSON.parse(localStorage.getItem(lista))

// const salvarAlter = acoes() => {
//     localStorage.setItem(lista, JSON.stringify(arrayTarefas))
// }

const adicionarTarefa = () => {
    const textValue = inputText.value.trim()
    if (textValue == "") {
        const section = document.createElement("section")   
        section.style.display = "flex"
        section.classList.add("section-alert-tarefa")
        section.innerHTML = `
            <div class="camp-alert-tarefa">
                <h2>Campo de Tarefa não pode estar vazio</h2>
                <img class="fechar" src="./src/imgs/alterar_tarefa.svg" alt="img | alterar tarefa">
            <div>
        `
        body.append(section)
        section.addEventListener("click", (event) => {
            const localEvento = event.target
            if (localEvento.classList.contains("fechar")) {
                section.style.display = "none"
            }
        })
    } else {
        const novaTarefa = {}
        novaTarefa.nome = textValue
        novaTarefa.status = false
        arrayTarefas.push(novaTarefa)
        listarTarefas(arrayTarefas, lista)
        inputText.value = ""
        // salvarAlteracoes()
    }
}

const listarTarefas = (arrayTarefas, secao) => {
    secao.innerHTML = ""
    arrayTarefas.forEach((i, item) => {
        const tarefa = i
        const template = criarTemplate(tarefa, item)
        secao.appendChild(template)
    })
    qtd_tarefas.innerText = `Quantidade de Tarefas: ${arrayTarefas.length}`
}

const criarTemplate = (tarefa, id) => {
    const li = document.createElement("li")
    li.innerHTML = `
        <img class='remover' id=${id} src="./src/imgs/lixeira.svg" alt="lixeira | logo">
        <h4 id='${id}'>${tarefa.nome}</h4>
        <img class='editar' id=${id} src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/2x/external-pencil-brand-identity-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png">
    `
    li.classList.add("tarefa")
    return li
}

const removerTarefa = (event) => {
    const localEvento = event.target
    if (localEvento.classList.contains("remover")) {
        const index = localEvento.id
        arrayTarefas.splice(index, 1)
        listarTarefas(arrayTarefas, lista)
        // salvarAlteracoes()
    }
}

let id = 0

const editarTarefa = (event) => {
    const section_alteracao = document.getElementById("section-alteracao")

    section_alteracao.innerHTML = `    
        <div class="alteracao-camp">
            <div class="alteracao-title">
                <h1>Insira sua alteração</h1>
            </div>
            <div class="alteracao-check">
                <input type="text" placeholder="Digite sua tarefa" id="input-trocar-tarefa">
                <div class="imgs-button-tarefa">
                    <img class="alterar-tarefa" id="img-alterar-tarefa" src="./src/imgs/manter_tarefa.svg" alt="img | manter tarefa">
                    <img class="manter-tarefa" id="img-manter-tarefa" src="./src/imgs/alterar_tarefa.svg" alt="img | alterar tarefa">
                </div>
            </div>
        </div>
    `

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
                        <img class="fechar" src="./src/imgs/alterar_tarefa.svg" alt="img | alterar tarefa">
                    <div>
                `
                const closed = document.querySelector(".fechar")
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

const limparTarefas = (event) => {
    const localEvento = event.target
    if (localEvento.classList.contains("limpar-tarefas")) {
        if (arrayTarefas.length < 1) {
            const section = document.createElement("section")
            section.style.display = "flex"
            section.classList.add("section-lista-vazia")
            section.innerHTML = `
                <div class="camp-lista-vazia">
                    <h2>A lista está vazia</h2>
                    <img class="fechar" src="./src/imgs/alterar_tarefa.svg" alt="img | alterar tarefa">
                <div>
            `
            body.append(section)

            section.addEventListener("click", (event) => {
                const localEvento = event.target
                if (localEvento.classList.contains("fechar")) {
                    section.style.display = "none"
                }
            })
        } 
        else {
            const section = document.createElement("section")
            section.style.display = "flex"
            section.classList.add("section-limpeza")
            section.innerHTML = `
                <div class="camp-limpeza">
                    <h2>Você tem certeza?</h2>
                    <div class="confirmar-limpeza">
                        <img class="confirmar" src="https://cdn-icons-png.flaticon.com/512/25/25179.png" alt="botao | confirmação">
                        <img class="fechar" src="./src/imgs/alterar_tarefa.svg" alt="img | alterar tarefa">
                    <div>
                <div>
            `
            body.append(section)
    
            section.addEventListener("click", (event) => {
                const localEvento = event.target
                if (localEvento.classList.contains("confirmar")) {
                    arrayTarefas = []
                    listarTarefas(arrayTarefas, lista)
                    section.style.display = "none"
                } else if (localEvento.classList.contains("fechar")) {
                    section.style.display = "none"
                }
            })
        }
    }
}

section_form.addEventListener("click", limparTarefas)
button.addEventListener("click", adicionarTarefa)
lista.addEventListener("click", editarTarefa)
lista.addEventListener("click", removerTarefa)

listarTarefas(arrayTarefas, lista)