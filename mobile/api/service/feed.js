import { useDispatch } from "react-redux";
import { get, post } from "../client/apiClient";
import { setFeedListing } from "../../redux-store/feed-slice";

const serviceUrl = "feed";

export const createFeedPost = (data) => {
  const res = post(serviceUrl, data);
  return res;
};

export const useFetchFeedPosts = () => {
  const dispatch = useDispatch();

  const fetch = async () => {
    try {
      const res = await get(serviceUrl);
      dispatch(setFeedListing({ listing: res, loading: false, error: false }));
    } catch (error) {
      dispatch(setFeedListing({ listing: [], loading: false, error: true }));
    }
  };

  return { fetch };
};
