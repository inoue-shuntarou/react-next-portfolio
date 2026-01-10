import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

const HAS_MICROCMS_ENV =
  !!process.env.MICROCMS_SERVICE_DOMAIN && !!process.env.MICROCMS_API_KEY;

if (!HAS_MICROCMS_ENV) {
  console.warn(
    '[microcms] MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is not set. Using fallback empty data for local development.'
  );
}

const client = HAS_MICROCMS_ENV
  ? createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
      apiKey: process.env.MICROCMS_API_KEY!,
    })
  : null;

export const getMembersList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    return { contents: [], totalCount: 0, offset: 0, limit: queries?.limit ?? 10 };
  }
  const listData = await client.getList<Member>({
    endpoint: 'members',
    queries,
  });
  return listData;
};

export const getNewsList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    return { contents: [], totalCount: 0, offset: 0, limit: queries?.limit ?? 10 };
  }
  const listData = await client.getList<News>({
    endpoint: 'news',
    queries,
  });
  return listData;
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  if (!client) {
    return Promise.reject(new Error('[microcms] getNewsDetail is unavailable without env.'));
  }
  const detailData = await client.getListDetail<News>({
    endpoint: 'news',
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });

  return detailData;
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  if (!client) {
    return Promise.reject(new Error('[microcms] getCategoryDetail is unavailable without env.'));
  }
  const detailData = await client.getListDetail<Category>({
    endpoint: 'categories',
    contentId,
    queries,
  });

  return detailData;
};

export const getAllNewsList = async () => {
  if (!client) {
    return [];
  }
  const listData = await client.getAllContents<News>({
    endpoint: 'news',
  });
 
  return listData;
};

export const getAllCategoryList = async () => {
  if (!client) {
    return [];
  }
  const listData = await client.getAllContents<Category>({
    endpoint: 'categories',
  });
 
  return listData;
};
