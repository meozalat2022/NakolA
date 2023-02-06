import React from "react";
import {View, StyleSheet, Text, FlatList} from 'react-native';
import Colors from "../constants/Colors";


const MealIngredients = ({ingredients, title})=>{

    return(
        <View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.ingredientTitls}>{title}</Text>
            </View>
            <FlatList data={ingredients} renderItem={({item})=>{
                return(
                    <View style={styles.ingredients}>
                        <Text style={{color: Colors.primary}}>{item}</Text>
                    </View>
                )
            }}/>
        </View>
    )
};

const styles = StyleSheet.create({
    ingredients:{
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
      },
      ingredientTitls:{
        fontSize: 25,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        color: Colors.primary,
        fontWeight: 'bold',
        
      },
});

export default MealIngredients;