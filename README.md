=======
# Achei Barato
## Projetos de Sistemas - 2024.1 | Universidade Federal do Tocantins - Palmas

**Curso:** Bacharelado em Ciência da Computação \
**Professor:** Edeilson Milhomem da Silva\
**Time**: Ana Flavia Moreira Pires, Cássio Coutinho Lima, Kalil Garcia Canuto, Maria Clara Nazareno Aires, Matheus Henrique Dreher dos Santos, Romeu Miranda Borges

#### Sobre Achei Barato:
O Achei Barato é seu companheiro de compras, oferecendo as melhores ofertas locais na ponta dos seus dedos. Com informações atualizadas sobre os menores preços, tornamos a economia acessível e parte da sua rotina. Nosso foco é conectar você com ofertas relevantes, economizando tempo e dinheiro. Achei Barato, o aplicativo que entrega oferta na palma da sua mão.

#### Escopo:
- **Épico 1 - Ações e Gerenciamento do Consumidor:** RF01, RF02, RF03, RF04, RF05, RF06;
- **Épico 2 - Ações e Gerenciamento do Mercado:**
- **Épico 3 - Gerenciamento do Produto:**
- **Épico 4 - Gerenciamento da Promoção:**

---
## Definindo os requisitos funcionais do projeto

### RF01 - Realizar Login no Aplicativo "Ache Barato"

- **Autor:** @ana-flav - Ana Flavia Moreira Pires
- **Revisor:** @romeuborges19 - Romeu Miranda Borges

#### Descrição:
Este requisito visa permitir que os usuários realizem login no aplicativo "Achei Barato" para acessar suas funcionalidades. Os usuários poderão inserir suas credenciais de login (e-mail e senha) na página de login do aplicativo. Além disso, eles terão a opção de redirecionamento para a tela de cadastro ou para a tela de redefinição de senha, conforme necessário.

#### User Story:
**Persona 01 - Usuário comum**  
**Epic:** Realizar autenticação no aplicativo "Ache Barato".  
**User Story:** Como usuário comum, desejo realizar login no aplicativo "Achei Barato" para acessar suas funcionalidades.  
**Critério de aceitação:** Para fazer login no aplicativo, o usuário deve ter suas credenciais cadastradas no banco de dados do "Achei Barato" e inserir corretamente seu e-mail e senha. Após o login bem-sucedido, o usuário terá acesso às funcionalidades do aplicativo.

