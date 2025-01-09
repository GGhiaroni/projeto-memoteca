import api from "./api.js";
import ui from "./ui.js";

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
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        if (id)
        {
            await api.editarDado({id, conteudo, autoria});
        } else {
            await api.salvarDados({ conteudo, autoria });
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