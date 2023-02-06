import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import MealDetails from '../../components/MealDetails';
import MealIngredients from '../../components/MealIngredients';
import Colors from '../../constants/Colors';
import {FACEBOOK} from '../../SocialMedia/SocialMediaLinks';
import {YOUTUBE} from '../../SocialMedia/SocialMediaLinks';
import {INSTAGRAM} from '../../SocialMedia/SocialMediaLinks';
import {TIKTOK} from '../../SocialMedia/SocialMediaLinks';
import firestore from '@react-native-firebase/firestore';
import InterstisialAdUnite from '../../components/InterstisialAdUnite';
import BannerAdUnite from '../../components/BannerAdUnite';

const ShowRecipe = ({route}) => {
  const [mealDetails, setMealDetails] = useState([]);
  const [isRecipeLoaded, setIsRecipeLoaded] = useState(false);
  const openUrl = async url => {
    const isValid = await Linking.canOpenURL(url);
    if (isValid) {
      await Linking.openURL(url);
    } else {
      Alert.alert('رابط غير معروف');
    }
  };

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        await firestore()
          .collection('Meal')
          .doc(route.params.itemId)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              setMealDetails(documentSnapshot.data());
            }
          });
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchMeal();
    setIsRecipeLoaded(true);
  }, []);

  const imageSlider = [];
  for (let i in mealDetails.imageUrl) {
    imageSlider.push(mealDetails.imageUrl[i]);
  }

  if (!isRecipeLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View>
      <InterstisialAdUnite />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.sliderBox}>
            <SliderBox
              images={imageSlider}
              sliderBoxHeight={200}
              activeOpacity={0.7}
              autoplay
              circleLoop
            />
          </View>
          {/* <BannerAdUnite /> */}
          <MealDetails
            flag={mealDetails.flag}
            duration={mealDetails.duration}
            calories={mealDetails.calories}
            servings={mealDetails.servings}
          />
          <MealIngredients
            ingredients={mealDetails.ingredients}
            title={'المقادير'}
          />
          <MealIngredients ingredients={mealDetails.steps} title={'الطريقة'} />
        </View>
        <BannerAdUnite />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Text
            style={{fontSize: 30, fontWeight: 'bold', color: Colors.primary}}>
            تابعونا
          </Text>
        </View>
        <View
          style={{
            marginBottom: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(FACEBOOK);
            }}>
            <Image
              style={{width: 35, height: 35}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FLogos%2Ffacebook.png?alt=media&token=6ba4cb45-4f42-42f5-b5c7-2063eeffd1a8',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(YOUTUBE);
            }}>
            <Image
              style={{width: 35, height: 35}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FLogos%2Fyoutube.png?alt=media&token=966ea942-4a6a-44d9-990e-0a7e7f41a641',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(INSTAGRAM);
            }}>
            <Image
              style={{width: 35, height: 35}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FLogos%2Finstagram.png?alt=media&token=f06f3b53-f026-43f0-a855-8ace6ed7b1b8',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(TIKTOK);
            }}>
            <Image
              style={{width: 35, height: 35}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FLogos%2Ftiktok.png?alt=media&token=ffcdc0f1-4630-4987-974b-c0b6473469b5',
              }}
            />
          </TouchableOpacity>
        </View>
        <BannerAdUnite />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 10,
  },
  sliderBox: {
    flex: 1,
  },
});

export default ShowRecipe;
