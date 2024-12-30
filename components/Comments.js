import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../apis/creddit";

const Comments = (props) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: () => deleteComment(props.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });
  const handleCommentDelete = () => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            mutation.mutate(props.id);
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handleCommentDelete}>
      <Text style={styles.title}>
        {props.username}: {props.comment}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#748cab",
    margin: 3,
    padding: 8,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "medium",
    marginBottom: 5,
  },
});
export default Comments;
