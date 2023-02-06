import {StyleSheet, Text, Share, View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import ShowRecipe from './src/screens/ShowRecipe';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './navigation/DrawerContent';
import SplashScreen from './src/screens/SplashScreen';
import FilteredList from './src/screens/FilteredList';
import LandingScreen from './src/screens/LandingScreen';
import RecipesCategory from './src/screens/RecipesCategory';
import ShowMealsList from './src/screens/ShowMealsList';
import SearchResult from './src/screens/SearchResult';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from './constants/Colors';

const Drawer = createDrawerNavigator();

const Drawernavigator = ({navigation}) => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'تاكلوا ايه؟',
          headerRight: () => (
            <View style={{marginRight: 15}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LandingScreen')}>
                <FontAwesome5 name={'home'} size={22} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            // backgroundColor: Colors.terraCota,
          },
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={({navigation}) => ({
          title: 'تاكلوا ايه؟',
          headerRight: () => (
            <View style={{marginRight: 15}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LandingScreen')}>
                <FontAwesome5 name={'home'} size={22} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            // backgroundColor: Colors.terraCota,
          },
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        })}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FilteredList"
        component={FilteredList}
        options={{
          title: 'الوصفات المختارة',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Index"
        component={Drawernavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShowRecipe"
        component={ShowRecipe}
        options={({route, navigation}) => ({
          title: route.params.itemTitle,
          headerRight: () => (
            <View style={{marginRight: 15}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LandingScreen')}>
                <FontAwesome5 name={'home'} size={22} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.accent,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        })}
      />
      <Stack.Screen
        name="RecipesCategory"
        component={RecipesCategory}
        options={({navigation}) => ({
          title: 'جميع الوصفات',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // headerRight: () => (
          //   <View style={{ marginRight: 15 }}>
          //     <TouchableOpacity
          //       onPress={() => navigation.navigate("SearchResult")}
          //     >
          //       <FontAwesome name="search" size={24} color="white" />
          //     </TouchableOpacity>
          //   </View>
          // ),
        })}
      />
      <Stack.Screen
        name="ShowMealsList"
        component={ShowMealsList}
        options={({route}) => ({
          title: route.params.itemTitle,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.accent,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
