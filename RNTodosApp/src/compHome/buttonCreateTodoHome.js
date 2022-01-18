import { TouchableHighlight, Text } from "react-native";
import tw from "twrnc";

export default function BtnCreateTodoHome({navScreen}) {
  return (
    <TouchableHighlight 
      // activeOpacity={0.6}
      underlayColor="#1D4ED8"
      onPress={() => navScreen.navigate("CreateTodo")}
      style={tw`shadow-md absolute bottom-0 right-0 bg-blue-500 mb-6 mr-4 rounded-md h-16 w-16 justify-center items-center`}
    >
      <Text style={tw`text-4xl text-white`}>+</Text>
    </TouchableHighlight>
  );
}