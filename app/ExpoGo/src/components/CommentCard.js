import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TranparentGradientBackground from './TransparentGradient.js';

const { width, height } = Dimensions.get('window');

const CommentCard = ({ commentText, commentAuthor, commentDate, commentAuthorImage }) => {
    return (
        <View style={styles.container}>
            <TranparentGradientBackground>
                <View style={styles.header}>
                    <View style={styles.commentAuthor}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image style={styles.commentAuthorImage} source={commentAuthorImage} />
                            <Text style={styles.commentAuthorName}>{commentAuthor}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{ color: 'red' }}>
                                Denunciar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.commentDate}>Comentado em: {commentDate}</Text>
                </View>
            </TranparentGradientBackground>
            <View style={styles.body}>
                <Text style={styles.CommentText}>{commentText}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.85,
        height: height * 0.2,
        borderRadius: 16,
        overflow: 'hidden',
        alignSelf: 'center',
        flex:  1,
        backgroundColor: '#fff',
        shadowColor: 'grey',
        elevation: 5,
        marginVertical: '2%',
    },
    header: {
        margin: '4%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    commentAuthor: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentAuthorImage: {
        width: width * 0.08,
        height: height * 0.08,
        aspectRatio: 1,
    },
    commentAuthorName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '5%',
        color: 'white',
    },
    commentDate: {
        fontSize: 12,
        color: 'grey',
        marginTop: '2%',
        color: 'white',
    },
    body: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '4%',
        backgroundColor: '#fff',
        height: height * 0.1,

    },
    CommentText: {
        fontSize: 16,
        color: '#38434D',
        textAlign: 'justify', // Justifica o texto
    },
});

export default CommentCard;