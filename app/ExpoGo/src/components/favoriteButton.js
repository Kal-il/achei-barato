import React, { useState, useEffect } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function FavoriteButton() {
    const [isFavorited, setIsFavorited] = useState(false);
    const scaleValue = new Animated.Value(0);

    useEffect(() => {
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
            })
        ]).start();
    }, [isFavorited]);

    return (
        <TouchableOpacity onPress={() => setIsFavorited(!isFavorited)}>
            <Animated.View style={{ transform: [{ scale: scaleValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2]
            }) }] }}>
                <MaterialIcons name={isFavorited ? "favorite" : "favorite-outline"} size={32} color={isFavorited ? 'red' : '#fff'} />
            </Animated.View>
        </TouchableOpacity>
    );
}