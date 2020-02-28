import axios from "axios";

export const searchRepo = queryParams => {
  let url = "https://api.github.com/search/repositories?q=";
  return axios.get(url + queryParams);
};

export const issuesByRepo = fullName => {
  let url = "https://api.github.com/search/issues?q=repo:" + fullName;
  return axios.get(url);
};
