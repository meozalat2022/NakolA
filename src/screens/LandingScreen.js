import React from 'react-native';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <LottieView
          source={require('../../assets/109232-cooking-ingredients.json')}
          autoPlay
          loop
        />
      </View>
      <View style={styles.TouchableOpacity}>
        <TouchableOpacity
          style={styles.botton}
          onPress={() => navigation.navigate('Index')}>
          <Text style={styles.buttontext}>ناكل ايه؟</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botton}
          onPress={() => navigation.navigate('RecipesCategory')}>
          <Text style={styles.buttontext}>كل الوصفات</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.mauve,
    flex: 1,
  },
  viewContainer: {
    width: '100%',
    height: '65%',
    // backgroundColor: Colors.mauve
  },
  TouchableOpacity: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  botton: {
    marginBottom: 5,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    width: '50%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  buttontext: {
    color: Colors.accent,
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
});

export default LandingScreen;

/*

lemonCheffon: '#FBF8CC',
    champagnePink: '#fde4cf',
    babyPink: '#fde4cf',
    pinkLavender: '#F1C0E8',
    mauve: '#CFBAF0',
    babeBlueEyes: '#A3C4F3',
    nonPhotoBlue: '#90DBF4',
    electricBlue: '#8EECF5',
    magicMint: '#98F5E1',
    grannySmithApple: '#B9FBC0'

*/
