import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

const MealDetails = ({flag, duration, servings, calories}) => {
  return (
    <View style={{...styles.mealRow, ...styles.mealDetail}}>
      {/* <CountryFlag isoCode={flag} size={15} /> */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name={'stopwatch'} size={24} color={Colors.accent} />
        <Text style={styles.mealDetailTitle}>{duration}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.mealDetailTitle}>{calories}</Text>
        <SimpleLineIcons name={'fire'} size={15} color={Colors.accent} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.mealDetailTitle}>{servings}</Text>
        <Ionicons name={'people-outline'} size={22} color={Colors.accent} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealDetail: {
    paddingHorizontal: 10,
    marginTop: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: '15%',
    backgroundColor: Colors.primary,
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealDetailTitle: {
    color: 'white',
    marginHorizontal: 5,
    // fontWeight: 'bold'
  },
});

export default MealDetails;
