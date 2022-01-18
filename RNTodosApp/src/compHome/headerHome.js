import { View, Text } from "react-native";
import tw from "twrnc";

export default function HeaderHome() {
  return (
    <View style={tw`absolute top-0 left-0 bg-gray-100 h-20 pl-4 z-20 w-full justify-center`}>
      <Text style={tw`text-gray-700 text-4xl`}>
        Todos
      </Text>
    </View>
  );
}