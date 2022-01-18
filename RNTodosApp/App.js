// Ref: 
// https://reactnative.dev/docs/navigation
// https://reactnavigation.org/docs/hello-react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screen/home";
import CreateTodo from "./src/screen/createTodo";
import UpdateTodo from "./src/screen/updateTodo";
// Init QueryClient and QueryClientProvider
import { QueryClient, QueryClientProvider } from "react-query";

// Init client from queryClient
const client = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        {/* Ref: https://reactnavigation.org/docs/stack-navigator/#screenoptions */}
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="CreateTodo"
            component={CreateTodo}
          />
          <Stack.Screen
            name="UpdateTodo"
            component={UpdateTodo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}