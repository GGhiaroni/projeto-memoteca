import api from "./api.js";
import ui from "./ui.js";

const regexConteudo = /^[A-Za-zÀ-ÿ\s.,!?]{10,}$/;

function validarConteudoRegex(conteudo) {
    return regexConteudo.test(conteudo);
};

const regexAutoria = /^[a-zA-z]{3,15}$/;

function validarAutoriaRegex(autoria) {
    return regexAutoria.test(autoria);
};

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarDados();
    verificarMuralVazio();

    const formulario = document.getElementById("pensamento-form");

    formulario.addEventListener('submit', handleSubmitFormulario);

    const botaoCancelar = document.getElementById("botao-cancelar");
    botaoCancelar.onclick = () => {
        ui.limparFormulario();
    };

    const inputBusca = document.getElementById("campo-busca");

    inputBusca.addEventListener("input", handleInputBusca);

});

async function handleSubmitFormulario(e)
{
    e.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value.trim();
    const autoria = document.getElementById("pensamento-autoria").value.trim();
    const data = document.getElementById("pensamento-data").value;

    if (!validarConteudoRegex(conteudo)) {
        alert("É permitida a inclusão apenas de letras e comentários com, no mínimo, 10 caracteres.");
        return;
    };

    if (!validarAutoriaRegex(autoria)) {
        alert("Para cadastrar um autor, é permitida a inclusão apenas de letras, com 3 caracteres no mínimo e, no máximo, 10.");
        return;
    }

    if (!validarData(data)) {
        alert("Não é possível selecionar uma data futura. Selecione outra data.");
        ui.limparFormulario();
        return;
    };        

    try {
        if (id)
        {
            await api.editarDado({id, conteudo, autoria, data});
        } else {
            await api.salvarDados({ conteudo, autoria, data });
        }
        ui.renderizarDados();
    } catch (error) {
        alert("Ocorreu um erro ao salvar!");
        throw error;
    }
}

async function verificarMuralVazio()
{
    const feed = await api.buscarDados();

    if (!feed || feed.length === 0) {
        const main = document.querySelector(".background-overlay");

        const sectionFormulario = document.getElementById("form-container");
        sectionFormulario.style.display = "none"

        const botaoParaAdicionarUmPensamentoAoFeed = document.createElement("button");
        botaoParaAdicionarUmPensamentoAoFeed.id = "botao-salvar";
        botaoParaAdicionarUmPensamentoAoFeed.innerText = "Adicionar pensamentos";
        botaoParaAdicionarUmPensamentoAoFeed.style.marginTop = "2rem";

        const h2 = main.querySelector("h2");

        h2.insertAdjacentElement("afterend", botaoParaAdicionarUmPensamentoAoFeed);

        botaoParaAdicionarUmPensamentoAoFeed.onclick = () => {
            sectionFormulario.style.display = "block";

            botaoParaAdicionarUmPensamentoAoFeed.style.display = "none";

            const botaoCancelar = document.getElementById("botao-cancelar");
            botaoCancelar.onclick = () => {
                sectionFormulario.style.display = "none";
                botaoParaAdicionarUmPensamentoAoFeed.style.display = "block";
            };
        };

        const mensagemMuralVazio = document.createElement("p");
        mensagemMuralVazio.textContent = "Nada por aqui ainda, que tal compartilhar alguma ideia?";
        mensagemMuralVazio.style.textAlign = "center";
        mensagemMuralVazio.id = "mensagem-mural-vazio";

        const h3 = main.querySelector("h3");
        h3.insertAdjacentElement("afterend", mensagemMuralVazio);

        const imagemMuralVazio = document.createElement("img");
        imagemMuralVazio.src = "assets/imagens/lista-vazia.png";
        imagemMuralVazio.alt = "imagem lista vazia";

        main.appendChild(imagemMuralVazio);
    }       
}

async function handleInputBusca()
{
    const termoBuscado = document.getElementById("campo-busca").value;
    
    try {
        const cardsFiltrados = await api.buscarCard(termoBuscado);
        ui.renderizarDados(cardsFiltrados);
    } catch (error) {
        alert("Erro ao realizar busca!");
        throw error;
    }
}

function validarData(data) {
    const dataAtual = new Date();
    const dataInseridaNoInput = new Date(data);
    return dataInseridaNoInput <= dataAtual;
}