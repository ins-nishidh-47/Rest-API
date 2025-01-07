import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

interface Item {
  id: number;
  name: string;
}

let items: Item[] = [];

// Create a new item
app.post('/items', (req: Request, res: Response) => {
  const newItem: Item = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all items
app.get('/items', (req: Request, res: Response) => {
  res.json(items);
});

// Read a single item by ID
app.get('/items/:id', (req: Request, res: Response) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Update an item by ID
app.put('/items/:id', (req: Request, res: Response) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  item.name = req.body.name;
  res.json(item);
});

// Delete an item by ID
app.delete('/items/:id', (req: Request, res: Response) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found');
  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});