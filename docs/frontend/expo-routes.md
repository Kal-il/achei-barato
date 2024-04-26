# Sistema de Navegação Expo Routes

**Autor:** Kalil Canuto @Kal-il

## O que é o Expo Router?

O Expo Router é um roteador baseado em arquivo para React Native e aplicativos da web. Ele permite gerenciar a navegação entre as telas do seu aplicativo, possibilitando que os usuários se movam perfeitamente entre diferentes partes da interface do usuário do seu aplicativo, usando os mesmos componentes em várias plataformas (Android, iOS e web).
## Estrutura de Rotas do Front-end do Achei-Barato

 - **ExpoGo**
    - **src**
        - **api**
            Este diretório contém os arquivos ApiClient.js e Authenticator.js, responsáveis por estabelecer a conexão entre o back-end do projeto e o front-end, por meio da criação de métodos.
        - **app**
            Este diretório contém os arquivos JavaScript das telas do Achei-Barato.
            - **(tabs)**
                O diretório "(tabs)" é especial e contém as páginas que fazem parte da tab-bar, juntamente com o arquivo _layout.js, responsável pela estilização da tab-bar.
            - **SuperMarkets**
                Neste diretório estão as páginas relacionadas à interface dos usuários 'supermercados'.
        - **assets**
            Todos os ativos usados para implementar as telas, como imagens, estão neste diretório.
        - **components**
            Este diretório contém códigos JavaScript reutilizáveis, como botões, cards e backgrounds, que são amplamente utilizados na plataforma.

## Como criar uma rota para a página que estou criando?

A maioria das páginas já foi adicionada ao sistema de rotas (os arquivos já foram criados, só falta você, desenvolvedor front-end, estilizá-los). No entanto, caso esteja criando uma página nova, você pode facilmente conectá-la ao sistema de rotas.
Passos
1. Criar o arquivo JavaScript referente à sua página.
2. Adicionar sua página no arquivo _layout.js localizado no diretório "app" (ExpoGo/src/app), da seguinte forma:

    - Dentro da função `AppLayout`, dentro da tag `<Stack>`, crie uma `<Stack.Screen>` com o nome do seu arquivo e o título desejado. 
Deve ficar mais ou menos assim:
   `<Stack.Screen name="nome_do_seu_arquivo.js" options={{ title: "nome_do_seu_título" }} />`

3. Adicionar um link para sua página em outra página da plataforma:


    - Importe o Link do Expo Router no campo de importações da página na qual deseja adicionar uma rota para a sua. Caso ainda não tenha sido importado, importe-o da seguinte forma:
  Exemplo: `import { Link } from "expo-router";`
    - Em seguida, crie uma tag `<Link>` nessa página e, como parâmetro para o `href`, coloque "/"+ o nome do seu arquivo (exemplo: "/nome_do_seu_arquivo").
  Exemplo: `<Link href={"/login"}>login</Link>`

OBSERVAÇÃO

    Caso queira que um botão leve de uma página para outra, é necessário colocar o botão dentro da tag <Link> e adicionar o parâmetro asChild no link, caso contrário, não funcionará.
    No caso de imagens, envolva a tag de imagem dentro de uma tag <TouchableOpacity>, e depois disso, envolva tudo dentro da tag <Link> com o parâmetro asChild.

    Exemplo: 

    <Link href={"/store-profile"} asChild>
    <TouchableOpacity>
        <Image source={storeProfile} style={styles.storeProfile} />
    </TouchableOpacity>
    </Link>





