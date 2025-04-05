import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.recipeName : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saverecipe = async () => {
    const newrecipe = {
        category:'Beef',
        idFood:'1',
        idCategory: "1",
        recipeName: title,
        recipeInstructions: "Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you're ready to assemble the pie, preheat the oven to 200C/400F/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.",
        recipeImage: "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        recipeId: "beef_01",
        alternateDrink: null,
        recipeCategory: "Beef",
        recipeOrigin: "British",
        cookingDescription: "Preheat the oven to 150C/300F/Gas 2. Toss the beef and flour together in a bowl with some salt and black pepper...",
        recipeTags: "Meat,Pie",
        ingredients: [
          {
            ingredientName: "Beef",
            measure: "1kg"
          },
          {
            ingredientName: "Plain Flour",
            measure: "2 tbs"
          },
          {
            ingredientName: "Rapeseed Oil",
            measure: "2 tbs"
          },
          {
            ingredientName: "Red Wine",
            measure: "200ml"
          },
          {
            ingredientName: "Beef Stock",
            measure: "400ml"
          },
          {
            ingredientName: "Onion",
            measure: "1 finely sliced"
          },
          {
            ingredientName: "Carrots",
            measure: "2 chopped"
          },
          {
            ingredientName: "Thyme",
            measure: "3 sprigs"
          },
          {
            ingredientName: "Mustard",
            measure: "2 tbs"
          },
          {
            ingredientName: "Egg Yolks",
            measure: "2 free-range"
          },
          {
            ingredientName: "Puff Pastry",
            measure: "400g"
          },
          {
            ingredientName: "Green Beans",
            measure: "300g"
          },
          {
            ingredientName: "Butter",
            measure: "25g"
          },
          {
            ingredientName: "Salt",
            measure: "pinch"
          },
          {
            ingredientName: "Pepper",
            measure: "pinch"
          }
        ],
         
  
      }
    const recipes = await AsyncStorage.getItem("customrecipes")  || [];
    try {
        await AsyncStorage.setItem("customrecipes", JSON.stringify(newrecipe))
        }
        catch {
            console.log('Error while adding recepie')
        }
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={
        saverecipe
        
        } style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
