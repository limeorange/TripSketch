import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import PostViewContainer from "./PostViewContainer";
import Comment from "./Comment";
import CommentBest from "./CommentBest";
import LikesAndCommentText from "./LikesAndCommentText";
import {
  useGetPostAndComments,
  useGetPostAndCommentsForGuest,
} from "../../hooks/usePostQuery";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import PostViewSkeleton from "./components/post/PostViewSkeleton";
import LikeAndCommentSkeleton from "./components/comment/LikesAndCommentSkeleton";

const PostDetailPageComponent = ({ postId }: { postId: string }) => {
  const { data: userData } = useGetCurrentUser();
  let postAndCommentData, isDataLoading, isDataError;

  if (userData) {
    // 로그인된 사용자의 데이터 가져오기
    const userResult = useGetPostAndComments(postId);
    postAndCommentData = userResult.postAndCommentData;
    isDataLoading = userResult.isDataUserLoading;
    isDataError = userResult.isDataUserError;
  } else {
    // 비로그인 상태의 데이터 가져오기
    const guestResult = useGetPostAndCommentsForGuest(postId);
    postAndCommentData = guestResult.postAndCommentGuestData;
    isDataLoading = guestResult.isDataGuestLoading;
    isDataError = guestResult.isDataGuestError;
  }

  // 바텀시트 높이 조절하는 변수
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "50%", "90%"], []);
  const [sheetIndex, setSheetIndex] = useState(0);

  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const handleSheetChange = useCallback((index: number) => {
    setSheetIndex(index);
    Animated.timing(overlayOpacity, {
      toValue: index >= 1 ? 0.5 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  if (isDataLoading) {
    return (
      <View>
        <PostViewSkeleton />
        <LikeAndCommentSkeleton />
      </View>
    );
  }

  if (isDataError) {
    return <Text>에러</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <ScrollView>
          <PostViewContainer
            postId={postId}
            postData={postAndCommentData.tripAndCommentPairDataByTripId.first}
          />
          <LikesAndCommentText
            postId={postId}
            handleIconPress={(index) => handleSnapPress(index)}
            postData={postAndCommentData.tripAndCommentPairDataByTripId.first}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSnapPress(1)}
          >
            <CommentBest
              postId={postId}
              commentData={
                postAndCommentData.tripAndCommentPairDataByTripId.second
              }
            />
          </TouchableOpacity>
        </ScrollView>
        {sheetIndex >= 1 && (
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
        )}
      </View>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        style={styles.sheet}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {postAndCommentData && (
            <Comment
              postId={postId}
              commentData={
                postAndCommentData.tripAndCommentPairDataByTripId.second
              }
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    backgroundColor: "white",
  },
  contentContainer: {
    backgroundColor: "white",
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  sheet: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    zIndex: 3,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default PostDetailPageComponent;
