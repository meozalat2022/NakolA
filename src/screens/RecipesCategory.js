import React, {useState, useEffect} from 'react';
import {
  Linking,
  Alert,
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
// import { CATEGORIES } from '../../data/RecipiesData';
import Colors from '../../constants/Colors';
import {FACEBOOK} from '../../SocialMedia/SocialMediaLinks';
import {YOUTUBE} from '../../SocialMedia/SocialMediaLinks';
import {INSTAGRAM} from '../../SocialMedia/SocialMediaLinks';
import {TIKTOK} from '../../SocialMedia/SocialMediaLinks';
import firestore from '@react-native-firebase/firestore';
import InterstisialAdUnite from '../../components/InterstisialAdUnite';
import BannerAdUnite from '../../components/BannerAdUnite';

const RecipesCategory = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catList = [];
        await firestore()
          .collection('Category')
          .orderBy('sort', 'asc')
          .get()
          .then(querySnapShot => {
            querySnapShot.forEach(doc => {
              const {id, title, image, icon} = doc.data();
              catList.push({id: doc.id, title, image, icon});
            });
          });
        setCategories(catList);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchCategories();
    setIsCategoryLoaded(true);
  }, []);

  const openUrl = async url => {
    const isValid = await Linking.canOpenURL(url);
    if (isValid) {
      await Linking.openURL(url);
    } else {
      Alert.alert('رابط غير معروف');
    }
  };

  const renderDataItems = itemData => {
    return (
      <View style={styles.flatlist}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShowMealsList', {
              itemId: itemData.item.id,
              itemTitle: itemData.item.title,
            });
          }}>
          <View style={styles.backgroundImage}>
            <ImageBackground
              source={{uri: itemData.item.image}}
              style={styles.backgroundImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{itemData.item.title}</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (!isCategoryLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <InterstisialAdUnite />
      {/* <BannerAdUnite /> */}
      <View>
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
        {/* <BannerAdUnite /> */}
        <FlatList
          style={{marginTop: 45, marginBottom: 75}}
          numColumns={2}
          data={categories}
          renderItem={renderDataItems}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* <BannerAdUnite /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    margin: 10,
    height: 200,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    backgroundColor: Colors.accent,
    height: '15%',
    justifyContent: 'center',
  },
  title: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecipesCategory;
