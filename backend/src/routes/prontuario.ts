import { Router } from "express";
import { prontuarioController } from "../controllers/ProntuarioController";

export const ProntuarioRouter = Router()

ProntuarioRouter.get('/prontuario', async (req, res) => {
    return prontuarioController.listarTodosProntuarios(req, res)
})

ProntuarioRouter.get('/prontuario/:id', async (req, res) => {
    return prontuarioController.buscarProntuarioId(req, res)
})

ProntuarioRouter.post('/prontuario', async (req, res) => {
    return prontuarioController.criarProntuario(req, res)
})

ProntuarioRouter.put('/prontuario/:id', async (req, res) => {
    return prontuarioController.atualizarProntuario(req, res)
})

ProntuarioRouter.delete('/prontuario/:id', async (req, res) => {
    return prontuarioController.deletarProntuario(req, res)
})
