export const getUserProfileInfo = async (req, res) => {
  const { username } = req.params;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { authorization: `token ${process.env.GITHUB_API_KEY}` },
    });

    const userProf = await userRes.json();
    const repoRes = await fetch(userProf.repos_url, {
      headers: { authorization: `token ${process.env.GITHUB_API_KEY}` },
    });
    const repos = await repoRes.json();

    res.status(200).json({ userProf, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
