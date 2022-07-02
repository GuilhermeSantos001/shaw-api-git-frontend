import { useState } from "react";
import { githubGetUser } from '../functions/github-get-user';
import { githubGetUsers } from '../functions/github-get-users';
import { githubGetUserRepos } from '../functions/github-get-repos';

export function GithubService() {
  const [fetching, setFetching] = useState<boolean>(false);

  const getUser = async (username: string) => {
    return await githubGetUser(username, setFetching);
  },
    getUsers = async (since: number) => {
      return await githubGetUsers(since, setFetching);
    },
    getRepos = async (username: string, page: number) => {
      return await githubGetUserRepos(username, page, setFetching);
    }

  return {
    githubAPI: {
      users: {
        details: getUser,
        list: getUsers,
        repos: getRepos,
      },
      fetching
    },
  }
}
