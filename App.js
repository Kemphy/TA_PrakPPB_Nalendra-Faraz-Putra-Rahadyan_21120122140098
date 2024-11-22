import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./src/pages/Welcome";
import Login from "./src/pages/Login";
import BottomNav from "./src/navigation/BottomNav";
import MotorDetail from "./src/pages/MotorDetail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={BottomNav} />
        <Stack.Screen
          name="MotorDetail"
          component={MotorDetail}
          options={{
            headerShown: true,
            headerTitle: "Detail Motor",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
