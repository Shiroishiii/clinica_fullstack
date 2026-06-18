import { Router } from "express";
import { pacienteController } from "../controllers/PacienteController";


export const PacienteRouter = Router()


PacienteRouter.get('/paciente', async (_, res) => {
  return pacienteController.listarTodosPaciente(_, res)
})

PacienteRouter.get('/paciente/:id', async (req, res) => {
  return pacienteController.buscarPacienteId(req, res)
})

PacienteRouter.post("/paciente", async (req, res) => {
  return pacienteController.criarPaciente(req, res)
})


PacienteRouter.put("/paciente/:id", async (req, res) => {
  return pacienteController.atualizarPaciente(req, res)
})

PacienteRouter.delete('/paciente/:id', async (req, res) => {
  return pacienteController.deletarPaciente(req, res)
})