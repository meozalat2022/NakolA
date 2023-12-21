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

const SearchResult = ({navigation}) => {
  // const [inputValue, setInputValue] = useState('');
  // const [searchResult, setSearchResult] = useState([]);
  // const [isSearchResultLoaded, setIsSearchResultLoaded] = useState(false);

  // useEffect(() => {
  //   const fetchSearchResult = async () => {
  //     setIsSearchResultLoaded(true);
  //   };
  //   fetchSearchResult();
  // }, [inputValue]);

  // if (!isSearchResultLoaded) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }
  const [isMealListLoaded, setIsMealListLoaded] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsList = [];
        await firestore()
          .collection('Meal')
          .orderBy('timestamp', 'asc')
          .get()
          .then(querySnapShot => {
            querySnapShot.forEach(doc => {
              const {id, title, imageUrl} = doc.data();
              mealsList.push({id: doc.id, title, imageUrl});
            });
          });
        setFilteredData(mealsList);
        setMasterData(mealsList);
        setIsMealListLoaded(true);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchMeals();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [opacity, setOpacity] = useState(false);

  const seachFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
      setOpacity(true);
    } else {
      setFilteredData(masterData);
      setSearch(text);
      setOpacity(false);
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
      <View
        style={{
          flexDirection: 'row-reverse',
          paddingHorizontal: 5,
          borderColor: 'grey',
          borderWidth: 2,
          borderRadius: 15,
          marginHorizontal: 5,
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: 'white',
          alignItems: 'center',
          width: '95%',
        }}>
        <TextInput
          style={{marginHorizontal: 10}}
          placeholder="بحث عن اكلة"
          textAlign="right"
          autoFocus={true}
          onChangeText={text => seachFilter(text)}
          value={search}
        />
      </View>

      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        data={filteredData}
        renderItem={({item}) => {
          return (
            <View
              style={[styles.listItemBackground, {opacity: opacity ? 1 : 0}]}>
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

export default SearchResult;
