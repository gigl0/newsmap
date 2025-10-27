import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export interface News {
  id: number;
  title: string;
  url: string;
  image?: string;
  source?: string;
  lat?: number;
  lon?: number;
}

export async function fetchNews(): Promise<News[]> {
  const res = await axios.get<News[]>(`${API_URL}/api/news`);
  return res.data;
}
