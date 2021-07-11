const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/SpectrumProject", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }).then(() => {
//     console.log("connection successful");
// }).catch((e) => {
//     console.log("no connection");
// })
mongoose.connect("mongodb://localhost:27017/StudentRegistration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("connection succesful");
}).catch((e) => {
    console.log("no connection");
})