const mongoose = require ('mongoose')
const Schema = mongoose.Schema;
// const {Schema} = mongoose;

const ViagemSchema = new Schema({
    nome_destino: String,
    manha_primeiro_dia: String,
    tarde_primeiro_dia: String,
    noite_primeiro_dia: String,
    manha_segundo_dia: String,
    tarde_segundo_dia: String,
    noite_segundo_dia: String,
    local_hospedagem: String,
    valor_hospedagem: Number,
    valor_alimentacao: Number,
    valor_entreterimento: Number,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' }
},
{
    versionKey: false, collection: 'viagens'
});

module.exports = mongoose.model("Viagem", ViagemSchema);
