import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Config from "../config.json";

const FeedPostCard = ({ avatar, date, text, imageUrls }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isViewerVisible, setIsViewerVisible] = useState(false);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsViewerVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={24} color="black" />
          <Text style={styles.avatarText}>User {avatar}</Text>
        </View>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
      <View style={styles.border} />
      <Text style={styles.textContent}>{text}</Text>

      {imageUrls.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageThumbnails}
        >
          {imageUrls.map((imageUrl, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(imageUrl)}
            >
              <Image
                source={{ uri: `${Config.BACKEND_URL}uploads/${imageUrl}` }}
                style={styles.thumbnailImage}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}

      <Modal visible={isViewerVisible} transparent={true}>
        <View style={styles.imageViewerContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsViewerVisible(false)}
          >
            <Ionicons name="close-circle-outline" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: `${Config.BACKEND_URL}uploads/${selectedImage}` }}
            style={styles.selectedImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 15,
    elevation: 3,
    marginTop: 20,
    width: 350,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: "700",
    marginLeft: 5,
    fontFamily: "bodyfont",
  },
  dateText: {
    fontWeight: "700",
    color: "gray",
    fontFamily: "bodyfont",
  },
  border: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  textContent: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "opensans",
  },
  imageThumbnails: {
    marginTop: 10,
    flexDirection: "row",
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  imageViewerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  selectedImage: {
    width: "90%",
    height: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default FeedPostCard;
