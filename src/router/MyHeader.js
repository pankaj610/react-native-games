import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
function MyHeader({ title, style, navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <IonIcons
          name="menu-outline"
          size={30}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text>{title}</Text>
        <IonIcons
          name="add-outline"
          size={30}
          onPress={() => navigation.navigate("DevoteeRegistration")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 5,
  },
});
export default MyHeader;
