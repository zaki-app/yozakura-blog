import axios from "axios";
import { getCurrentUserIdToken } from "./cognito";

// インスタンス
async function axiosInstance (method) {
  let instance;
  if (method === "GET") {
    // console.log("axios get");
    instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ARTICLE_ENDPOINT,
      timeout: 3000,
    });
  } else {
    // console.log("axios post or put or delete");
    // post, put, delete is must idToken
    const idToken = await getCurrentUserIdToken();
    
    instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ARTICLE_ENDPOINT,
      timeout: 3000,
      headers: {
        "Authorization": idToken
      }
    });
  }

  return instance;
}

export async function getArticles () {
  const instance = await axiosInstance("GET");
  const result = instance.get("/articles").then(res => {
    // console.log("all articles", res.data.data);
    return res.data.data;
  }).catch(err => {
    console.error("all articles error", err);
    return err;
  })
  return result;
}

export async function getArticleId (articleId) {
  const instance = await axiosInstance("GET");
  const result = instance.get(`/article/${articleId}`).then(res => {
    // console.log(`${articleId} get Success`, res.data);
    return res.data.data;
  }).catch(err => {
    console.error("not id error", err);
    return err;
  })
  return result;
}

/* admin */
// 記事を非公開含め全て取得
export async function getArticlesAdmin() {
  const instance = await axiosInstance("GET");
  const result = instance.get("/articles-admin").then(res => {
    // console.log("all articles", res.data.data);
    return res.data.data;
  }).catch(err => {
    console.error("all articles error", err);
    return err;
  })
  return result;
}

// create
export async function createArticle (params) {
  const instance = await axiosInstance("POST");
  const result = instance.post(`/article`, params).then(res => {
    // console.log(`${params} create Success`, res);
    alert("登録に成功しました");
    return res;
  }).catch(err => {
    alert("create error...", err);
    return err;
  })
  return result;
}

// update 
export async function updateArticle (id, params) {
  // console.log("送ってる情報", params)
  const instance = await axiosInstance("PUT");
  const result = instance.put(`/article/${id}`, params).then(res => {
    // console.log(`${params} update Success.. id = ${id}`, res);
    alert("更新に成功しました");
    return res.data.data;
  }).catch(err => {
    alert("update error...", err);
    return err;
  })
  return result;
}

// delete
export async function deleteArticle (id) {
  const instance = await axiosInstance("DELETE");
  const result = instance.delete(`/article/${id}`).then(res => {
    // console.log(`delete Success... id= ${id}`, res);
    return res
  }).catch(err => {
    console.error("delete error...", err);
    return err;
  })
  return result;
}

/**
 * カテゴリーごとの記事を取得する
 * articleIdを入れると、現在表示している記事は取得しない
 * @param {} category 
 * @param {limit(上限), articleId(表示している記事)} option
 * @returns カテゴリに紐づいた記事
 */
export async function categorySearch (category, option) {
  const instance = await axiosInstance("GET");
  const result = instance.get(`/category/${category}`, {
    params: {
      limit: option.limit,
      // 詳細ページでは今表示している記事以外の関連記事を表示する
      articleId: option.articleId,
    }})
    .then(res => {
      console.log("category get!!", res);
      return res.data.data;
    }).catch(err => {
      console.error("category error...", err);
    })
  return result;
}

/**
 * 職種カテゴリでの取得
 * @param {職種カテゴリ} industry 
 * @returns 
 */
export async function IndustrySearch(industry) {
  const instance = await axiosInstance("GET");
  const result = instance.get(`/industry/${industry}`).then(res => {
    // console.log("industry get!!", res.data.data);
    return res.data.data;
  }).catch(err => {
    console.error("industry error...". err);
  })
  return result;
}