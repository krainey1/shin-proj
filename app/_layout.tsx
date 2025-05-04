import { fontFamily } from "@/dimensions/fontFamily";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text } from "react-native"; // Optional, for loading fallback

export default function RootLayout() {
  const [loaded] = useFonts({
    [fontFamily.bold]: require("../assets/fonts/DynaPuff-Bold.ttf"),
    [fontFamily.medium]: require("../assets/fonts/DynaPuff-Medium.ttf"),
    [fontFamily.regular]: require("../assets/fonts/DynaPuff-Regular.ttf"),
  });

  if (!loaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
