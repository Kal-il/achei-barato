import React, { useEffect } from "react";
import { Slot, Stack, useRouter } from "expo-router"; // Certifique-se de importar Slot de 'expo-router'
import { AuthProvider, SessionProvider, useAuth } from "../contexts/ctx"; // Importe o hook useSession
import { ApiClient } from "../api/ApiClient";

export default function Root() {
  const router = useRouter();
  // const {erro, setErro} = useState("");

  // Se o usuário não estiver autenticado, redirecione-o para a página de login
  const { isMercado, user } = useAuth();

  if (user === undefined) {
    setTimeout(() => {
      if (isMercado == "mercado") {
        console.log("é mercado");
        router.push("/market-index");
      }

      if (isMercado == "deslogado") {
        console.log("deslogado");
        router.push("/sign-in");
      }

	  if (isMercado == "") {
		router.push("/sign-in");
	  }
    }, 5000);
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
