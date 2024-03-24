import User from "../models/user.model.js";

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

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString()); //Logged account
    const userToLike = await User.findOne({ username });

    if (!userToLike) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(400).json({ error: "User already liked" });
    }

    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });

    user.likedProfiles.push(userToLike.username);

    // await userToLike.save();
    // await user.save();

    await Promise.all([userToLike.save(), user.save()]);
    res.status(200).json({ message: "User liked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedProfiles: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
