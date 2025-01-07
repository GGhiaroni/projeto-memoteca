const api = {
    async buscarDados()
    {
        try {
            const response = await fetch('http://localhost:3000/pensamentos');
            return await response.json();
        } catch (error) {
            alert('Erro ao buscar os dados!');
            throw error;
        }
    },

    async salvarDados(dado)
    {
        try {
            const response = await fetch('http://localhost:3000/pensamentos', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dado)
            });
            return await response.json();
        } catch (error) {
            alert('Erro ao buscar os dados!');
            throw error;
        }
    }
};

export default api;