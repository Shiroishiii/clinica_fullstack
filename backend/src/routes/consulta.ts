import { Router } from "express";
    import { consultaController } from "../controllers/ConsultaController";

export const ConsultaRouter = Router()

ConsultaRouter.get('/consulta', async (req, res) =>{
    return consultaController.listarTodasConsultas(req, res)
})
ConsultaRouter.get('/consulta/:id', async (req, res) =>{
    return consultaController.buscarConsultaId(req, res)
})
ConsultaRouter.post('/consulta', async (req, res) =>{
    return consultaController.criarConsulta(req, res)
})
ConsultaRouter.put('/consulta/:id', async (req, res) =>{
    return consultaController.atualizarConsulta(req, res)
})
ConsultaRouter.delete('/consulta/:id', async (req, res) =>{
    return consultaController.deletarConsulta(req, res)
})