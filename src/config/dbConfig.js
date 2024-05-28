import mongoose from "mongoose";

async function conectaNaDataBase(){
    try{
        await mongoose.connect("mongodb+srv://admin:admin123@cluster0.volyzjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser:true,
            useUnifiedTopoLOGY:true,
        });
        return mongoose.connection;
    }catch(error){
        console.error("Erro ao conectar ao banco de dados",error);
        throw error;
    }
}

export default conectaNaDataBase