const URL_BASE = "http://localhost:3000";

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split("-");
    return new Date(Date.UTC(ano, mes, dia));
};

const api = {
    async buscarDados()
    {
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos`);
            // return await response.json();
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            return await response.data;
        } catch (error) {
            alert('Erro ao buscar os dados!');
            throw error;
        }
    },

    async salvarDados(dado)
    {
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(dado)
            // });
            // return await response.json();
            const dataConvertida = converterStringParaData(dado.data);
            const response = await axios.post(`${URL_BASE}/pensamentos`, {
                ...dado,
                data: dataConvertida
            });
            return await response.data;
        } catch (error) {
            alert('Erro ao salvar dados!');
            throw error;
        }
    },

    async buscarDadoUnicoPorId(id)
    {
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos/${id}`);
            // return await response.json();
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            return await response.data;
        } catch (error) {
            alert("Erro ao buscar dado!");
            throw error;
        }
    },

    async editarDado(dado)
    {
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos/${dado.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(dado)
            // });
            // return await response.json();
            const response = await axios.put(`${URL_BASE}/pensamentos/${dado.id}`, dado);
            return await response.data;
        } catch (error) {
            alert("Erro ao editar o dado!");
            throw error;
        }
    },

    async excluirDado(id)
    {
        try {
            // await fetch(`${URL_BASE}/pensamentos/${id}`, {
            //     method: "DELETE"
            // });
            await axios.delete(`${URL_BASE}/pensamentos/${id}`);
        } catch (error) {
            alert("Erro ao excluir card!");
            throw error;
        }
    },

    async buscarCard(termo)
    {
        try {
           const cards = await this.buscarDados();
            const termoBuscadoEmMinusculas = termo.toLowerCase();

            const cardsFiltrados = cards.filter(card => {
                return (card.conteudo.toLowerCase().includes(termoBuscadoEmMinusculas) ||
                    card.autoria.toLowerCase().includes(termoBuscadoEmMinusculas));
            });

            return cardsFiltrados; 
            
        } catch (error) {
            alert("Erro ao realizar busca!");
            throw error;
        }
    },

    async atualizarFavorito(id, favorito)
    {
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito });
        } catch (error) {
            alert("Erro ao favoritar card!");
            throw error;
        }
    }
}

export default api;