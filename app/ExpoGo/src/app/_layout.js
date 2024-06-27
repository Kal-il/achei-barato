import React, { useEffect } from 'react';
import { Slot, Stack, useRouter } from 'expo-router'; // Certifique-se de importar Slot de 'expo-router'
import { SessionProvider, useSession } from '../contexts/ctx'; // Importe o hook useSession
import { ApiClient } from '../api/ApiClient';

export default function Root() {
  const { session, isLoading } = useSession();
  const router = useRouter();
  // const {erro, setErro} = useState("");

  // Se ainda estiver carregando a sessão, exiba uma tela de carregamento
  if (isLoading) {
    console.log("Carregando...");
  }

  // Se o usuário não estiver autenticado, redirecione-o para a página de login
  useEffect(() => {
    const asyncChecaUsuario = async () => {
      const api = new ApiClient();
      let usuario, erro;
      try {
        usuario = await api.getUserDetail();
        console.log("foi");
      } catch (e) {
        if (e.response) {
          erro = e.response.data.detail;
        } else {
          erro = e;
        }
      }

      if (erro) {
        router.replace("/sign-in");
      }

      if (usuario.dono_mercado) {
        console.log('redi')
        router.push("/market-index");
      }
    };

    asyncChecaUsuario();
  }, []);

  return (
    <SessionProvider>
      <Slot /> 
    </SessionProvider>
  );
}