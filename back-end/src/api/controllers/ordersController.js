const {
  allOrdersByUser,
  registerOrder,
  getOrderById,
  updateStatus } = require('../services/ordersServices');

const getByUser = async (req, res) => {
  const { id, role } = req.data;
  const result = await allOrdersByUser(id, role);

  const { status, message } = result;
  return res.status(status).json(message);
};

const getOrderByIdHandler = async (req, res) => {
  const { id } = req.params;
  const { id: userId, role } = req.data;
  
  const result = await getOrderById(id, userId, role);

  const { status, message } = result;
  return res.status(status).json(message);
};

const registerOrderHandler = async (req, res) => {
  const order = req.body;
  const { id } = req.data;
  const result = await registerOrder(order, id);

  const { status, message } = result;
  return res.status(status).json(message);
};

const updateStatusHandler = async (req, res) => {
  const { id } = req.params;
  const { status: orderStatus } = req.body;
  const { id: userId, role } = req.data;
  await updateStatus(id, orderStatus);
  const { status, message } = await getOrderById(id, userId, role);
  return res.status(status).json({ status: message.status });
};

module.exports = { getByUser, registerOrderHandler, getOrderByIdHandler, updateStatusHandler };
