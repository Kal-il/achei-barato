import React from 'react';
import { Slot, useRouter } from 'expo-router'; // Certifique-se de importar Slot de 'expo-router'
import { SessionProvider, useSession } from '../contexts/ctx'; // Importe o hook useSession

export default function Root() {
  const { isAuthenticated } = useSession(); // Use o hook useSession
  const router = useRouter();

  // Verifique se o usuário está autenticado e redirecione-o para a página inicial, se necessário
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/(user-app)/(tabs)/index'); // Redireciona para a página inicial
    }
  }, [isAuthenticated, router]);

  return (
    <SessionProvider>
      <Slot /> 
    </SessionProvider>
  );
}