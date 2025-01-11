import api from "./api.js";

const ui = {
    async renderizarDados(cardsFiltrados = null) {
        try {
            const listaPensamentos = document.getElementById("lista-pensamentos");
            listaPensamentos.innerHTML = '';

            let cardsARenderizar;

            if (cardsFiltrados) {
                cardsARenderizar = cardsFiltrados;
            } else {
                cardsARenderizar = await api.buscarDados();
            }
            cardsARenderizar.forEach(ui.adicionarDadosNaLista);
        } catch (error) {
            throw error;
        }
    },

    adicionarDadosNaLista(dado) {
        const listaPensamentos = document.getElementById('lista-pensamentos');

        const li = document.createElement("li");
        li.setAttribute("data-id", dado.id);
        li.classList.add("li-pensamento");

        const iconeAspas = document.createElement("img");
        iconeAspas.src = "assets/imagens/aspas-azuis.png";
        iconeAspas.alt = "Aspas azuis";
        iconeAspas.classList.add("icone-aspas");

        const dadoConteudo = document.createElement("div");
        dadoConteudo.textContent = dado.conteudo;
        dadoConteudo.classList.add("pensamento-conteudo");

        const cardData = document.createElement("div");
        var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC"
        };
        const dataFormatada = dado.data.toLocaleDateString('pt-BR', options)

        cardData.textContent = dataFormatada;
        cardData.classList.add("pensamento-data");

        const dadoAutoria = document.createElement("div");
        dadoAutoria.textContent = dado.autoria;
        dadoAutoria.classList.add("pensamento-autoria");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => {
            ui.preencherFormularioParaEdicao(dado.id);
        };

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = () => {
            api.excluirDado(dado.id);
        };

        const botaoFavorito = document.createElement("button");
        botaoFavorito.classList.add("botao-favorito");
        botaoFavorito.onclick = async () => {
            try {
                await api.atualizarFavorito(dado.id, !dado.favorito);
                ui.renderizarDados();
            } catch (error) {
                throw error;
            }
        };

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeEditar.alt = "ícone lápis para editar card";
        botaoEditar.appendChild(iconeEditar);

        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "ícone lápis para excluir card";
        botaoExcluir.appendChild(iconeExcluir);

        const iconeFavorito = document.createElement("img");
        iconeFavorito.src = dado.favorito ? "assets/imagens/icone-favorito.png"
            : "assets/imagens/icone-favorito_outline.png";
        iconeFavorito.alt = "ícone favorito";
        botaoFavorito.appendChild(iconeFavorito);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoFavorito);
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(dadoConteudo);
        li.appendChild(dadoAutoria);
        li.appendChild(cardData);
        li.appendChild(icones);

        listaPensamentos.appendChild(li);
    },

    limparFormulario()
    {
        document.getElementById("pensamento-form").reset();
    },

    async preencherFormularioParaEdicao(id)
    {
        const dado = await api.buscarDadoUnicoPorId(id);

        document.getElementById("pensamento-id").value = dado.id;
        document.getElementById("pensamento-conteudo").value = dado.conteudo;
        document.getElementById("pensamento-autoria").value = dado.autoria;
        document.getElementById("pensamento-data").value = dado.data;
        document.getElementById("form-container").scrollIntoView();
    }
};

export default ui;