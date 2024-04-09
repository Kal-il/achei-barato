# Achei Barato

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
### RF03 - Registrar Consumidor no Sistema

- **Autor:** @ana-flav - Ana Flavia Moreira Pires
- **Revisor:** @romeuborges19 - Romeu Miranda Borges

#### Descrição:
Este requisito tem como objetivo permitir que os consumidores se registrem no sistema do aplicativo "Achei Barato". Os consumidores precisarão preencher os campos obrigatórios, que incluem email, nome, sobrenome e senha.

#### Ator principal:
Consumidor.

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
