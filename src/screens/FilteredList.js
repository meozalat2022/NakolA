import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import BannerAdUnite from '../../components/BannerAdUnite';
import InterstisialAdUnite from '../../components/InterstisialAdUnite';
import Colors from '../../constants/Colors';
import {FACEBOOK} from '../../SocialMedia/SocialMediaLinks';
import {YOUTUBE} from '../../SocialMedia/SocialMediaLinks';
import {INSTAGRAM} from '../../SocialMedia/SocialMediaLinks';
import {TIKTOK} from '../../SocialMedia/SocialMediaLinks';
import firestore from '@react-native-firebase/firestore';

const FilteredList = ({navigation, route}) => {
  const [meals, setMeals] = useState([]);
  const openUrl = async url => {
    const isValid = await Linking.canOpenURL(url);
    if (isValid) {
      await Linking.openURL(url);
    } else {
      Alert.alert('رابط غير معروف');
    }
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealList = [];
        await firestore()
          .collection('Meal')
          .orderBy('timestamp')
          .get()
          .then(querySnapShot => {
            querySnapShot.forEach(doc => {
              const {
                id,
                categoryIds,
                title,
                imageUrl,
                flag,
                duration,
                calories,
                servings,
                ingredients,
                steps,
                hasMeatCube,
                hasGroundMeat,
                hasTurkey,
                // hasKofta,
                hasLiver,
                hasSusage,
                hasMeatShank,
                // hasMeatSteak,
                hasEscalop,
                hasMeatFlito,
                hasMeatHeart,
                hasMeatKalawy,
                hasMeatKirsha,
                hasMeatKaware,
                hasMeatMombar,
                hasMeatHeadMeat,
                hasMeatAkawy,
                hasMeatBrain,
                hasCheckin,
                hasCheckinFillet,
                hasKidney,
                hasCheckinWings,
                hasCheckinLegs,
                // hasShawrma,
                hasCheckinBreast,
                // hasCheckinShish,
                hasFish,
                hasSeafood,
                hasCrabs,
                hasShrimp,
                hasFishFillet,
                hasCalamari,
                hasLobester,
                hasTuna,
                hasRice,
                hasPasta,
                hasFrik,
                hasPotatos,
                hasEggplants,
                hasZucchini,
                hasPeas,
                hasSpinach,
                hasCauliflower,
                hasOcra,
                hasMolokhia,
                hasVegetarian,
                // hasKeto,
                hasDiet,
                hasCabbage,
                hasBorccoli,
                hasMashroom,
                hasNodels,
                hasSherya,
                hasLazanya,
                hasLessanAsfour,
                hasOat,
                hasYellowLentils,
                hasBlackLentils,
                hasHomous,
                hasWhiteBeans,
                hasLobya,
                hasCorn,
                hasGreenBeans,
                hasCarots,
                hasHotDogs,
                hasBasmatiRice,
                hasHamamAndSeman,
                hasFakhda,
                hasSalmon,
                hasKaviar,
                hasSweetPotato,
                hasRinga,
                hasFesekh,
                hasBorghal,
              } = doc.data();
              mealList.push({
                id: doc.id,
                categoryIds,
                title,
                imageUrl,
                flag,
                duration,
                calories,
                servings,
                ingredients,
                steps,
                hasMeatCube,
                hasGroundMeat,
                hasTurkey,
                // hasKofta,
                hasLiver,
                hasSusage,
                hasMeatShank,
                // hasMeatSteak,
                hasEscalop,
                hasMeatFlito,
                hasMeatHeart,
                hasMeatKalawy,
                hasMeatKirsha,
                hasMeatKaware,
                hasMeatMombar,
                hasMeatHeadMeat,
                hasMeatAkawy,
                hasMeatBrain,
                hasCheckin,
                hasCheckinFillet,
                hasKidney,
                hasCheckinWings,
                hasCheckinLegs,
                // hasShawrma,
                hasCheckinBreast,
                // hasCheckinShish,
                hasFish,
                hasSeafood,
                hasCrabs,
                hasShrimp,
                hasFishFillet,
                hasCalamari,
                hasLobester,
                hasTuna,
                hasRice,
                hasPasta,
                hasFrik,
                hasPotatos,
                hasEggplants,
                hasZucchini,
                hasPeas,
                hasSpinach,
                hasCauliflower,
                hasOcra,
                hasMolokhia,
                hasVegetarian,
                // hasKeto,
                hasDiet,
                hasCabbage,
                hasBorccoli,
                hasMashroom,
                hasNodels,
                hasSherya,
                hasLazanya,
                hasLessanAsfour,
                hasOat,
                hasYellowLentils,
                hasBlackLentils,
                hasHomous,
                hasWhiteBeans,
                hasLobya,
                hasCorn,
                hasGreenBeans,
                hasCarots,
                hasHotDogs,
                hasBasmatiRice,
                hasHamamAndSeman,
                hasFakhda,
                hasSalmon,
                hasKaviar,
                hasSweetPotato,
                hasRinga,
                hasFesekh,
                hasBorghal,
              });
            });
          });
        setMeals(mealList);
      } catch (error) {}
    };
    fetchMeals();
  }, []);

  const ingredients =
    'MeatCube,GroundMeat,Turkey,Liver,Susage,MeatShank,MeatFlito,Escalop,MeatHeart,MeatKalawy,MeatKirsha,MeatKaware,MeatMombar,MeatHeadMeat,MeatAkawy,MeatBrain,Checkin,CheckinFillet,Kidney,CheckinWings,CheckinLegs,CheckinBreast,Fish,Seafood,Crabs,Shrimp,FishFillet,Calamari,Lobester,Tuna,Ringa,Fesekh,Rice,Salmon,Kaviar,Pasta,Frik,Borghal,Potatos,Eggplants,Zucchini,Peas,Spinach,Cauliflower,Ocra,Molokhia,Vegetarian,Diet,Cabbage,Borccoli,Mashroom,Nodels,Sherya,Lazanya,LessanAsfour,Oat,YellowLentils,BlackLentils,Homous,WhiteBeans,Lobya,Corn,GreenBeans,Carots,SweetPotato,HotDogs,BasmatiRice,HamamAndSeman,hasFakhda'
      .split(',')
      .map(e => 'has' + e);
  const fl = route.params.filteredList;
  const dataArr = meals.filter(meal =>
    ingredients.some(ing => fl[ing] && meal[ing]),
  );
  // console.log(dataArr)

  // const [data, setData]=useState(dataArr);
  // const searchItem = (input, da)=>{
  //     let dataFromSearch = data;
  //     if(input){
  //         let searchData = dataFromSearch.filter((value)=>{
  //             const itemData = value.title.toLowerCase();
  //             const inputText = input.toLowerCase();
  //             return itemData.includes(inputText);
  //         });
  //         setData([...searchData]);
  //     }else{
  //         setData([...da])
  //     }
  // }

  return (
    <View style={styles.container}>
      <InterstisialAdUnite />
      <BannerAdUnite />
      {/* <View style={styles.searchBar}>
            <AntDesign name="search1" size={24} color={Colors.accent} />
                <TextInput
                        placeholder='بحث'
                        onChangeText={(input)=>{searchItem(input, mealsList)}}
                        style={styles.textInput}
                />
            </View> */}
      <FlatList
        numColumns={2}
        style={{width: '100%'}}
        data={dataArr}
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
      <BannerAdUnite />
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
      {/* <BannerAd /> */}
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

export default FilteredList;
