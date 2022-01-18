import { View, Image, Text } from "react-native";
import tw from "twrnc";

const emptyTodoImg = require("../../assets/empty.png");

export default function EmptyTodoHome() {
  return (
    <View style={tw`mt-20 w-full flex-1 flex-col justify-center items-center`}>
      <Text style={tw`text-gray-700`}>Todos you add will appear here</Text>
      <Image resizeMode="center" style={tw`w-2/3`} source={emptyTodoImg} />
    </View>
  );
}