import { View, StatusBar } from "react-native";
import tw from 'twrnc';

export default function WrapperHome({children}) {
  return (
    <View style={tw.style(`flex-1 bg-gray-100`)}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F3F4F6"
      />
      {children}
    </View>
  );
}