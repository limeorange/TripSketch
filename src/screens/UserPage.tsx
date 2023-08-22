import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { category } from "../../data/mockdata";
import { Text, TouchableOpacity } from "react-native";
import { useGetDiariesByCategory } from "../hooks/usePostQuery";
import { useGetUserByNickname } from "../hooks/useUserQuery";
import { RootStackParamList, StackNavigation } from "../types/RootStack";

import Profile from "../components/user/profile/Profile";
import Category from "../components/user/Category";
import DiaryList from "../components/user/DiaryList";
import UserPageSkeletonUI from "../components/user/UserPageSkeletonUI";

type UserScreenRouteProp = RouteProp<RootStackParamList, "UserPage">;

const UserPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");

  const navigation = useNavigation<StackNavigation>();
  const route = useRoute<UserScreenRouteProp>();
  const nickname = route.params.nickname;

  const user = useGetUserByNickname(nickname);
  // const diaries = useGetDiariesByCategory(nickname, selectedCategory) ?? [];

  console.log(user);

  if (user.isLoading) {
    return <UserPageSkeletonUI />;
  }

  if (user.isError) {
    return <UserPageSkeletonUI />;
  }

  if (!user.data) {
    return <UserPageSkeletonUI />;
  }

  const handleFollow = async () => {
    console.log("팔로우");
  };

  return (
    <UserPageLayout>
      <Profile variant={"userPage"} user={user.data} onPress={handleFollow} />

      <Category
        category={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* <DiaryList diaries={diaries.data} /> */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UserPage", {
            nickname: "네이버",
          })
        }
      >
        <Text>유저버튼</Text>
      </TouchableOpacity>
    </UserPageLayout>
  );
};

export const UserPageLayout = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  gap: 20px;
  background-color: white;
`;

export default UserPage;
