import React, { useEffect } from 'react';
import { Slot, Stack, useRouter } from 'expo-router'; // Certifique-se de importar Slot de 'expo-router'
import { AuthProvider, SessionProvider } from '../contexts/ctx'; // Importe o hook useSession
import { ApiClient } from '../api/ApiClient';

export default function Root() {
  const router = useRouter();
  // const {erro, setErro} = useState("");

  // Se o usuário não estiver autenticado, redirecione-o para a página de login
  useEffect(() => {
    const asyncChecaUsuario = async () => {
      const api = new ApiClient();
      let usuario, erro;
      try {
        usuario = await api.getUserDetail();
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
        router.push("/market-index");
      } else {

        router.push("/index");
		}
    };

    asyncChecaUsuario();
  }, []);

  return (
    <AuthProvider>
      <Slot /> 
    </AuthProvider>
  );
}
