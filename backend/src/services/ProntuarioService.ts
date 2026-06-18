import type { Prontuario } from "../prisma/generated/prisma/client";
import { prontuarioRepository, type ProntuarioRepository } from "../repositories/ProntuarioRepository";

export class ProntuarioService {
    constructor(private readonly repository: ProntuarioRepository) {}

    async listarTodosProntuarios(pagina?: number, limite?: number) {
        return await this.repository.listarTodosProntuarios(pagina, limite);
    }

    async criarProntuario(dadosProntuario: Omit<Prontuario, "id">) {
        return await this.repository.criarProntuario(dadosProntuario);
    }

    async buscarProntuarioId(idProntuario: number) {
        return await this.repository.buscarProntuarioId(idProntuario);
    }

    async atualizarProntuario(idProntuario: number, dadosParaAtualizar: Omit<Prontuario, "id">) {
        return await this.repository.atualizarProntuario(idProntuario, dadosParaAtualizar);
    }

    async deletarProntuario(idProntuario: number) {
        return await this.repository.deletarProntuario(idProntuario);
    }
}

export const prontuarioService = new ProntuarioService(prontuarioRepository);