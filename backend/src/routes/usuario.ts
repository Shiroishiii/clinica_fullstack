import { Router } from "express";
import { userController } from "../controllers/UserController";

export const usuarioRouter = Router();

// Endpoints usuario
usuarioRouter.get('/user', async (_, res) => {
  return userController.listarTodosUsuarios(_, res)
})

usuarioRouter.get('/user/:id', async (req, res) => {
  return userController.buscarUsuarioId(req, res)
})

usuarioRouter.post("/user", async (req, res) => {
  return userController.criarUsuario(req, res)
})


usuarioRouter.put("/user/:id", async (req, res) => {
  return userController.atualizarUsuario(req, res)
})

usuarioRouter.delete('/user/:id', async (req, res) => {
  return userController.deletarUsuario(req, res)
})
