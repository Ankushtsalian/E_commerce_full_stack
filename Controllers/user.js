const getAllUsers = async (req, res) => {
  res.send("getAllUsers");
};

const getSingleUser = async (req, res) => {
  res.send(req.params);
};

const showCurrentUser = async (req, res) => {
  res.send("showCurrentUser");
};

const updateUserPassword = async (req, res) => {
  res.send(req.body);
};

const updateUser = async (req, res) => {
  res.send(req.body);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
};
