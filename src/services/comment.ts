import { axiosBase } from "../../api/axios";
import { API_PATH } from "../constants/path";

export const getCommentData = async () => {
  try {
    const response = await axiosBase.get(API_PATH.COMMENT.GET.ALL);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error");
  }
};

export const createComment = async (commentData: any) => {
  try {
    const response = await axiosBase.post(
      API_PATH.COMMENT.POST.COMMENT,
      commentData
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};
