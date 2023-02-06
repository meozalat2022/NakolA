import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer, Paragraph, Title} from 'react-native-paper';
import CountryFlag from 'react-native-country-flag';
// import {categories} from '../data/RecipiesData';
import Colors from '../constants/Colors';

export const DrawerContent = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const catList = [];
      await firestore()
        .collection('Category')
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            const {id, title, image, icon} = doc.data();
            catList.push({id: doc.id, title, image, icon});
          });
        });
      setCategories(catList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 25,
            color: Colors.primary,
            textDecorationLine: 'underline',
          }}>
          جميع الوصفات
        </Text>
      </View>
      <View>
        <FlatList
          data={categories}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ShowMealsList', {
                    itemId: item.id,
                    itemTitle: item.title,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      color: Colors.accent,
                    }}>
                    {item.title}
                  </Text>
                  <Image
                    style={{width: 50, height: 50, justifyContent: 'center'}}
                    source={{uri: item.icon}}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/* 
            <View style={styles.paragraphView}>
                    <Paragraph style={styles.paragraph}> اصناف الطعام</Paragraph>
               </View>
                <View style={styles.section}>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[14].id, itemTitle: categories[14].title})}>
                            <View style={styles.title}>
                                <Title style={styles.topSectionTitle}> {categories[14].title} </Title>
                                <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FMeals%2FVegetarian%2FVegetarian.jpg?alt=media&token=2e3144da-2970-4368-a94f-3700dbdeafd9'}} style={styles.image}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[11].id, itemTitle: categories[11].title})}>
                            <View style={styles.title}>
                                <Title style={styles.topSectionTitle}> {categories[11].title} </Title>
                                <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FMeals%2FMeat%2FMeat.jpg?alt=media&token=79782985-c581-4904-9934-9b432b43442d'}} style={styles.image}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[12].id, itemTitle: categories[12].title})}>
                            <View style={styles.title}>
                                <Title style={styles.topSectionTitle}> {categories[12].title}  </Title>
                                <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FMeals%2FCheckin%2FChicken.jpg?alt=media&token=296f3d89-1e17-4043-bdf7-f73dc9abf9b9'}} style={styles.image}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[13].id, itemTitle: categories[13].title})}>
                            <View style={styles.title}>
                                <Title style={styles.topSectionTitle}> {categories[13].title} </Title>
                                <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FMeals%2FSeafood%2FSeaFood.jpg?alt=media&token=b393769d-0d2c-489d-98f0-84ea086230b0'}} style={styles.image}/>
                            </View>
                        </TouchableOpacity>
                    </View>
               </View>
               <View style={styles.paragraphView}>
                    <Paragraph style={styles.paragraph}> الوصفات بحسب البلد</Paragraph>
               </View>
               <DrawerContentScrollView>
                <DrawerItem 
                    label={categories[0].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[0].id, itemTitle: categories[0].title})}
                    icon={()=>(
                    <CountryFlag isoCode="eg" size={25} />
                    
                    )} 
                />
                <DrawerItem 
                   label={categories[1].title}
                   labelStyle={{color: Colors.accent}}
                   onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[1].id, itemTitle: categories[1].title})}
                    icon={()=>(
                    <CountryFlag isoCode="sa" size={25} />
                    )} 
                />
                <DrawerItem 
                    label={categories[2].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[2].id, itemTitle: categories[2].title})}
                    icon={()=>(
                    <CountryFlag isoCode="it" size={25} />
                    )} 
                />
                <DrawerItem 
                    label={categories[3].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[3].id, itemTitle: categories[3].title})}
                    icon={()=>(
                    <CountryFlag isoCode="in" size={25} />
                    )} 
                />
                <DrawerItem 
                    label={categories[4].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[4].id, itemTitle: categories[4].title})}
                    icon={()=>(
                    <CountryFlag isoCode="cn" size={25} />
                    )} 
                />
                <DrawerItem 
                   label={categories[5].title}
                   labelStyle={{color: Colors.accent}}
                   onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[5].id, itemTitle: categories[5].title})}
                    icon={()=>(
                    <CountryFlag isoCode="mx" size={25} />
                    )} 
                />
                <DrawerItem 
                    label={categories[6].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[6].id, itemTitle: categories[6].title})}
                    icon={()=>(
                    <CountryFlag isoCode="us" size={25} />
                    )} 
                />
                <DrawerItem 
                    label={categories[7].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[7].id, itemTitle: categories[7].title})}
                    icon={()=>(
                    <CountryFlag isoCode="fr" size={25} />
                    )} 
                />
                <DrawerItem 
                    label={categories[8].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[8].id, itemTitle: categories[8].title})}
                    icon={()=>(
                    <CountryFlag isoCode="jp" size={25} />
                    )} 
                />
                <DrawerItem 
                    label={categories[9].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[9].id, itemTitle: categories[9].title})}
                    icon={()=>(
                    <CountryFlag isoCode="lb" size={25} />
                    )} 
                />
                <DrawerItem 
                    label={categories[10].title}
                    labelStyle={{color: Colors.accent}}
                    onPress={()=> navigation.navigate('ShowMealsList',{itemId: categories[10].id, itemTitle: categories[10].title})}
                    icon={()=>(
                    <CountryFlag isoCode="gr" size={25} />
                    )} 
                />
                
            </DrawerContentScrollView> 
            <Drawer.Section style={styles.sectionBottom}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                        <View style={styles.title}>
                            <Title style={styles.titleText}>انت الشيف</Title>
                            <Image style={styles.bottomSectionImage} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FMeals%2FUncategorized%2FChef.jpg?alt=media&token=84c7d646-d296-4ad4-bf8b-0a6801b92520'}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.title}>
                            <Title style={styles.titleText}>فودبيديا</Title>
                            <Image style={styles.bottomSectionImage} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FMeals%2FUncategorized%2FFoodPedia.jpg?alt=media&token=8398be52-bdda-47ae-bd81-8167377638d2'}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.title}>
                            <Title style={styles.titleText}>ادوات المطبخ</Title>
                            <Image style={styles.bottomSectionImage} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/test-5c03d.appspot.com/o/NakoA%2FMeals%2FYour%20Kitchen%2FKitchenTools.jpg?alt=media&token=99b5f8cf-99ac-4e8b-b7e0-c24c8f697fa6'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </Drawer.Section> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  title: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topSectionTitle: {
    fontSize: 15,
    color: Colors.accent,
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'space-between',
    // height: '40%',
  },
  paragraphView: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    width: '100%',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: Colors.accent,
    textAlign: 'center',
    justifyContent: 'center',
  },
  bottomSectionImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  sectionBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    marginBottom: 25,
  },
});
