import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Initial Stack Screen</Text>
      <Button 
        title="Go to Tab2" 
        onPress={() => router.replace('/(tabs)/tab2')}
      />
    </View>
  );
}

export default Index;
