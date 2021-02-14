const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log("connection successful");
    });

const bobbySchema = new mongoose.Schema({
    title: String,
    img: String,
    price: Number,
    company: String,
    info: String,
    inCart: Boolean,
    count: Number,
    total: Number,
});

const newData = mongoose.model("newData", bobbySchema);

// const testData = new newData({
//     title: "Smashed Iphone",
//     img: "img/product-8.png",
//     price: 2,
//     company: "apple",
//     info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
//     inCart: false,
//     count: 0,
//     total: 0
// });

// testData.save().then(doc => console.log(doc)).catch(err => console.log("error",err));

app.get("/api/", async (req, res) => {
    const data = await newData.find({});
    res.status(200).json({
        message: "sucess",
        data,
    });
});

app.get("/:id", async (req, res) => {
    try {
        const data = await newData.findById(req.params.id);
        res.status(200).json({
            message: "successful",
            data: {
                data,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err,
        });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server at ${port}`));
