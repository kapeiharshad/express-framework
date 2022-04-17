const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
let routeErr = false;

// middleware
app.use(cookieParser());
app.use(express.json()); // this is a alternate of bodyparser

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description:
      'This is a documentation of REST API for trade management application.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSDoc',
      url: 'https://jsdoc.app/',
    },
  },
  servers: [
    {
      url: process.env.SWAGGER_PORT,
      description: 'Development server',
    },
  ]
};
console.log(process.env.SWAGGER_PORT)

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//routing
fs.readdirSync(path.normalize('./routes')).every(file => {
  try {
    const routeName = file.includes('.route.js')
      ? file.split('.route.js').join("")
      : '';
    if (routeName) {
      app.use(`/${routeName}`,require(`./routes/${file}`));
    } else {
      throw new Error(`Extension of ${file} routes file should be '.route.js'`);
    }
  } catch (error) {
    routeErr = true;
    console.log('Server routing error:- ', error);
    return false;
  }
});

// database connection
if (!routeErr) {
  const dbURI = process.env.DB_URL;
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(result => {
      app.listen(process.env.PORT);
      console.log(`Server listening at ${process.env.PORT}`);
    })
    .catch(err => console.log(err));
}
