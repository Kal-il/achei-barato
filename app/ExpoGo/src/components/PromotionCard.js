import { Link } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import FavoriteButton from './favoriteButton';

const { height, width } = Dimensions.get('window');

const PromotionCard = ({ imageSource, MarketImageProfile, MarketName, MarketProfileLink, PromotionName, OldPrice, Price, tag, PromotionLink, CommentsNumber, LikesNumber }) => {
    return (
        <View style={styles.Card}>
            <View style={styles.UpperCard}>
                <Link href={PromotionLink} asChild>
                    <TouchableOpacity>
                        <Image source={imageSource} style={styles.promotionImage} />
                    </TouchableOpacity>
                </Link>
                <View style={styles.PromotionInfos}>
                    <View style={styles.MarketInfos}>
                        <Link href={MarketProfileLink} asChild>
                            <TouchableOpacity>
                                <Text>{MarketName}</Text>
                            </TouchableOpacity>
                        </Link>
                        <Link href={MarketProfileLink} asChild>
                            <TouchableOpacity>
                                <Image source={MarketImageProfile} style={styles.marketProfile} />
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <Text style={styles.promotionName}>{PromotionName}</Text>
                    <View style={styles.PricesAndTag}>
                        <View style={styles.Prices}>
                            <Text style={styles.OldPrice}>{OldPrice}</Text>
                            <Text style={styles.Price}>{Price}</Text>
                        </View>
                        <View >
                            <Text style={styles.Tag}>{tag}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.BottonCard}>

                <Link href={PromotionLink} asChild>
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <MaterialIcons name="insert-comment" size={24} color="black" />
                            <Text>{CommentsNumber}</Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                <View style={styles.button}>
                    <MaterialIcons name="expand-more" size={24} color="black" />
                    <Link href={PromotionLink} asChild>
                        <TouchableOpacity>
                            <Text>Ver mais</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
                <View style={styles.LikeButton}>
                    <FavoriteButton />
                    <Text style={{color: '#FF5F5F'}}>{LikesNumber}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Card: {
        height: height * 0.25,
        width: width * 0.93,
        borderColor: '#E9E9E9',
        borderWidth: 1,
        borderRadius: 16,
        padding: '4%',
        margin: '2%',
        backgroundColor: '#fff',
        elevation: 5,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    UpperCard: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.75,
    },
    promotionImage: {
        aspectRatio: 1,
        width: width * 0.27,
        height: height * 0.14,
        borderRadius: 16,
    },
    marketProfile: {
        width: width * 0.12,
        height: height * 0.06,
        aspectRatio: 1,
        borderWidth: 1,
    },
    PromotionInfos: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginStart: '5%',
        flex: 1,
    },
    MarketInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    PricesAndTag: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    promotionName: {
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap',

    },
    Prices: {
        flexDirection: 'column',
    },
    Tag: {
        backgroundColor: 'orange',
        borderRadius: 16,
        alignContent: 'center',
        alignItems: 'center',
        padding: '2%',
        color: 'white',
        fontWeight: 'bold',
    },
    OldPrice: {
        color: 'red',
        textDecorationLine: 'line-through',
    },
    Price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    BottonCard: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.2,
        marginTop: '5%',
    },
    button: {
        height: height * 0.045,
        width: width * 0.24,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    LikeButton: {
        height: height * 0.045,
        borderColor: '#FF5F5F',
        width: width * 0.24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
    },
})

export default PromotionCard;