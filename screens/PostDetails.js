import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addComment, deletePost, getPostById } from "../apis/creddit";
import Comments from "../components/Comments";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostDetails = ({ route }) => {
  const { postId } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigation.navigate("Home");
    },
  });

  const { data, isFetching, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostById(postId),
  });

  console.log("PostId:", postId);
  console.log("Data:", data);

  if (isFetching)
    return (
      <View style={styles.card}>
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.card}>
        <Text>Error: {error.message}</Text>
      </View>
    );

  if (!data)
    return (
      <View style={styles.card}>
        <Text>No data found</Text>
      </View>
    );

  const handlePostDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            mutation.mutate(postId, {
              onSuccess: () => navigation.navigate("Home"),
            });
          },
        },
      ],
      { cancelable: true }
    );
  };
  const commentList = data?.comments?.map((item) => {
    return (
      <Comments
        key={item.id}
        username={item.username}
        comment={item.comment}
        id={item.id}
        postId={postId}
      />
    );
  });
  return (
    <ScrollView style={{ width: "100%", backgroundColor: "#fff" }}>
      <View style={styles.card}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.description}>{data?.description}</Text>
      </View>
      <View style={styles.card1}>
        <Text style={styles.title1}>Comments</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#003049",
            borderRadius: 5,
            padding: 5,
            margin: 5,
          }}
          onPress={() => {
            navigation.navigate("Comment", { postId: postId });
          }}
        >
          <Ionicons
            name="add-outline"
            size={30}
            color="#fff"
            style={{ marginHorizontal: "auto" }}
          />
        </TouchableOpacity>
        {commentList}
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => handlePostDelete()}>
        <Ionicons
          name="trash-outline"
          size={30}
          color="#fff"
          style={{ marginHorizontal: "auto" }}
        />
      </TouchableOpacity>
    </ScrollView>
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
  card1: {
    margin: 5,
    padding: 1,
    backgroundColor: "#edede9",
    borderRadius: 20,
    marginHorizontal: "auto",
    justifyContent: "center",
    width: "95%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    width: "75%",
  },
  description: {
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#003049",
    width: "50%",
    justifyContent: "canter",
    alignItems: "canter",
    marginHorizontal: "auto",
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
});
export default PostDetails;
