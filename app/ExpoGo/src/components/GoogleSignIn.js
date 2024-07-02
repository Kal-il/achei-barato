import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Authenticator } from "../api/Authenticator";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const GoogleManager = () => {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email", "profile", "openid"],
      webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    });
  }, []);

  const signOut = async () => {
    const signOutWithGoogle = new Authenticator();
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await signOutWithGoogle.cleanUserState();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    let userInfoGoogle;
    try {
      await GoogleSignin.hasPlayServices();
      userInfoGoogle = await GoogleSignin.signIn();
      router.replace("/");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Login cancelado");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Login em progresso");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Play Services não disponível");
      } else {
        console.log("Erro ao fazer login:", error);
      }
    }

    try {
      const signInWithGoogle = new Authenticator();
      await signInWithGoogle.googleAuthenticateUser(userInfoGoogle);
    } catch (error) {
      signOut();
      console.error("Erro ao autenticar usuário com Google:", error.response);
    }
  };

  return { userInfo, signIn, signOut };
};

export const GoogleSignInScreen = ({ text }) => {
  const { signIn, signOut } = GoogleManager();

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
          borderRadius: 24,
          paddingRight: 12,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          onPress={signIn}
          style={{
            alignItems: "center",
            gap: 10,
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../assets/google.png")}
            style={{
              width: width * 0.1,
              height: height * 0.05,
              aspectRatio: 1,
            }}
          />
          <Text style={{ color: "#303030", fontWeight: "bold" }}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoogleSignInScreen;
