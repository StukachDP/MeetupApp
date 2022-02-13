import { makeAutoObservable } from "mobx";
import { $host } from "../http";
import { NewsModel } from "../Models/News/newsModel";

export default class NewsStore {
  news: Array<NewsModel> | null = null;
  choosenByIdNews: NewsModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getNews() {
    try {
      const responseResult = await $host.get("/api/news/");
      if (responseResult.status === 200) {
        this.setNews(responseResult.data);
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async getNewsById(id: string | undefined) {
    try {
      if (id) {
        const searchingResult = await $host.get("/api/news/" + id);
        if (searchingResult.status === 200) {
          this.setChoosenByIdNews(searchingResult.data);
          return true;
        }
      }
    } catch (error) {
      return false;
    }
  }

  async createNews(news: NewsModel) {
    try {
      const responseResult = await $host.post("/api/news/", { ...news });
      if (responseResult.status === 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async editNews(news: NewsModel) {
    try {
      const responseResult = await $host.put("/api/news/" + news.id, {
        ...news,
      });
      if (responseResult.status === 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async deleteNews(id: string | undefined) {
    try {
      if (id) {
        const responseResult = await $host.delete("/api/news/" + id);
        if (responseResult.status === 200) {
          return true;
        }
      }
    } catch (error) {
      return false;
    }
  }

  setNews(newsArray: Array<NewsModel>) {
    this.news = newsArray;
  }

  setChoosenByIdNews(news: NewsModel) {
    this.choosenByIdNews = news;
  }
}
