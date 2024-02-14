import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: 'aleksei', age: '39' },
  { id: 2, username: 'vasia', age: '19' },
  { id: 2, username: 'vasilii', age: '78' },
  { id: 3, username: 'dima', age: '29' },
];

app.get('/', (_, res) => {
  res.send({ message: 'Hello' });
});

app.get('/api/users', (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  res.send(mockUsers);
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send(`Bad request`);
  }
  const findUser = mockUsers.find((user) => user.id === id);
  if (!findUser) {
    res.sendStatus(404);
  }
  res.send(findUser);
});

app.get('/api/products', (_, res) => {
  res.send([
    { id: 1, type: 'chiken', price: 12.99 },
    { id: 2, type: 'apple', price: 2.99 },
    { id: 3, type: 'onion', price: 0.55 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
