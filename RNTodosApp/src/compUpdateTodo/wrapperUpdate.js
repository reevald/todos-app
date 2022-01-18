import { View, StatusBar } from "react-native";
import tw from 'twrnc';

export default function WrapperUpdateTodo({children}) {
  return (
    <View style={tw.style(`flex-1 bg-white`)}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF"
      />
      {children}
    </View>
  );
}