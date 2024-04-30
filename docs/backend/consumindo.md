# Consumindo a API
**Última edição:** 20/04/2024\
**Autor:** Romeu Borges - @romeuborges19

Seguem abaixo alguns esclarecimentos e instruções sobre o consumo da API por parte do front-end, além de explicações sobre as funcionalidades implementadas para realizá-lo.

#### Requisitos:
- Ter a API e o banco de dados rodando na sua máquina (ver instruções em `iniciando.md`)
- Ter definido a variável `EXPO_PUBLIC_IP_HOST` no seu arquivo `.env`, dentro do diretório do front, seguindo o exemplo disponível em `.env.example`

---
### 1. Classe ApiClient

Dentro do front, existe uma classe que é responsável por enviar e receber dados da API através dos endpoints implementados.

Você pode encontrá-la em `app/ExpoGo/src/api/ApiClient.js`.

``` javascript
export class ApiClient {
    // Classe que realiza o consumo da API. Qualquer chamada de API 
    // deve ser implementada como método assíncrono desta classe.
    constructor() {
        this._apiBaseUrl = `http://${process.env.EXPO_PUBLIC_IP_HOST}:8000/`;
        this._authenticator = new Authenticator();
    }
    ...
```

Ela conta com os atributos privados:
- `_apiBaseUrl`: URL de conexão com a API;
- `_autheticator`: Classe que implementa métodos específicos de autenticação.

### 2. Como realizar uma chamada de API

Através da classe ApiClient, você consegue trocar dados com a API facilmente.

Primeiro, dentro dela, você cria um _método assíncrono_ que será responsável por enviar uma requisição.


Esse método assíncrono deve fazer duas coisas:
1. Recebe, como parâmetro, os dados do formulário (neste caso, `formData`). 

Sempre que uma função enviar dados para a API, ela deve receber uma variável do tipo `Object` como parâmetro, que simula um JSON com todos os campos que serão enviados para serem tratados pelo back-end.

``` javascript
// Aqui, 'data' é a variável de tipo Object que será passada para o método
// de criação do usuário.
data = {
    nome: username,
    email: email,
    password: password
}
```

2. Chamar o método privado `_callApi`, passando como parâmetros:
- O **endpoint** desejado
- O **método** da requisição
- Os dados que serão enviados para a API. Caso você não queira enviar nenhum dado, basta passar `null`.

Seu método será parecido com este:

``` javascript
async createMercado (formData) {
    return await this._callApi("api/v1/usuario/usuario/register", "POST", formData);
}
```

O `this._callApi` verifica se o usuário está autenticado e envia a requisição para a API.

Depois de implementar o seu método, você pode chamar a API na sua interface através de um código parecido com este:

``` javascript
const handleRegister = async () => { 
    // Este código instancia um objeto da classe ApiClient e chama um método 
    // da API que registra o usuário no sistema.

    data = {
        nome: username,
        email: email,
        password: password
    }

    const api = new ApiClient();
    await api.createUser(data);
}
```
### 3. Tratamento de erros

A API pode retornar erros que devem  ser tratados pelo front. Para receber os erros retornados, você deve fazer o seguinte:

``` javascript
const handleRegister = async () => { 
    // Este código instancia um objeto da classe ApiClient e chama um método 
    // da API que registra o usuário no sistema.

    data = {
        nome: username,
        email: email,
        password: password
    }

    const api = new ApiClient();

    let erros;
    try {
        await api.createUser(data);
    } catch (err) {
        erros = err.response.data.detail;
    }
}
```

As mensagens de erro retornadas pela api podem ser acessadas pelo atributo `detail`, presente na resposta da API. Essas mensagens devem ser pegas pelo try catch e passadas para uma variável que as armazene.

A partir daí, cabe a você decidir como esses erros serão tratados e renderizados no front.


