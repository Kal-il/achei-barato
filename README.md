# achei-barato
# Achei Barato
## Projetos de Sistemas - 2024.1 | Universidade Federal do Tocantins - Palmas

**Curso:** Bacharelado em Ciência da Computação \
**Professor:** Edeilson Milhomem da Silva\
**Time**: Ana Flavia Moreira Pires, Cássio Coutinho Lima, Kalil Garcia Canuto, Maria Clara Nazareno Aires, Matheus Henrique Dreher dos Santos, Romeu Miranda Borges

#### Escopo:
- **Épico 1 - Ações e Gerenciamento do Consumidor:** RF01, RF02, RF03, RF04, RF05, RF06;
- **Épico 2 - Ações e Gerenciamento do Mercado:**
- **Épico 3 - Gerenciamento do Produto:**
- **Épico 4 - Gerenciamento da Promoção:**

---
## Definindo os requisitos funcionais do projeto

# Teste

### RF01 - Realizar Login no Aplicativo "Ache Barato"

- **Autor:** @ana-flav - Ana Flavia Moreira Pires
- **Revisor:** @romeuborges19 - Romeu Miranda Borges

#### Descrição:
Este requisito visa permitir que os usuários realizem login no aplicativo "Achei Barato" para acessar suas funcionalidades. Os usuários poderão inserir suas credenciais de login (e-mail e senha) na página de login do aplicativo. Além disso, eles terão a opção de redirecionamento para a tela de cadastro ou para a tela de redefinição de senha, conforme necessário.

#### Ator principal:
Usuários consumidores, mercado e superuser

#### Pré-condição:
O dispositivo do usuário deve estar conectado à internet e o aplicativo "Achei Barato" deve estar instalado.

#### Pós-condição:
O usuário terá acesso às funcionalidades do aplicativo após o login bem-sucedido.

#### Fluxo principal:
1. O usuário acessa a página de login do aplicativo.
2. O usuário insere seu e-mail e senha nos campos correspondentes.
3. O usuário clica no botão "Entrar".
4. O sistema verifica se as credenciais do usuário estão cadastradas no banco de dados.
   - 4.1. Se sim, exibe a mensagem "Logado com sucesso!".
   - 4.2. Se não, exibe a mensagem "E-mail ou senha não encontrados, tente novamente".

#### Campos do Formulário:
| Campo  | Obrigatório? | Editável? | Formato       |
|--------|--------------|-----------|---------------|
| E-mail | Sim          | Não       | Texto         |
| Senha  | Sim          | Sim       | Alfanumérico  |

#### Opções dos Usuários:
- **Login:** Realiza a autenticação do usuário no banco de dados do aplicativo.
- **Cadastrar:** Redireciona o usuário para a tela de cadastro.
- **Redefinir senha:** Redireciona o usuário para a tela de redefinição de senha.

#### Relatório de usuário:
| Campo                                   | Descrição                                 | Formato |
|-----------------------------------------|-------------------------------------------|---------|
| "Logado com sucesso!"                   | Confirmação do login bem-sucedido         | Texto   |
| "E-mail ou senha não encontrados, tente novamente" | Aviso de credenciais inválidas        | Texto   |

### Fluxos Alternativos:
#### Fluxo alternativo 1:
1. O usuário acessa a página de login do aplicativo.
2. O usuário seleciona a opção "Cadastrar".
3. O usuário é redirecionado para a tela de cadastro.

#### Fluxo alternativo 2:
1. O usuário acessa a página de login do aplicativo.
2. O usuário seleciona a opção "Redefinir senha".
3. O usuário é redirecionado para a tela de redefinição de senha.

#### User Story:
**Persona 01 - Usuário comum**  
**Epic:** Realizar autenticação no aplicativo "Ache Barato".  
**User Story:** Como usuário comum, desejo realizar login no aplicativo "Achei Barato" para acessar suas funcionalidades.  
**Critério de aceitação:** Para fazer login no aplicativo, o usuário deve ter suas credenciais cadastradas no banco de dados do "Achei Barato" e inserir corretamente seu e-mail e senha. Após o login bem-sucedido, o usuário terá acesso às funcionalidades do aplicativo.

