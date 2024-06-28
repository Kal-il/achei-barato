import React, { useState, useEffect } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ApiClient } from "../api/ApiClient";

export default function FavoriteButton({ tamanho, postId }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [first, setFirst] = useState(false);
  const scaleValue = new Animated.Value(0);
  const api = new ApiClient();

  useEffect(() => {
    const checkFavorited = async () => {
        try{
            let curtido;
            curtido = await api.checkFavorite(postId)
            console.log("curtido: " + curtido)

            if (curtido) {
                setIsFavorited(true);
            } else {
                setIsFavorited(false)
            }
        } catch(e) {
            console.log(e)
        }
    }

    checkFavorited();
  }, [])

  const handleCurtida = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const favoritePost = async () => {
      try {
        await api.favoritePost(postId);
      } catch (e) {
        console.log(e);
      }
    };
    const deleteFavoritePost = async () => {
      try {
        await api.deleteFavorite(postId);
      } catch (e) {
        console.log(e);
      }
    };

    if (!isFavorited) {
      favoritePost();
      setIsFavorited(true)
    }

    if (isFavorited) {
      deleteFavoritePost();
      setIsFavorited(false)
    }
  };

  return (
    <TouchableOpacity onPress={() => handleCurtida()}>
      <Animated.View
        style={{
          transform: [
            {
              scale: scaleValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ],
        }}
      >
        <MaterialIcons
          name={isFavorited ? "favorite" : "favorite-outline"}
          size={tamanho ? tamanho : 28}
          color={isFavorited ? "#FF5F5F" : "#FF5F5F"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
