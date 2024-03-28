import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import FeedPostCard from "../components/FeedCard";
import { useFetchFeedPosts } from "../api/service/feed";

const FeedScreen = () => {
  const { fetch } = useFetchFeedPosts();
  const {
    listing: feedListing,
    loading,
    error,
  } = useSelector((state) => state.feed);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (isAtBottom) {
      console.log("Scrolled to the bottom!");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={{ paddingBottom: 20 }}>
        {loading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : null}
        {feedListing.length
          ? feedListing.map((f) => (
              <FeedPostCard
                avatar={null}
                date={f.createdAt}
                text={f.text}
                imageUrls={f.images}
                key={f._id}
              />
            ))
          : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default FeedScreen;
