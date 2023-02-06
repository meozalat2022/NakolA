import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import firestore from '@react-native-firebase/firestore';
import InterstisialAdUnite from '../../components/InterstisialAdUnite';
import BannerAdUnite from '../../components/BannerAdUnite';
const Home = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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
        console.log('error', error);
      }
    };
    fetchCategories();
  }, []);

  const renderDataItems = itemData => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShowMealsList', {
              itemId: itemData.item.id,
              itemTitle: itemData.item.title,
            });
          }}>
          <View style={{marginBottom: 5}}>
            <View style={styles.iconView}>
              <Image style={styles.icon} source={{uri: itemData.item.icon}} />
              <Text style={styles.icontext}>{itemData.item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const [loading, setLoading] = useState(false);
  const [hasMeatCube, setHasMeatCube] = useState(false);
  const [hasGroundMeat, setHasGroundMeat] = useState(false);
  const [hasKofta, setHasKofta] = useState(false);
  const [hasLiver, setHasLiver] = useState(false);
  const [hasSusage, setHasSusage] = useState(false);
  const [hasMeatShank, setHasMeatShank] = useState(false);
  const [hasEscalop, setHasEscalop] = useState(false);
  const [hasMeatSteak, setHasMeatSteak] = useState(false);
  const [hasCheckin, setHasCheckin] = useState(false);
  const [hasCheckinFillet, SetHasCheckinFillet] = useState(false);
  const [hasTurkey, setHasTurkey] = useState(false);
  const [hasKidney, setHasKidney] = useState(false);
  const [hasCheckinWings, setHasCheckinWings] = useState(false);
  const [hasCheckinLegs, setHasCheckinLegs] = useState(false);
  const [hasShawrma, setHasShawrma] = useState(false);
  const [hasFish, setHasFish] = useState(false);
  const [hasSeafood, setHasSeafood] = useState(false);
  const [hasCrabs, setHasCrabs] = useState(false);
  const [hasShrimp, setHasShrimp] = useState(false);
  const [hasFishFillet, setHasFishFillet] = useState(false);
  const [hasCalamari, setHasCalamari] = useState(false);
  const [hasRice, setHasRice] = useState(false);
  const [hasPasta, setHasPasta] = useState(false);
  const [hasFrik, setHasFrik] = useState(false);
  const [hasPotatos, setHasPotatos] = useState(false);
  const [hasEggplants, setHasEggplants] = useState(false);
  const [hasZucchini, setHasZucchini] = useState(false);
  const [hasPeas, setHasPeas] = useState(false);
  const [hasSpinach, setHasSpinach] = useState(false);
  const [hasCauliflower, setHasCauliflower] = useState(false);
  const [hasOcra, setHasOcra] = useState(false);
  const [hasMolokhia, setHasMolokhia] = useState(false);
  const [hasVegetarian, setHasVegetarian] = useState(false);
  const [hasKeto, setHasKeto] = useState(false);
  const [hasDiet, setHasDiet] = useState(false);
  const [hasCabbage, setHasCabbage] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('FilteredList', {
        filteredList: {
          hasMeatCube,
          hasGroundMeat,
          hasTurkey,
          hasKofta,
          hasLiver,
          hasSusage,
          hasMeatShank,
          hasEscalop,
          hasCheckin,
          hasCheckinFillet,
          hasKidney,
          hasMeatSteak,
          hasCheckinWings,
          hasCheckinLegs,
          hasShawrma,
          hasFish,
          hasSeafood,
          hasCrabs,
          hasShrimp,
          hasFishFillet,
          hasCalamari,
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
          hasKeto,
          hasDiet,
          hasCabbage,
        },
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <InterstisialAdUnite />
      <View style={styles.findRecipe}>
        <View>
          <FlatList
            data={categories}
            renderItem={renderDataItems}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <BannerAdUnite />
        </View>
        <View style={styles.recipiesContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}> البروتينات - اللحوم </Text>
            <View>
              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>مكعبات لحمة</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasMeatCube}
                  onValueChange={newValue => setHasMeatCube(newValue)}
                />
              </View>
              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}> لحمة مفرومة </Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasGroundMeat}
                  onValueChange={newValue => setHasGroundMeat(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>كفتة</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasKofta}
                  onValueChange={newValue => setHasKofta(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>كبدة</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasLiver}
                  onValueChange={newValue => setHasLiver(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>سجق</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasSusage}
                  onValueChange={newValue => setHasSusage(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}> موزة لحمة </Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasMeatShank}
                  onValueChange={newValue => setHasMeatShank(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>بفتيك</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasEscalop}
                  onValueChange={newValue => setHasEscalop(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>ستيك</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasMeatSteak}
                  onValueChange={newValue => setHasMeatSteak(newValue)}
                />
              </View>

              <BannerAdUnite />
              <Text style={styles.title}> البروتينات - الدواجن </Text>
              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>فراخ</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasCheckin}
                  onValueChange={newValue => setHasCheckin(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>فراخ فيليه</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasCheckinFillet}
                  onValueChange={newValue => SetHasCheckinFillet(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>ديك رومي</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasTurkey}
                  onValueChange={newValue => setHasTurkey(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>كبد وقوانص</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasKidney}
                  onValueChange={newValue => setHasKidney(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>اجنحة فراخ</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasCheckinWings}
                  onValueChange={newValue => setHasCheckinWings(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>وراك فراخ</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasCheckinLegs}
                  onValueChange={newValue => setHasCheckinLegs(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>شاورما</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasShawrma}
                  onValueChange={newValue => setHasShawrma(newValue)}
                />
              </View>

              <Text style={styles.title}> اسماك </Text>
              <BannerAdUnite />

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>سمك</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasFish}
                  onValueChange={newValue => setHasFish(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>ٍسي فود</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasSeafood}
                  onValueChange={newValue => setHasSeafood(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>كابوريا</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasCrabs}
                  onValueChange={newValue => setHasCrabs(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>جمبري</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasShrimp}
                  onValueChange={newValue => setHasShrimp(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>سمك فيليه</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasFishFillet}
                  onValueChange={newValue => setHasFishFillet(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>كاليماري</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasCalamari}
                  onValueChange={newValue => setHasCalamari(newValue)}
                />
              </View>

              <Text style={styles.title}> النشويات </Text>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>رز</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasRice}
                  onValueChange={newValue => setHasRice(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>مكرونة</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasPasta}
                  onValueChange={newValue => setHasPasta(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>فريك</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasFrik}
                  onValueChange={newValue => setHasFrik(newValue)}
                />
              </View>

              <Text style={styles.title}> الخضار </Text>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>بطاطس</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasPotatos}
                  onValueChange={newValue => setHasPotatos(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>برنجان</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasEggplants}
                  onValueChange={newValue => setHasEggplants(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>كوسة</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasZucchini}
                  onValueChange={newValue => setHasZucchini(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>بسلة</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasPeas}
                  onValueChange={newValue => setHasPeas(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>سبانخ</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasSpinach}
                  onValueChange={newValue => setHasSpinach(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>قرنبيط</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasCauliflower}
                  onValueChange={newValue => setHasCauliflower(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>كرنب</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasCabbage}
                  onValueChange={newValue => setHasCabbage(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>بامية</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasOcra}
                  onValueChange={newValue => setHasOcra(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>ملوخية</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasMolokhia}
                  onValueChange={newValue => setHasMolokhia(newValue)}
                />
              </View>
              <BannerAdUnite />

              <Text style={styles.title}> نباتي - دايت - كيتو </Text>
              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>بناتي</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasVegetarian}
                  onValueChange={newValue => setHasVegetarian(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>كيتو</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasKeto}
                  onValueChange={newValue => setHasKeto(newValue)}
                />
              </View>

              <View style={styles.switchView}>
                <Text style={styles.switchViewTitle}>دايت</Text>
                <Switch
                  thumbColor={Colors.primary}
                  trackColor={{true: Colors.accent, false: Colors.primary}}
                  value={hasDiet}
                  onValueChange={newValue => setHasDiet(newValue)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.submit} onPress={startLoading}>
          <Text style={styles.submitText}>يــــــــــــــلا</Text>
        </TouchableOpacity>
        <View>
          <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../../assets/LandingScreen.json')}
            animationStyle={styles.lottie}
            speed={1}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //    backgroundColor: '#3d405b'
  },
  findRecipe: {
    width: '95%',
    height: '95%',
    marginTop: 15,
    marginBottom: 25,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  recipiesContainer: {
    // borderWidth: 2,
    // borderColor: 'red',
    // backgroundColor: Colors.eggShel,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 5,
    flex: 1,
  },
  lottie: {
    width: '75%',
    height: '75%',
    alignItems: 'center',
  },
  submit: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 5,
    borderColor: Colors.accent,
    borderWidth: 2,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 10,
  },
  submitText: {
    color: Colors.accent,
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchView: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 25
  },
  switchViewTitle: {
    color: Colors.accent,
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    alignContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
    backgroundColor: Colors.accent,
    borderRadius: 10,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 2,
  },
  icontext: {
    // color: Colors.accent,
    color: Colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;
