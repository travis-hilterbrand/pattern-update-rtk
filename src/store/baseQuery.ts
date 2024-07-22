import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { joinUrls, sleep } from "../utils";

const baseQuery = fetchBaseQuery({ baseUrl: "/" });

export const baseQueryWithDelay = (
  { baseUrl }: { baseUrl: string } = { baseUrl: "" }
): BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> => {
  return async ({ url, ...rest }, api, extraOptions) => {
    await sleep(500);
    const result = await baseQuery(
      { url: joinUrls(baseUrl, url), ...rest },
      api,
      extraOptions
    );
    return result;
  };
};
