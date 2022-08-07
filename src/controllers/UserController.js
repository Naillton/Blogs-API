const { JWT } = require('../auth/authJWT');
const UserService = require('../services/UserService');

const blogController = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);
    if (!user) return res.status(400).json({ message: 'Invalid fields' });
    const token = JWT(user);
    res.status(200).json({ token });
  },

  async insertUser(req, res) {
    const { displayName, email, password, image } = req.body;
    const validEmail = await UserService.exist({ email });
    if (validEmail) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const user = await UserService.insertUser(
      displayName,
      email,
      password,
      image,
    );
    const token = JWT(user);
    res.status(201).json({ token });
  },

  async findUsers(_req, res) {
    const users = await UserService.findUsers();
    res.status(200).json(users);
  },

  async findUserById(req, res) {
    const { id } = req.params;
    const user = await UserService.findUserById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    res.status(200).json(user);
  },
};

module.exports = blogController;