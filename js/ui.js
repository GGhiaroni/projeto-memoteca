import api from "./api.js";

const ui = {
    async renderizarDados() {
        try {
            const dados = await api.buscarDados();
            dados.forEach(ui.adicionarDadosNaLista);
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

        const dadoAutoria = document.createElement("div");
        dadoAutoria.textContent = dado.autoria;
        dadoAutoria.classList.add("pensamento-autoria");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => {
            ui.preencherFormularioParaEdicao(dado.id);
        };

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeEditar.alt = "ícone lápis para editar pensamento";
        botaoEditar.appendChild(iconeEditar);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoEditar);

        li.appendChild(iconeAspas);
        li.appendChild(dadoConteudo);
        li.appendChild(dadoAutoria);
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
    }
};

export default ui;