const api = {
    async buscarDados() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos');
            const dados = await response.json();
            return dados;
        } catch (error) {
            alert('Erro ao buscar os dados!');
            console.log(error);
        }
    }
};

export default api;