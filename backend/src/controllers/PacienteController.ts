import type { Request, Response } from "express";
import type { Paciente } from "../prisma/generated/prisma/client";
import { pacienteService, type PacienteService } from "../services/PacienteService";

class PacienteController {
    constructor(private readonly service: PacienteService) {
    }

    async listarTodosPaciente(req: Request, res: Response) {
        try {
            const pagina = req.query.pagina ? Number(req.query.pagina) : undefined
            const limite = req.query.limite ? Number(req.query.limite) : undefined

            const pacientes = await this.service.listarTodosPacientes(pagina, limite);
            return res.status(200).json(pacientes)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async criarPaciente(req: Request, res: Response) {
        try {
            const dadosPaciente = req.body as Paciente
            const pacienteCriado = await this.service.criarPaciente(dadosPaciente)
            return res.status(201).json(pacienteCriado)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async buscarPacienteId(req: Request, res: Response) {
        try {
            const idPaciente = Number(req.params.id)
            const paciente = await this.service.buscarPacienteId(idPaciente)
            return res.status(200).json(paciente)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async atualizarPaciente(req: Request, res: Response) {
        try {
            const idPaciente = Number(req.params.id)
            const dadosParaAtualizar = req.body as Paciente
            const pacienteAtualizado = await this.service.atualizarPaciente(idPaciente, dadosParaAtualizar)
            return res.status(200).json(pacienteAtualizado);
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }


    async deletarPaciente(req: Request, res: Response) {
        try {
            const idPaciente = Number(req.params.id)
            const paciente = await this.service.deletarPaciente(idPaciente)
            return res.status(200).json({
                mensagem: "Usuário deletado com sucesso!",
                data: paciente
            });
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }
}
export const pacienteController = new PacienteController(pacienteService)
