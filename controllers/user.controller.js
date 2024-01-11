exports.signInHandler = (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
};

exports.registerHandler = (req, res) => {
  const { username, password, fullName, email } = req.body;

  console.log(username, password);
};
