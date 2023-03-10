import { postConstant } from 'app/shared/constants/postConstant';
import { apiWrapper } from 'app/shared/core/services/apiWrapper';
import { HandleFollowOptions } from 'app/shared/types/HandleFollow';
import { PostHandleOptions } from 'app/shared/types/PostHandle';
import {
  addBookmark,
  commentPost,
  createNewPost,
  followUser,
  getCommentPost,
  getUrlImage,
  likePost,
  updatePost,
  getNewPost,
  getUserPost,
  deleteUserPost,
  getRecommendPost,
  getSpecificArticle,
  getFeaturedPosts,
  getUserBookmark,
  getFollowers,
  getFollowings,
  getUrlImage2,
} from 'app/shared/core/services/service-post';
import axios from 'axios';

export const fetchSpecificPostRequest: any =
  (id: any) => async (dispatch: any) => {
    return apiWrapper(() => getSpecificArticle(id), dispatch);
  };

export const createNewPostRequest: any =
  (post: PostHandleOptions) => async (dispatch: any) => {
    return apiWrapper(() => createNewPost(post), dispatch);
  };

export const updatePostRequest: any =
  (post: PostHandleOptions, postId: string) => async (dispatch: any) => {
    return apiWrapper(() => updatePost(post, postId), dispatch);
  };

export const likePostRequest: any =
  (postId: string) => async (dispatch: any) => {
    return apiWrapper(() => likePost(postId), dispatch);
  };
export const addBookmarkRequest: any =
  (postId: { postId: string }) => async (dispatch: any) => {
    return apiWrapper(() => addBookmark(postId), dispatch);
  };

export const getCommentPostRequest: any =
  (postId: string) => async (dispatch: any) => {
    return apiWrapper(() => getCommentPost(postId), dispatch);
  };

export const commentPostRequest: any =
  (postId: string, post: CommentHandleOptions) => async (dispatch: any) => {
    return apiWrapper(() => commentPost(postId, post), dispatch);
  };

export const followUserRequest: any =
  (followId: HandleFollowOptions) => async (dispatch: any) => {
    return apiWrapper(() => followUser(followId), dispatch);
  };

export const getFollowingsRequest: any =
  (authorId: number) => async (dispatch: any) => {
    return apiWrapper(() => getFollowings(authorId), dispatch);
  };

export const getFollowersRequest: any =
  (authorId: number) => async (dispatch: any) => {
    return apiWrapper(() => getFollowers(authorId), dispatch);
  };

export const saveInfoPost: any = (infoPost: {
  title: string;
  description: string;
  content: string;
}) => {
  return {
    type: postConstant.SAVE_INFO_POST,
    payload: infoPost,
  };
};

export const fetchPostRequest: any =
  (pageNumber: any) => async (dispatch: any) => {
    return apiWrapper(() => getNewPost(pageNumber), dispatch);
  };

export const fetchRecommendPostRequest: any =
  (pageNumber: any) => async (dispatch: any) => {
    return apiWrapper(() => getRecommendPost(pageNumber), dispatch);
  };

export const getFeaturedPostsRequest: any =
  (pageNumber: any, size: number) => async (dispatch: any) => {
    return apiWrapper(() => getFeaturedPosts(pageNumber, size), dispatch);
  };

export const fetchUserPostRequest: any =
  (userId: any) => async (dispatch: any) => {
    return apiWrapper(() => getUserPost(userId), dispatch);
  };

export const fetchUserBookmarkRequest: any = () => async (dispatch: any) => {
  return apiWrapper(() => getUserBookmark(), dispatch);
};

export const deleteUserPostRequest: any =
  (postId: any) => async (dispatch: any) => {
    return apiWrapper(() => deleteUserPost(postId), dispatch);
  };

export const uploadImage: any =
  (imageFile: File, typeUpload: string) => async (dispatch: any) => {
    return apiWrapper(async () => {
      const { signedRequest, url }: any = await getUrlImage(
        imageFile,
        typeUpload
      );
      await axios.put(signedRequest, imageFile);
      return url;
    }, dispatch);
  };

export const uploadImage2: any =
  (data: any) => async (dispatch: any) => {
    return apiWrapper(async () => {
      const url = await getUrlImage2(data);
      return url;
    }, dispatch);
  };

export const saveUrlImageRequest: any = (image: string) => {
  return {
    type: postConstant.SAVE_URL_IMAGE,
    payload: image,
  };
};
export const clearUrlImageRequest: any = () => {
  return {
    type: postConstant.CLEAR_URL_IMAGE,
  };
};

export const loadingUploadImageRequest: any = (value: boolean) => {
  return {
    type: postConstant.LOADING_UPLOAD_IMAGE,
    payload: value,
  };
};
