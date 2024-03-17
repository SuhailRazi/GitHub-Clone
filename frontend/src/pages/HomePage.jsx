import { useCallback, useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setloading] = useState(false);

  const [sortType, setSortType] = useState("Recent");

  const getUserProfilesRepos = useCallback(async (username = "SuhailRazi") => {
    setloading(true);
    try {
      // 60 request per hour
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userProf = await userRes.json();
      setUserProfile(userProf);

      const repoRes = await fetch(userProf.repos_url);
      const repos = await repoRes.json();
      setRepos(repos);
      return { userProf, repos };
    } catch (err) {
      toast.error(err);
    } finally {
      setloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getUserProfilesRepos();
  }, [getUserProfilesRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setloading(true);
    setRepos([]);
    setUserProfile(null);
    const { userProf, repos } = await getUserProfilesRepos(username);
    setUserProfile(userProf);
    setRepos(repos);
    setloading(false);
  };
  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending , recent first
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending , more stars first first
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count); //descending , more forks first first
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <>
      <div className="m-4"></div>
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </>
  );
};

export default HomePage;
