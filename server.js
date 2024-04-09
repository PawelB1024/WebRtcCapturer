const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(path.join(__dirname)));

app.post('/save-screenshot', (req, res) => {
  const screenshotData = req.body.screenshot;
  const base64Data = screenshotData.replace(/^data:image\/png;base64,/, '');
  const fileName = `screenshot_${Date.now()}.png`;
  const filePath = path.join(__dirname, 'screens', fileName);

  fs.writeFile(filePath, base64Data, 'base64', (error) => {
    if (error) {
      console.error('Error saving screenshot: ', error);
      res.sendStatus(500);
    } else {
      console.log('Screenshot saved: ', filePath);
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
