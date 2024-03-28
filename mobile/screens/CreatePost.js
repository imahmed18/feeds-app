import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createFeedPost } from "../api/service/feed";
import { appendListing } from "../redux-store/feed-slice";

const CreatePostScreen = () => {
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [posting, setPosting] = useState(false);

  const postCreateCleanup = () => {
    setPosting(false);
    setPostText("");
    setSelectedImages([]);
  };

  const handlePost = async () => {
    if (!postText.length) {
      alert("Post text cannot be empty.");
      return;
    }

    const data = {
      text: postText,
      images: [],
    };

    if (selectedImages.length) {
      for (const image of selectedImages) {
        data.images.push({
          name: image.fileName,
          ext: image.mimeType,
          base64: image.base64,
        });
      }
    }

    setPosting(true);

    createFeedPost(data)
      .then((res) => {
        dispatch(appendListing({ feedItem: res }));
        alert("You posted to your feed!");
      })
      .catch((err) => alert("Something went wrong."))
      .finally(() => {
        postCreateCleanup();
      });
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImages((prevImages) => [...prevImages, ...result.assets]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What's on your mind</Text>
        <TextInput
          multiline
          placeholder="Write your post here..."
          value={postText}
          onChangeText={setPostText}
          style={styles.textInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={posting}
          style={styles.attachImageButton}
          onPress={handleImagePick}
        >
          <Ionicons name="attach" size={40} color="teal" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={posting}
          activeOpacity={0.1}
          onPress={handlePost}
          style={styles.sendButton}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {selectedImages.length ? (
        <View style={styles.imagesContainer}>
          <ScrollView horizontal>
            {selectedImages.map((image, index) => (
              <View>
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={styles.thumbnail}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
    flexDirection: "row",
    top: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imagesContainer: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    paddingBottom: 10,
    fontFamily: "titlefont",
    fontSize: 17,
  },
  textInput: {
    height: 150,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  attachImageButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "teal",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostScreen;
