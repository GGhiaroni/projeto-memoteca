import api from "./api.js";

const ui = {
    async renderizarDados() {
        const listaPensamentos = document.getElementById('lista-pensamentos');

        try {
            const dados = await api.buscarDados();
            dados.forEach(dado => {
                listaPensamentos.innerHTML += `
                    <li class="li-pensamento" data-id="${dado.id}">
                    <img src="assets/imagens/aspas-azuis.png" alt="Aspas azuis" class="icone-aspas">
                    <div class="pensamento-conteudo">${dado.conteudo}</div>
                    <div class="pensamento-autoria">${dado.autoria}</div>
                    </li>
                `;
            });
            
        } catch (error) {
            throw error;
        }
    }
};

export default ui;