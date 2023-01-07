import axios from "axios";
import { getCurrentUserIdToken } from "./cognito";

// インスタンス
async function axiosInstance (method) {
  let instance;
  if (method === "GET") {
    console.log("axios get");
    instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ARTICLE_ENDPOINT,
      timeout: 3000,
    });
  } else {
    console.log("axios post or put or delete");
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
    console.log("all articles", res.data.data);
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
    console.log(`${articleId} get Success`, res);
    return res.data.data;
  }).catch(err => {
    console.error("not id error", err);
    return err;
  })
  return result;
}

/* admin */
// create
export async function createArticle (params) {
  const instance = await axiosInstance("POST");
  const result = instance.post(`/article`, params).then(res => {
    console.log(`${params} create Success`, res);
    return res.data;
  }).catch(err => {
    console.error("create error...", err);
    return err;
  })
  return result;
}

// update 
export async function updateArticle (id, params) {
  const instance = await axiosInstance("PUT");
  const result = instance.put(`/article/${id}`, params).then(res => {
    console.log(`${params} update Success.. id = ${id}`, res);
    return res.data.data;
  }).catch(err => {
    console.error("update error...", err);
    return err;
  })
  return result;
}

// delete
export async function deleteArticle (id) {
  const instance = await axiosInstance("DELETE");
  const result = instance.delete(`/article/${id}`).then(res => {
    console.log(`delete Success... id= ${id}`, res);
    return res
  }).catch(err => {
    console.error("delete error...", err);
    return err;
  })
  return result;
}
