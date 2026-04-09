import { createClient } from "microcms-js-sdk";

// ローカル(import.meta.env)とCloudflare本番(process.env)の両方から安全に取得する
const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN || (typeof process !== 'undefined' ? process.env.MICROCMS_SERVICE_DOMAIN : '');
const apiKey = import.meta.env.MICROCMS_API_KEY || (typeof process !== 'undefined' ? process.env.MICROCMS_API_KEY : '');

export const client = createClient({
  serviceDomain: serviceDomain as string,
  apiKey: apiKey as string,
});

// 型定義
export type Event = {
  id: string;
  content: string;
  date: string;
  tags: string[];
  title?: string;
  english_title?: string;
  photo_gallery?: {
    fieldId: "photo_item";
    image: { url: string; width: number; height: number };
    photo_title: string;
  }[];
};