import express from 'express';
import conectaNaDataBase from './config/dbConfig.js';
import pessoa from './models/pessoasAdicionar.js';

async function startServer() {
    const conexao = await conectaNaDataBase();

    conexao.on('error',(erro)=>{
        console.error("erro de conexao",erro);
    });

    conexao.once("open",()=>{
        console.log("conexao com o banco deira com sucesso")
    });

/////////
    const app = express();
    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Pessoas Cadastradas");
    });

    //isso vai buscar todas as pessoas do banco de dados
    app.get("/pessoas",async(req,res)=>{
        try{
            const pessoas = await pessoa.find({});
            res.status(200).json(pessoas);
        }catch(erro){
            console.error("erro ao buscar pessoas",error);
            res.status(500).send("erro ao buscar pessoas")
        }
    });
    //Isso vai buscar apenas uma pessoa do banco de dados 
// exemplo de como buscar http://localhost:3000/pessoas/6655b1d604a488e083678365
    app.get("/pessoas/:id", async(req,res)=>{   
        try{
            const pessoaEcontrada= await pessoa.findById(req.params.id);
            if (!pessoaEcontrada){
                return res.status(404).send("pessoa nao encontrada");
            }
            res.status(200).json(pessoaEcontrada);
        }catch (error){
            console.error("erro ao buscar pessoa por id",error);
            res.status(500).send("erro ao buscar pessoa por ID")
        }

    });


    ////isso vai adicionar mais uma pessoa 
app.post("/pessoas",async(req,res)=>{
    try{
        const novaPessoa = await pessoa.create(req.body);
        res.status(201).json(novaPessoa);
    }catch(error){
        console.error("erro ao criar nova pessoa",error);
        res.status(500).send("erro ao criar novba pessoa");
    }
});

///isso vai alterar algum dado da pessoa ou pessoa
app.put("/pessoas/:id",async(req,res)=>{
    try{
        const pessoaAtualizada = await pessoa.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!pessoaAtualizada){
            return res.status(404).send("pessoa nao encontrada")
        }
        res.status(200).json(pessoaAtualizada);
    }catch(error){
        console.error("Erro ao atualizar pessoa:",error);
        res.status(500).send("erro ao atualizar pessoa")
    }
});
///////ISSO VAI DELETAR UMA PESSOA
app.delete("/pessoas/:id",async (req,res)=>{
    try{
        const pessoaRemovida = await pessoa.findByIdAndDelete(req.params.id);
        if(!pessoaRemovida){
            return res.status(404).send("Pessoa nao encontrada");
        }
        res.status(200).send("pessoa removida com sucesso");
    }catch(error){
        console.error("error ao remover pessoa :", erro);
        res.status(500).send("erro ao remover pessoa")
    }
});

    return app;
}

const app = await startServer();
export default app;
