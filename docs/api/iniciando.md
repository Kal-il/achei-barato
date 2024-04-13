# Inicializando a API
#### Autores:
- Romeu Borges - @romeuborges19

Este documento tem como objetivo fornecer um passo a passo de como inicializar o back-end do projeto num ambiente de desenvolvimento.

### Requisitos:
- Ter o PostgreSQL e o PgAdmin 4 instalados e configurados na sua máquina
- Ter o Python instalado, preferencialmente na versão 3.11.5

### Considerações:
- É necessário criar uma instância do banco de dados pelo PgAdmin 4
- Criar, na raiz do projeto, um arquivo `.env`, para configurar as variáveis de ambiente
- Caso você deseje testar a integração do front com o back, é interessante já ter o front rodando no ExpoGo antes de iniciar a API

## Passo a Passo

#### Variáveis de ambiente

Para configurar as variáveis de ambiente, use como modelo o arquivo `.env.example`, presente no diretório da API.

Copie o conteúdo do `.env.example` para um arquivo `.env` na raiz do projeto e insira o valor correto de cada variável.

Exemplo:

```
DB_ENGINE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db_achei_barato
DB_USER=meu_usuario
DB_PASSWORD=minha_senha
```

#### Inicializando o a API

Na raiz do projeto, entre no diretório da API: 

``` 
cd api
```

Crie um ambiente virtual:

```
python -m venv venv
```

Inicialize o ambiente virtual.

No Windows:
```
venv\Scripts\activate
```

No Linux:
```
source venv\bin\activate
```

Com o ambiente virtual inicializado, instale as dependências com o seguinte comando:

```
pip install -r requirements.txt
```

Depois disso, realize as migrações no banco de dados com o Alembic:

```
alembic upgrade head
```

Caso você seja do front e queira testar a integração com a API, verifique, no terminal do ExpoGo, em qual IP o aplicativo está rodando. Ele deve estar no formato `192.168.x.x`.

Você utilizará esse IP como host para iniciar a API, para garantir que os requests do front cheguem no back devidamente.

Volte para o diretório raiz com `cd ..` e inicie a API com o seguinte comando:

```
uvicorn api.main:app --host <SEU_IP> --port 8000 --reload
```

Caso você não queira testar nenhuma integração, basta usar:
```
uvicorn api.main:app --reload
```

Este comando deve inicializar a aplicação sem erros.