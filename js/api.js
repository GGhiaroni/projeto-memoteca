const URL_BASE = "http://localhost:3000";

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
            const response = await axios.post(`${URL_BASE}/pensamentos`, dado);
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
    }
}

export default api;