import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log("servidor escutando");
});

//mongodb+srv://admin:admin123@cluster0.volyzjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0