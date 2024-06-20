const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose
  .connect(
    "mongodb+srv://girishkumbhar16:77toiCovkSPMBDxF@cluster0.16odwbh.mongodb.net/LoginSignupPage?retryWrites=true&w=majority&appName=Cluster0"

    // {
    //   useNewUrlParser: true,
    //   useUnifedTopoLogy: true,
    //   useCreateIndex: true,
    // }
  )
  .then(() => {
    console.log(`Database is Connected`);
  })
  .catch((e) => {
    console.log(`Opps! , Connection Failed`, e);
  });
