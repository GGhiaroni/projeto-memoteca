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

        li.appendChild(iconeAspas);
        li.appendChild(dadoConteudo);
        li.appendChild(dadoAutoria);

        listaPensamentos.appendChild(li);
    },

    limparFormulario()
    {
        document.getElementById("pensamento-form").reset();
    }
};

export default ui;