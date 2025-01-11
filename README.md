# Mural de Pensamentos 🧠✨

## 📖 Descrição do Projeto
Bem-vindo ao **Mural de Pensamentos!** 🎨✨  
Este projeto foi desenvolvido para armazenar, gerenciar e explorar ideias, pensamentos e reflexões de forma interativa. Com funcionalidades completas de CRUD (Criar, Ler, Atualizar e Deletar), o sistema também possui mecanismos avançados como busca por filtros, validação de conteúdo, e até marcação de favoritos ⭐.

Utilizei tecnologias modernas como JavaScript ES6, manipulação de DOM, funções assíncronas com async/await, regex para validação de dados e a API do Live Server para simular um banco de dados.

## 🎯 Funcionalidades

### 🔧 CRUD
- **Criar**: Adicione um novo pensamento ao mural com título, autoria e data.
- **Atualizar**: Edite os pensamentos existentes com facilidade.
- **Deletar**: Remova pensamentos indesejados.
- **Evitar duplicações**: Garantia de que não há pensamentos duplicados usando a estrutura Set.

### 🔍 Busca e Filtros
- **Busca em tempo real**: Localize pensamentos por conteúdo ou autoria com um filtro dinâmico.

### ⭐ Favoritar
- **Destaque os pensamentos** que você mais gosta marcando-os como favoritos.

### 🛡️ Validações
- **Conteúdo**: Aceita apenas textos com pelo menos 10 caracteres (letras e pontuações permitidas).
- **Autoria**: Aceita apenas nomes com 3 a 15 caracteres (somente letras).
- **Data**: Apenas datas válidas e não futuras.

## 🛠️ Tecnologias e Ferramentas
- **JavaScript ES6** (com foco em async/await, regex e manipulação de DOM).
- **Live Server** para simular um backend.
- **Set** para evitar duplicações de pensamentos.

## 📜 Como Funciona o Código

### 📂 Arquitetura
- **index.html**: Estrutura principal da aplicação.
- **style.css**: Estilos do mural.
- **script.js**: Gerenciamento das interações e lógica principal.
- **api.js**: Comunicação com o backend simulado no Live Server.
- **ui.js**: Responsável por renderizar e atualizar a interface do usuário.

### 🔗 Principais Funções
- **Validação com Regex**: Valida o conteúdo e autoria com expressões regulares (`regexConteudo` e `regexAutoria`).
- **Gerenciamento de Cards com Set**: Utiliza a estrutura **Set** para criar uma chave única baseada em conteúdo e autoria, evitando duplicações.
- **Manipulação de DOM**: Renderização de pensamentos e suas interações (editar, deletar, favoritar).
- **Funções Assíncronas**: Comunicação com a API do Live Server para busca, adição e atualização de dados.

## 📸 Interface do Usuário

### Mural Inicial Vazio:
- **Mensagem motivacional** para incentivar o usuário a começar.
- **Botão** para adicionar o primeiro pensamento.

### Cards de Pensamentos:
Cada pensamento exibe:
- Conteúdo, autoria, data e ícones para ações:
  - 🖋️ **Editar**.
  - ❌ **Deletar**.
  - ⭐ **Favoritar** (ou remover dos favoritos).

### Barra de Busca:
- **Busca em tempo real** que filtra os pensamentos pelo termo inserido.
