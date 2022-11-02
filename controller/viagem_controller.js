const Viagem = require("../model/viagem");

exports.listar = (req, res) => {
    Viagem.find({}, (err, viagens) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(viagens);
    })
}

exports.inserir = (req, res) => {
    const viagemRequest = req.body;
    if(viagemRequest && 
        viagemRequest.nome_destino && 
        viagemRequest.manha_primeiro_dia && 
        viagemRequest.tarde_primeiro_dia && 
        viagemRequest.noite_primeiro_dia && 
        viagemRequest.manha_segundo_dia &&
        viagemRequest.tarde_segundo_dia &&
        viagemRequest.noite_segundo_dia &&
        viagemRequest.local_hospedagem &&
        viagemRequest.valor_hospedagem &&
        viagemRequest.valor_alimentacao &&
        viagemRequest.valor_entreterimento) {

        const viagemNovo = new Viagem(viagemRequest);
        viagemNovo.save((err, viagemSalvo) => {
            if(err) {
                res.status(500).send(err);
            }
            else {
                return res.status(201).json(viagemSalvo);
            }
        })
        
    }
    else {
        return res.status(400).json({
            Erro:"Nome e/ou valores sao obrigatórios"
        })
    }
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

  
    Viagem.findById(id, (err, viagemEncontrado) => {
        if(err) {
            res.status(500).send(err); 
        }
        else if(viagemEncontrado) {
            return res.json(viagemEncontrado);
        }
        else {
            return res.status(404).json(
                { Erro: "Viagem nao encontrada" }
            )
        }
    
    })
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const viagemRequest = req.body;

    if(!viagemRequest || !viagemRequest.nome_destino 
        || !viagemRequest.manha_primeiro_dia
        || !viagemRequest.tarde_primeiro_dia
        || !viagemRequest.noite_primeiro_dia
        || !viagemRequest.manha_segundo_dia
        || !viagemRequest.tarde_segundo_dia
        || !viagemRequest.noite_segundo_dia
        || !viagemRequest.local_hospedagem
        || !viagemRequest.valor_hospedagem
        || !viagemRequest.valor_entreterimento
        || !viagemRequest.valor_alimentacao ) {
        return res.status(400).json({
            Erro:"Nome e/ou valores são obrigatórios"
        });    
    }

    Viagem.findByIdAndUpdate(id, viagemRequest, {new: true}, 
        (err, viagemAtualizado) => {
            if(err) {
                res.status(500).send(err)
            }
            else if(viagemAtualizado) {
                return res.json(viagemAtualizado);
            }
            else {
                return res.status(404).json(
                    { Erro: "Viagem nao encontrado" }
                )
            }
        })
    }

exports.deletar = (req, res) => {
    const id = req.params.id;

    Viagem.findByIdAndDelete(id, (err, viagemDeletado) => {
        if(err) {
            return res.status(500).send(err);
        }
        else if(viagemDeletado) {
            return res.json(viagemDeletado);
        }
        else {
            return res.status(404).json(
                { Erro: "Viagem nao encontrada" }
            )    
        }
    })    
}