## Protótipo
![RF01_-_login](https://uploaddeimagens.com.br/images/004/767/100/full/RF01_-_login.png?1712597866)

---

### RF02 - Restaurar Senha no Aplicativo "Achei Barato"

- **Autor:** @ana-flav - Ana Flavia Moreira Pires
- **Revisor:** @romeuborges19 - Romeu Miranda Borges

#### Descrição:
Este requisito visa permitir que os usuários restaurem sua senha no aplicativo "Achei Barato" caso a tenham esquecido. Os usuários terão a opção de solicitar a redefinição de senha, fornecendo seu e-mail registrado. Eles receberão um e-mail com um link seguro para redefinir sua senha.

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

#### User Story:
**Persona 01 - Consumidor**  
**Epic:** Registrar Consumidor no Sistema.  
**User Story:** Como consumidor, desejo poder me registrar no sistema do aplicativo "Achei Barato" para acessar suas funcionalidades.  
**Critério de aceitação:** O consumidor deve ser capaz de preencher os campos obrigatórios (email, nome, sobrenome e senha) e clicar no botão "Registrar". O sistema deve verificar se o email fornecido já está em uso e, se não estiver, registrar o consumidor no sistema com sucesso, permitindo que ele faça login posteriormente.

### RF04 - Acessar Tela Principal

- **Autor:** @romeuborges19 - Romeu Miranda Borges
- **Revisor:** @ana-flav - Ana Flavia Moreira Pires

#### Descrição:
Este requisito dá ao usuário acesso às principais funcionalidades do aplicativo. Na tela principal, ele poderá visualizar as promoções anunciadas pelos mercados cadastrados e pesquisar promoções e produtos de interesse, através de uma barra de pesquisa.

#### User Story
| Épico | User Story | Critério de Aceitação |
|- | - | - |
| Ações e Gerenciamento do Consumidor | Como usuário consumidor, gostaria de visualizar e acessar as promoções cadastradas pelos mercados, além de pesquisar pelos itens que são do meu interesse. | O usuário consumidor deve estar registrado e autenticado no sistema para ter acesso à tela principal. |

## Protótipo
![Home](https://uploaddeimagens.com.br/images/004/767/102/full/Home.png?1712597920)
---

### RF05 - Acessar Tela de Detalhes da Promoção

- **Autor:** @romeuborges19 - Romeu Miranda Borges
- **Revisor:** @ana-flav - Ana Flavia Moreira Pires

#### Descrição
Este requisito tem como objetivo exibir informações adicionais sobre uma promoção em específico. O usuário poderá acessar o nome do produto, o preço, se aquela promoção é a mais barata ou mais próxima, a descrição da promoção e em qual mercado ele pode encontrar a promoção. Além disso, neste requisito, ele poderá curtir e compartilhar a promoção e seguir o mercado que a cadastrou.

#### User Story - Usuário Consumidor
| Épico | User Story | Critério de Aceitação |
|-|-|-|
| Ações e Gerenciamento do Consumidor | Como usuário consumidor, quero visualizar detalhes sobre uma promoção em específico e sobre o mercado que a publicou no sistema. Além disso, quero ser capaz de adicionar essa promoção à minha lista de itens curtidos. | O usuário deve estar registrado e autenticado no sistema. |

## Protótipo
![Produto](https://uploaddeimagens.com.br/images/004/767/103/full/Produto.jpg?1712597956)

### RF06 - Curtir Promoção

- **Autor:** @romeuborges19 - Romeu Miranda Borges
- **Revisor:** @ana-flav - Ana Flavia Moreira Pires

#### Descrição
Este requisito possibilida ao usuário adicionar uma promoção à sua lista de itens curtidos.
| Item | Descrição |'"""
|-|-|
| **Ator Principal** | Usuário consumidor |
| **Pré-condição** | O usuário deve estar registrado e autenticado no sistema. |
| **Pós-condição** | O usuário terá adicionado uma nova promoção à sua lista de itens curtidos. |

#### User Story - Usuário Consumidor
| Épico | User Story | Critério de Aceitação |
|-|-|-|
| Ações e Gerenciamento do Consumidor | Como usuário consumidor, quero adicionar uma promoção à minha lista de itens curtidos, para poder acessar suas informações com maior facilidade 
posteriormente. | O usuário deve estar autenticado no sistema e deve ter acessado a tela de detalhes da promoção de interesse. |

### RF17: Visualizar Promoções Curtidas

- **Autor** @Kal-il - Kalil Garcia Canuto
- **Revisor** @MatheusDreher  - Matheus Henrique Dreher dos Santos 

#### Descrição
Este requisito possibilita que o usuário visualize as promoções que ele favoritou.

#### User Story - Usuário Consumidor
| Épico | User Story | Critério de Aceitação |
|-|-|-|
|Ações e Gerenciamento do Consumidor| Como usuário consumidor, quero poder visualizar as promoções que favoritei em meu feed, no menu de notificcações ou no perfil de algum mercado. | O usuário deve estar autenticado no sistema e deve ter acessado a tela de favoritos pela barra de navegação |

## Protótipo
![Produto](https://uploaddeimagens.com.br/images/004/767/863/full/Curtidas.png?1712711295)

---

### RF18: Visualizar Histórico de Comentários em Promoções

- **Autor** @Kal-il - Kalil Garcia Canuto
- **Revisor** @MatheusDreher  - Matheus Henrique Dreher dos Santos 

#### Descrição
Este requisito possibilita que o usuário visualize o histórico de comentários feitos em promoções.

#### User Story - Usuário Consumidor
| Èpico | User Story | Critério de Aceitação |
|-|-|-|
|Ações e Gerenciamento do Consumidor|Como usuário consumidor, quero poder ver o histórico de comentários em promoções para acompanhar as interações dos outros usuários, bem como ver se pessoas que compraram gostaram da promoção ou do produto.|O usuário deve estar autenticado no sistema e acessar a seção de comentários em uma promoção.|

## Protótipo
![Produto](https://uploaddeimagens.com.br/images/004/767/865/full/Produto.jpg?1712711460)

---


### RF19: Receber Notificações de Novas Promoções de Mercados Seguidos

- **Autor** @Kal-il - Kalil Garcia Canuto
- **Revisor** @MatheusDreher  - Matheus Henrique Dreher dos Santos 

#### Descrição
Este requisito possibilita que o usuário receba notificações sobre novas promoções de mercados que ele segue.

#### User Story - Usuário Consumidor
| Èpico | User Story | Critério de Aceitação |
|-|-|-|
|Ações e Gerenciamento do Consumidor|Como usuário interessado em estar sempre atualizado sobre promoções de produtos que tenho interesse e de mercados que sigo, quero receber notificações sobre novas promoções desses mercados, para poder aproveitar as ofertas disponíveis.|O usuário deve estar autenticado no sistema e com a opção de receber notificações ativada nas configurações do aplicativo, bem como precisa estar seguindo algum mercado ou ter mostrado interesse em algum produto da plataforma.|

## Protótipo
![Produto](https://uploaddeimagens.com.br/images/004/767/868/full/Notifica%C3%A7%C3%B5es.jpg?1712711558)

---

### RF20: Definir Preferências de Notificação

- **Autor** @Kal-il - Kalil Garcia Canuto
- **Revisor** @MatheusDreher  - Matheus Henrique Dreher dos Santos 

#### Descrição
Este requisito permite que o usuário defina suas preferências de notificação, como de quais mercados ou produtos especificos deseja receber notificações, bem como se sedeja ou não receber alguma notificação.


#### User Story - Usuário Consumidor
| Èpico | User Story | Critério de Aceitação |
|-|-|-|
|Ações e Gerenciamento do Consumidor|Como usuário interessado em personalizar minha experiência na plataforma, quero poder definir minhas preferências de notificação, para receber apenas notificações relevantes de acordo com meus interesses e necessidades.|O usuário, após autenticado no sistema, deve ser capaz de acessar suas configurações de notificação diretamente através do seu perfil, onde encontrará uma seção específica para gerenciar suas preferências de notificação. Essa seção deve ser facilmente acessível e intuitiva, permitindo ao usuário realizar alterações nas configurações de notificação de forma clara e eficiente, de acordo com suas preferências individuais.|

## Protótipo
![Produto](https://uploaddeimagens.com.br/images/004/767/869/full/Tela_de_Perfil.png?1712711632)

---

### RF21: Denunciar Promoções Inadequadas ou Falsas

- **Autor** @Kal-il - Kalil Garcia Canuto
- **Revisor** @MatheusDreher  - Matheus Henrique Dreher dos Santos 

#### Descrição
Este requisito possibilita que o usuário denuncie promoções consideradas inadequadas ou falsas, contribuindo para a qualidade das promoções disponibilizadas na plataforma.

#### User Story - Usuário Consumidor
| Èpico | User Story | Critério de Aceitação |
|-|-|-|
|Ações e Gerenciamento do Consumidor|Como usuário preocupado com a integridade das promoções disponibilizadas na plataforma, quero poder denunciar promoções que considero inadequadas ou falsas, para ajudar a manter a qualidade das ofertas oferecidas.|O usuário precisa estar cadastrado e autenticado na plataforma, ao ver uma primoção que considera inadequada para o aplicativo, pode encontar facilmente uma opção de denuncia na página da promoção|

