import { Image, View, Text, SectionList, TouchableHighlight, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { API } from "../config/api";

const closeIcon = require("../../assets/close-circle-line.png");
const blankCheckIcon = require("../../assets/checkbox-blank-line.png");
const fillCheckIcon = require("../../assets/checkbox-fill.png");

const deleteHandler = async (todoId) => {
  const api = API();
  try {
    const config = {
      method: "DELETE"
    }

    const response = await api.delete(`/todo/${todoId}`, config);
    if (response.status === "success") return true;
    return false;
  } catch {
    return false;
  }
}

const changeStatusHandler = async (todoId, currStatus) => {
  const api = API();
  const newStatus = (currStatus === "done") ? "pending" : "done";
  try {
    const config = {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: newStatus
      })
    }

    const response = await api.delete(`/todo/${todoId}`, config);
    if (response.status === "success") return true;
    return false;
  } catch {
    return false;
  }
}

const ItemTodo = (props) => (
  <View
    style={tw.style(`flex-row bg-white rounded-md p-3 py-4 mx-4 my-2 shadow-sm`,
      (props.item.status === "done") && `opacity-60`
    )}
  >
    <View>
      <TouchableHighlight
        activeOpacity={0.4}
        underlayColor="#FFF"
        style={tw`opacity-20`}
        onPress={() => {
          deleteHandler(props.item.id)
            .then((resStatus) => resStatus && props.navScreen.push("Home"))
        }}
      >
        <Image source={closeIcon} />
      </TouchableHighlight>
    </View>
    <View style={tw`flex-1 px-3`}>
      <TouchableOpacity onPress={() => props.navScreen.push("UpdateTodo", {
        dataTodo: props.item
      })}>
        <Text style={tw`text-gray-700 mb-1`}>{props.item.title}</Text>
        <Text style={tw`text-xs text-gray-500 mb-3`}>{props.item.label}</Text>
        <View style={tw`flex-row`}>
          {(props.item.priority === "Low") ?
            <View style={tw`rounded-md border-2 border-blue-200 bg-blue-100 px-2`}>
              <Text style={tw`text-blue-500`}>Low</Text>
            </View>
            :
            (props.item.priority === "Medium") ?
              <View style={tw`rounded-md border-2 border-purple-200 bg-purple-100 px-2`}>
                <Text style={tw`text-purple-500`}>Medium</Text>
              </View>
              :
              <View style={tw`rounded-md border-2 border-red-200 bg-red-100 px-2`}>
                <Text style={tw`text-red-500`}>High</Text>
              </View>
          }
        </View>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableHighlight
        activeOpacity={0.4}
        underlayColor="#FFF"
        style={tw`opacity-20`}
        onPress={() => {
          changeStatusHandler(props.item.id, props.item.status)
            .then((resStatus) => resStatus && props.navScreen.push("Home"))
        }}
      >
        {(props.item.status === "pending") ?
          <Image source={blankCheckIcon} />
          :
          <Image source={fillCheckIcon} />
        }
      </TouchableHighlight>
    </View>
  </View>
);

const ListTodoHome = (props) => {
  if (!props.dataTodos) return null;

  const listPendingTodos = props.dataTodos.filter((dataTodo) => dataTodo.status === "pending");
  const listDoneTodos = props.dataTodos.filter((dataTodo) => dataTodo.status === "done");

  const renderItemTodo = ({ item }) => (
    <ItemTodo
      item={item}
      navScreen={props.navScreen}
    />
  );
  // Ref:
  // https://reactnative.dev/docs/using-a-listview
  return (
    <View style={tw`mt-20`}>
      <SectionList
        sections={[
          { titleLine: false, data: listPendingTodos },
          { titleLine: true, data: listDoneTodos }
        ]}
        renderItem={renderItemTodo}
        renderSectionHeader={
          ({ section }) => section.titleLine && <View style={tw`mx-4 my-4 border border-gray-300`} />
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ListTodoHome;