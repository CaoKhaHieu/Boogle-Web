import { localStorageOption } from 'app/shared/helper/LocalAction';

export const apiWrapper = async (api: any, dispatch: any) => {
  try {
    const res = await api();
    return res;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorageOption.remove();
      dispatch({
        type: 'CLEAR_SESSION',
        payload: error.response.data,
      });
    } else {
      // dispatch({
      //   type: 'OPEN_POPUP',
      //   payload: error.response?.data.errors[0],
      // });
    }
  }
};
