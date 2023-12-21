import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../constants/Colors';
import {FACEBOOK} from '../../SocialMedia/SocialMediaLinks';
import {YOUTUBE} from '../../SocialMedia/SocialMediaLinks';
import {INSTAGRAM} from '../../SocialMedia/SocialMediaLinks';
import {TIKTOK} from '../../SocialMedia/SocialMediaLinks';
import firestore from '@react-native-firebase/firestore';
import InterstisialAdUnite from '../../components/InterstisialAdUnite';
import BannerAdUnite from '../../components/BannerAdUnite';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ShowMealsList = ({route, navigation}) => {
  const [meals, setMeals] = useState([]);
  const [isMealListLoaded, setIsMealListLoaded] = useState(false);
  const [sortCat, setSortCat] = useState({
    cat: 'timestamp',
    type: 'asc',
  });

  // useEffect(() => {
  //   interstitial();
  // }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsList = [];
        await firestore()
          .collection('Meal')
          .where('categoryIds', 'array-contains', route.params.itemId)
          .orderBy(sortCat.cat, sortCat.type)
          .get()
          .then(querySnapShot => {
            querySnapShot.forEach(doc => {
              const {id, imageUrl, title} = doc.data();
              mealsList.push({
                id: doc.id,
                imageUrl,
                title,
              });
            });
          });
        setMeals(mealsList);
        setIsMealListLoaded(true);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchMeals();
  }, [sortCat]);

  // console.log('meals and categories ======' ,meals)
  // console.log('******************************************')
  // console.log('meals details', mealDetails )
  const openUrl = async url => {
    const isValid = await Linking.canOpenURL(url);
    if (isValid) {
      await Linking.openURL(url);
    } else {
      Alert.alert('رابط غير معروف');
    }
  };

  if (!isMealListLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BannerAdUnite />

      <View
        style={{
          flexDirection: 'row-reverse',
          paddingVertical: 5,
          borderColor: Colors.primary,
          borderWidth: 2,
          borderRadius: 10,
          marginHorizontal: 2,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            marginHorizontal: 2,
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.primary,
          }}>
          ترتيب :
        </Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.primary,
            }}>
            السعرات
          </Text>
          <TouchableOpacity
            onPress={() => setSortCat({cat: 'calories', type: 'asc'})}
            style={{
              marginHorizontal: 5,
              justifyContent: 'center',
            }}>
            <FontAwesome5
              name="sort-amount-up"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSortCat({cat: 'calories', type: 'desc'})}
            style={{
              marginHorizontal: 5,
              justifyContent: 'center',
            }}>
            <FontAwesome5
              name="sort-amount-down"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row-reverse',
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.primary,
            }}>
            التاريخ
          </Text>
          <TouchableOpacity
            onPress={() => setSortCat({cat: 'timestamp', type: 'asc'})}
            style={{
              marginHorizontal: 5,
              justifyContent: 'center',
            }}>
            <FontAwesome5
              name="sort-amount-up"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSortCat({cat: 'timestamp', type: 'desc'})}
            style={{
              marginHorizontal: 5,
              justifyContent: 'center',
            }}>
            <FontAwesome5
              name="sort-amount-down"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        data={meals}
        renderItem={({item}) => {
          return (
            <View style={styles.listItemBackground}>
              <View>
                <Image style={styles.image} source={{uri: item.imageUrl[0]}} />
              </View>
              <View>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.recipeButton}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ShowRecipe', {
                      itemId: item.id,
                      itemTitle: item.title,
                    });
                  }}>
                  <Text style={styles.recipeText}>الوصفة</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: Colors.primary}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    flex: 1,
    // backgroundColor: 'white'
  },
  searchBar: {
    // flexDirection: 'row-reverse',
    // backgroundColor: Colors.lemonCheffon ,
    margin: 7,
    borderRadius: 7,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: Colors.pinkLavender,
    borderWidth: 1,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    padding: 7,
    // color: Colors.primary
  },
  listItemBackground: {
    backgroundColor: Colors.accent,
    borderRadius: 25,
    margin: 10,
    alignItems: 'center',
    flex: 1,
    height: 250,
  },
  recipeButton: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    borderRadius: 15,
    width: '70%',
  },
  recipeText: {
    fontSize: 22,
    color: Colors.accent,
    fontWeight: 'bold',
  },
});

export default ShowMealsList;
