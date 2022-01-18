import { API } from "../config/api";
import { useQuery } from "react-query";

// Sub Component Home
import ListTodoHome from '../compHome/listTodoHome';
import WrapperHome from '../compHome/wrapperHome';
import HeaderHome from '../compHome/headerHome';
import BtnCreateTodoHome from '../compHome/buttonCreateTodoHome';
import EmptyTodoHome from "../compHome/emptyTodoHome";

export default function Home({ navigation, route }) {
  const api = API();
  // Get all todos
  const { data: todos } = useQuery("getAllTodos", async () => {
    const config = {
      method: "GET"
    }

    const response = await api.get("/todos", config);
    if (response.status === "success") return response.data.todos;
  });

  // Ref: ScrollView vs FlatList
  // https://www.geeksforgeeks.org/when-we-use-scrollview-over-flatlist-or-vice-versa/
  return (
    <WrapperHome>
      <HeaderHome />
      { (todos && todos.length !== 0) ?
        <ListTodoHome dataTodos={todos} navScreen={navigation} />
      :
        <EmptyTodoHome />
      }
      <BtnCreateTodoHome navScreen={navigation} />
    </WrapperHome>
  );
}