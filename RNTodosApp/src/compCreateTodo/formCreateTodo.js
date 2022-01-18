import { View, Text, TouchableHighlight, Picker, TextInput } from "react-native";
import { useState } from "react";
import { API } from "../config/api";
import tw from "twrnc";

export default function FormCreateTodo({ navScreen }) {
  const api = API();
  const [showNotice, setShowNotice] = useState(false);
  const [title, onChangeTitle] = useState("");
  const [selectedLabelValue, setSelectedLabelValue] = useState("Home");
  const [selectedPriorityValue, setSelectedPriorityValue] = useState("Low");

  const onSubmitTodoHandler = async () => {
    if (title.length <= 3) return setShowNotice(true);

    try {
      const config = {
        method: "POST",
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          label: selectedLabelValue,
          priority: selectedPriorityValue
        })
      }

      const response = await api.post("/todo", config);
      console.log(response);
      if (response.status === "success") return navScreen.push("Home");
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <View style={tw`mt-20 mx-4`}>
        <Text style={tw`text-gray-700 mb-2`}>
          To-do
        </Text>
        {showNotice &&
          <Text style={tw`text-red-400`}>Please fill out this field, min 3 characters</Text>
        }
        <TextInput
          style={tw`border border-gray-400 rounded-sm p-2 mb-6`}
          value={title}
          onChangeText={onChangeTitle}
          placeholder="What needs to be done?"
        />
        <Text style={tw`text-gray-700 mb-2`}>
          Label
        </Text>
        <Picker
          style={tw`mb-6 text-gray-700`}
          selectedValue={selectedLabelValue}
          onValueChange={(itemValue, itemIndex) => setSelectedLabelValue(itemValue)}
        >
          <Picker.Item label="Home" value="Home" />
          <Picker.Item label="School" value="School" />
          <Picker.Item label="Music" value="Music" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Otomotif" value="Otomotif" />
          <Picker.Item label="Teknologi" value="Teknologi" />
        </Picker>
        <Text style={tw`text-gray-700 mb-2`}>
          Priority
        </Text>
        <Picker
          style={tw`text-gray-700`}
          selectedValue={selectedPriorityValue}
          onValueChange={(itemValue, itemIndex) => setSelectedPriorityValue(itemValue)}
        >
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>
      <View style={tw`absolute bottom-0 right-0 w-full mb-6 px-4`}>
        <TouchableHighlight
          // activeOpacity={0.6}
          underlayColor="#1D4ED8"
          onPress={() => onSubmitTodoHandler()}
          style={tw`shadow-md rounded-md bg-blue-500 h-16 w-full justify-center items-center`}
        >
          <Text style={tw`text-2xl text-white`}>Done</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}