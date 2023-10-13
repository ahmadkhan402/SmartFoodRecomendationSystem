import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Items, COLOURS } from "../../../Database";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { compose } from "redux";

const BuyerScreen = ({ navigation }) => {
  const [accessory, setAccessory] = useState([]);

  const [DataFruit, setDataFruit] = useState([]);
  const [DataFood, setDataFood] = useState([]);
  // console.log(DataFood);
  // console.log(DataFruit);
  //get called on screen loads
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from DB

  const getDataFromDB = async () => {
    const querySnapshot = await getDocs(collection(db, "SellItems"));
    const fruitList = [];
    const foodList = [];
    const otherList = [];
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
  
      if (data.Category === "Fruit") {
        fruitList.push({ id, ...data });
      } else if (data.Category === "Food") {
        foodList.push({ id, ...data });
      } else {
        otherList.push({ id, ...data });
      }
    });
  
    // Now, you have three separate lists for different categories: fruitList, foodList, and otherList.
    // You can use or store these lists as needed.
  
   setDataFood(foodList)
   setDataFruit(fruitList)
  };
  
    
  
  //create an product reusable card

  const ProductCard = ({ data }) => {
    // console.log( data.id )
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
         
        }
        style={{
          width: "48%",
          marginVertical: 14,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          {
            data.OffPercentage ? (
            <View
              style={{
                position: "absolute",
                width: "20%",
                height: "24%",
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {data.OffPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={{uri:data.ImageUrl}}
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: "600",
            marginBottom: 2,
          }}
        >
          {data.ProductName}
        </Text>
        <Text>RS: {data.ProductPrice}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: "500",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            Sell Service
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            Sell all desire Product in smart way
            {"\n"}This shop offers both Food and services
          </Text>
        </View>
        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Food
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: "400",
                  opacity: 0.5,
                  marginLeft: 10,
                }}
              >
                41
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {DataFood.map((item,key) => {
              return <ProductCard data={item} key={key} />;
            })}
          </View>
        </View>

        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Fruit
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: "400",
                  opacity: 0.5,
                  marginLeft: 10,
                }}
              >
                78
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {DataFruit.map((data) => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyerScreen;