## Protótipo
![RF01_-_login](https://uploaddeimagens.com.br/imagens/mG6TXp8)

---

### RF02 - Restaurar Senha no Aplicativo "Achei Barato"

- **Autor:** @ana-flav - Ana Flavia Moreira Pires
- **Revisor:** @romeuborges19 - Romeu Miranda Borges

#### Descrição:
Este requisito visa permitir que os usuários restaurem sua senha no aplicativo "Achei Barato" caso a tenham esquecido. Os usuários terão a opção de solicitar a redefinição de senha, fornecendo seu e-mail registrado. Eles receberão um e-mail com um link seguro para redefinir sua senha.

#### Ator principal:
Usuário utilizador da plataforma.

#### Pré-condição:
O dispositivo do usuário deve estar conectado à internet e o aplicativo "Achei Barato" deve estar instalado.

#### Pós-condição:
O usuário terá a senha redefinida e poderá fazer login com a nova senha.

#### Fluxo principal:
1. O usuário acessa a página de redefinição de senha no aplicativo.
2. O usuário seleciona a opção "Esqueci minha senha".
3. O usuário insere seu e-mail registrado no campo fornecido.
4. O usuário clica no botão "Enviar".
5. O sistema verifica se o e-mail fornecido está registrado no banco de dados.
   - 5.1. Se sim, o sistema envia um e-mail com um link seguro para redefinir a senha.
   - 5.2. Se não, exibe a mensagem "E-mail não encontrado, verifique se você digitou corretamente".
6. O usuário recebe o e-mail com o link para redefinição de senha.
7. O usuário segue o link e redefine sua senha conforme as instruções fornecidas.

#### Campos do Formulário:
| Campo  | Obrigatório? | Editável? | Formato       |
|--------|--------------|-----------|---------------|
| E-mail | Sim          | Não       | Texto         |

#### Opções dos Usuários:
- **Esqueci minha senha:** Inicia o processo de redefinição de senha.

#### Relatório de usuário:
| Campo                                            | Descrição                                                 | Formato |
|--------------------------------------------------|-----------------------------------------------------------|---------|
| "E-mail não encontrado, verifique se você digitou corretamente" | Aviso de e-mail não registrado                          | Texto   |

### Fluxos Alternativos:
#### Fluxo alternativo 1:
1. O usuário acessa a página de login do aplicativo.
2. O usuário seleciona a opção "Esqueci minha senha".
3. O usuário é redirecionado para a página de redefinição de senha.
4. O restante do fluxo segue conforme descrito no fluxo principal.

#### User Story:
**Persona 01 - Usuário comum**  
**Epic:** Restaurar senha no aplicativo "Achei Barato".  
**User Story:** Como usuário comum, desejo poder restaurar minha senha no aplicativo "Achei Barato" caso a tenha esquecido.  
**Critério de aceitação:** O usuário deve poder solicitar a redefinição de senha fornecendo seu e-mail registrado. Após solicitar a redefinição, o usuário deve receber um e-mail com um link seguro para redefinir a senha. O usuário deve ser capaz de redefinir a senha com sucesso seguindo as instruções fornecidas.

---

### RF03 - Registrar Consumidor no Sistema

- **Autor:** @ana-flav - Ana Flavia Moreira Pires
- **Revisor:** @romeuborges19 - Romeu Miranda Borges

#### Descrição:
Este requisito tem como objetivo permitir que os consumidores se registrem no sistema do aplicativo "Achei Barato". Os consumidores precisarão preencher os campos obrigatórios, que incluem email, nome, sobrenome e senha.

#### Ator principal:
Usuário Consumidor.

#### Pré-condição:
O consumidor deve acessar a página de registro do aplicativo "Achei Barato".

#### Pós-condição:
O consumidor terá sua conta registrada no sistema e poderá fazer login no aplicativo.

#### Fluxo principal:
1. O consumidor acessa a página de registro do aplicativo.
2. O consumidor preenche os campos obrigatórios: email, nome, sobrenome e senha.
3. O consumidor clica no botão "Registrar".
4. O sistema verifica se o email fornecido já está em uso.
   - 4.1. Se sim, exibe a mensagem "O email fornecido já está em uso. Por favor, use outro email".
   - 4.2. Se não, registra o consumidor no sistema e exibe a mensagem "Registro bem-sucedido. Agora você pode fazer login".

#### Campos do Formulário:
| Campo      | Obrigatório? | Editável? | Formato       |
|------------|--------------|-----------|---------------|
| Email      | Sim          | Não       | Texto         |
| Nome       | Sim          | Sim       | Texto         |
| Sobrenome  | Sim          | Sim       | Texto         |
| Senha      | Sim          | Sim       | Alfanumérico  |

#### Opções dos Usuários:
- **Registrar:** Inicia o processo de registro do consumidor no sistema.

#### Relatório de usuário:
| Campo                                                               | Descrição                                                               | Formato |
|---------------------------------------------------------------------|-------------------------------------------------------------------------|---------|
| "O email fornecido já está em uso. Por favor, use outro email"     | Aviso de email já registrado                                           | Texto   |
| "Registro bem-sucedido. Agora você pode fazer login"                | Confirmação de registro bem-sucedido                                   | Texto   |

#### Fluxos Alternativos:
Não há fluxos alternativos para este requisito.

#### User Story:
**Persona 01 - Consumidor**  
**Epic:** Registrar Consumidor no Sistema.  
**User Story:** Como consumidor, desejo poder me registrar no sistema do aplicativo "Achei Barato" para acessar suas funcionalidades.  
**Critério de aceitação:** O consumidor deve ser capaz de preencher os campos obrigatórios (email, nome, sobrenome e senha) e clicar no botão "Registrar". O sistema deve verificar se o email fornecido já está em uso e, se não estiver, registrar o consumidor no sistema com sucesso, permitindo que ele faça login posteriormente.

---

### RF04 - Acessar Tela Principal

- **Autor:** @romeuborges19 - Romeu Miranda Borges
- **Revisor:** @ana-flav - Ana Flavia Moreira Pires

#### Descrição:
Este requisito dá ao usuário acesso às principais funcionalidades do aplicativo. Na tela principal, ele poderá visualizar as promoções anunciadas pelos mercados cadastrados e pesquisar promoções e produtos de interesse, através de uma barra de pesquisa.

#### Ator Principal:
Usuário consumidor.

#### Pré-condição:
O usuário deve estar registrado e autenticado no sistema.

#### Opções do Usuário:
| Opção | Descrição |
|----|-----|
| **Acessar Promoção** | Abre tela com informações adicionais sobre a promoção selecionada |
| **Acessar os itens curtidos** | Abre tela com informações específicas sobre os itens curtidos pelo usuário consumidor. |
| **Acessar configurações** | Abre tela que dá ao usuário acesso às configrações do aplicativo. |
| **Pesquisar** | Permite que o usuário obtenha informações sobre protudos e promoções de interesse, de acordo com o filtro aplicado. |

#### User Story
| Épico | User Story | Critério de Aceitação |
|- | - | - |
| Ações e Gerenciamento do Consumidor | Como usuário consumidor, gostaria de visualizar e acessar as promoções cadastradas pelos mercados, além de pesquisar pelos itens que são do meu interesse. | O usuário consumidor deve estar registrado e autenticado no sistema para ter acesso à tela principal. |

## Protótipo
![Home](https://uploaddeimagens.com.br/imagens/m8nro6o)
---

### RF05 - Acessar Tela de Detalhes da Promoção

- **Autor:** @romeuborges19 - Romeu Miranda Borges
- **Revisor:** @ana-flav - Ana Flavia Moreira Pires

#### Descrição
Este requisito tem como objetivo exibir informações adicionais sobre uma promoção em específico. O usuário poderá acessar o nome do produto, o preço, se aquela promoção é a mais barata ou mais próxima, a descrição da promoção e em qual mercado ele pode encontrar a promoção. Além disso, neste requisito, ele poderá curtir e compartilhar a promoção e seguir o mercado que a cadastrou.

| Item | Descrição |
|-|-|
| **Ator Principal** | Usuário consumidor |
| **Ator Secundário** | Mercado |
| **Pré-condição** | O usuário deve estar registrado e autenticado no sistema. |

#### Opções do Usuário

| Opção | Descrição |
|-|-|
| **Curtir Promoção** | O usuário poderá adicionar a promoção à sua lista de promoções curtidas. |
| **Compartilhar Promoção** | O usuário poderá compartilhar a promoção em suas redes sociais. |
| **Seguir Mercado** | O usuário poderá seguir o perfil do mercado. |

#### Fluxo Principal
1. O usuário, autenticado no sistema, acessará a página principal
2. O usuário clicará na promoção que é do seu interesse. Deste modo, ele será levado para tela da promoção selecionada.

#### User Story - Usuário Consumidor
| Épico | User Story | Critério de Aceitação |
|-|-|-|
| Ações e Gerenciamento do Consumidor | Como usuário consumidor, quero visualizar detalhes sobre uma promoção em específico e sobre o mercado que a publicou no sistema. Além disso, quero ser capaz de adicionar essa promoção à minha lista de itens curtidos. | O usuário deve estar registrado e autenticado no sistema. |

## Protótipo
![Produto](https://uploaddeimagens.com.br/imagens/L-3QaSE)

### RF06 - Curtir Promoção

- **Autor:** @romeuborges19 - Romeu Miranda Borges
- **Revisor:** @ana-flav - Ana Flavia Moreira Pires

#### Descrição
Este requisito possibilida ao usuário adicionar uma promoção à sua lista de itens curtidos.
| Item | Descrição |
|-|-|
| **Ator Principal** | Usuário consumidor |
| **Pré-condição** | O usuário deve estar registrado e autenticado no sistema. |
| **Pós-condição** | O usuário terá adicionado uma nova promoção à sua lista de itens curtidos. |

#### Fluxo Principal
1. O usuário, autenticado no sistema, acessará a página principal
2. O usuário clicará na promoção que é do seu interesse.
3. Na tela de detalhes da promoção, o usuário poderá curtir a promoção.

#### Relatório de Usuário
| Relatório | Descrição | Formato |
|-|-|-|
| O ícone de promoção será alterado | Demonstra que a promoção foi devidamente adicionada à lista de itens curtidos. | Ícone |

#### User Story - Usuário Consumidor
| Épico | User Story | Critério de Aceitação |
|-|-|-|
| Ações e Gerenciamento do Consumidor | Como usuário consumidor, quero adicionar uma promoção à minha lista de itens curtidos, para poder acessar suas informações com maior facilidade posteriormente. | O usuário deve estar autenticado no sistema e deve ter acessado a tela de detalhes da promoção de interesse. |
