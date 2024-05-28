import mongoose from "mongoose";

const pessoasSchema = new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId},
    nome:{type:String,require:true},
    email:{type:String,require:true},
    idade:{type:Number}
},{versionKey:false});
const pessoa = mongoose.model("pessoas",pessoasSchema);

export default pessoa