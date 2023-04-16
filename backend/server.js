const express   = require('express');
const stytch    = require('stytch');
const mongoose  = require('mongoose');
const cors      = require('cors');
require('dotenv').config();

const app = express();

/*var corsOptions = {
  //origin: "http://localhost:8081"
  origin:'*',
  credentials:true,
  optionSuccessStatus:200
};*/

// App Uses
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

// Router Requirements
const authRoutes = require("./routes/auth.routes");
const canopyRoutes = require("./routes/canopy.routes");

// Router Uses
app.use("/api/auth", authRoutes);
app.use("/api/canopies", canopyRoutes);


app.listen(process.env.PORT || 3000, () => {
    mongoose.connect(
      process.env.DB_URI,
      {
        useNewUrlParser:    true,
        useUnifiedTopology: true
      }
    );
    console.log(`${process.env.APP_NAME} booting in \"${process.env.STYTCH_ENV}\" mode...`);
    console.log(`Successful connection to database \"${process.env.DB_NAME}\".`);
    console.log(`${process.env.APP_NAME} listening on port ${process.env.PORT}`);
  });