import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Post from "./Post";
import { getAllPosts } from "../apis/creddit";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  const postsList = data?.map((x) => {
    return (
      <Post key={x.id} title={x.title} description={x.description} id={x.id} />
    );
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <ScrollView style={{ width: "100%" }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Add")}
        >
          <Ionicons
            name="add-outline"
            size={30}
            color="#fff"
            style={{ marginHorizontal: "auto" }}
          />
        </TouchableOpacity>
        <View style={styles.container}>{postsList}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  btn: {
    backgroundColor: "#003049",
    width: "75%",
    justifyContent: "canter",
    alignItems: "canter",
    marginHorizontal: "auto",
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
});

export default HomeScreen;
