import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Colors, Icons } from "../../../common";
import TextElement from "../../../components/TextElement";
import Screen from "../../../components/Screen";
import { AppHeader } from "../../../components";
import axios from 'axios'

const DetectorScreen = () => {
 
    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResult] = useState("");
  
    const handleInputChange = (value) => {
      setSearchQuery(value);
        console.log(value)

    };
  
    const handleSearch = () => {
      // Perform search operation using the searchQuery
      const formData = new FormData();
      formData.append("news_text", searchQuery);
      
      console.log('check', formData);
        axios
        .post("http://127.0.0.1:5000/api/predict", formData)
        .then((res) => {
          const prediction = res.data.prediction;
        //   let resultFromAPI = "Fake News";
          console.log("checking the res", prediction);
  
          for (let prop in prediction) {
            console.log("checking the res", prediction[prop]);
            if (prediction[prop] !== "Fake News") {
              resultFromAPI = "Valid News";
              setResult(resultFromAPI)
              return;
            }
          }
          console.log("resultFromAPI", resultFromAPI);
          setResult(resultFromAPI);
        })
        .catch((err) => console.log("checking the err", err));
    };
  
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };
    return (
        <Screen>
            <AppHeader />
                <TextElement style={styles.heading}>PLEASE TYPE THE NEWS TO VERIFY IF IT'S FAKE OR REAL.</TextElement>

                <View style={styles.container}>
                    <TextInput
                        placeholder="Enter news article text..."
                        placeholderTextColor={Colors.lightgray}
                        value={searchQuery}
                        onChangeText={handleInputChange}
                        onKeyDown={handleKeyDown}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <Icons.MaterialIcons name="search" color={Colors.blue} size={30} />
                    </TouchableOpacity>
                </View>

            
                    <View style={{ paddingHorizontal: 20 }}>
                        <TextElement style={{ color: Colors.blue }}>
                            Prediction: {result}
                        </TextElement>
                    </View>
            
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 50,
        alignSelf: "center",
        marginVertical: 5,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    input: {
        width: "90%",
        height: "100%",
        alignSelf: "center",
        color: Colors.black,
        fontSize: 16,
        paddingLeft: 10,
    },
    heading: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        padding: 15,
        margin: 15
    },
});

export default DetectorScreen;
