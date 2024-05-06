import { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Link from 'expo-router';
 
const { width, height } = Dimensions.get('window'); //essa função retorna o tamanho da tela do dispositivo

const ImagesPicker = ({imageSize, ImageHolder, ImageBorderRadius, Condition}) => {
  const [defaultImage] = useState(ImageHolder); // require('../assets/sua Imagem default pra ficar nesse atributo.png')
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library 
    // Código para selecionar uma nova imagem
    // Quando uma nova imagem é selecionada, atualize o estado
    // setImage(novaImagem);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

if (Condition) {
  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Image source={image ? { uri: image } : defaultImage /* a imgaem que aparece vai ser a imagem selecionada pelo usuário ou a default */}
        style={{height: height*imageSize, aspectRatio: 1, borderRadius: ImageBorderRadius}}/>
      </TouchableOpacity>
    </View>
  );
} 
else {
  return (
    <View>
        <Image source={image ? { uri: image } : defaultImage /* a imgaem que aparece vai ser a imagem selecionada pelo usuário ou a default */}
        style={{height: height*imageSize, aspectRatio: 1, borderRadius: ImageBorderRadius}}/>
    </View>
  );
}
}

export default  ImagesPicker;
