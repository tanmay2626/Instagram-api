exports.signInHandler = (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
};
