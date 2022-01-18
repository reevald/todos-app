import { Image, View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const closeIcon = require("../../assets/close-fill.png");

export default function HeaderCreateTodo({navScreen}) {
  return (
    <View style={tw`absolute top-0 left-0 bg-white h-20 px-4 z-20 w-full flex-row items-center justify-between`}>
      <Text style={tw`text-gray-700 text-4xl`}>
        Add Todo
      </Text>
      <TouchableOpacity onPress={() => navScreen.navigate("Home")}>
        <Image source={closeIcon} />
      </TouchableOpacity>
    </View> 
  );
}