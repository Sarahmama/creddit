import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Post = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("PostDetail", { postId: props.id })}
      >
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 15,
    backgroundColor: "#edede9",
    borderRadius: 20,
    marginHorizontal: "auto",
    justifyContent: "center",
    width: "95%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default Post;
