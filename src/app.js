import express from 'express';
import cors from 'cors';

const PORT = 5000;
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
