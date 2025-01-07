import api from "./api.js";
import ui from "./ui.js";

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarDados();

    const formulario = document.getElementById("pensamento-form");

    formulario.addEventListener('submit', handleSubmitFormulario);
});

async function handleSubmitFormulario(e)
{
    e.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        await api.salvarDados({ conteudo, autoria });
        ui.renderizarDados();
    } catch (error) {
        alert("Ocorreu um erro ao salvar!");
        throw error;
    }
}