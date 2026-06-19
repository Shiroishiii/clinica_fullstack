import type { Prontuario } from "../prisma/generated/prisma/client";
import { prontuarioRepository, type ProntuarioRepository } from "../repositories/ProntuarioRepository";

type ProntuarioDados = Omit<Prontuario, "id">;

function prepararDadosProntuario(dados: Record<string, unknown>): ProntuarioDados {
    return {
        descricao: dados.descricao as string,
        data: dados.data ? new Date(dados.data as string) : null,
        medico_responsavel_id: Number(dados.medico_responsavel_id),
        paciente_id: Number(dados.paciente_id),
    };
}

export class ProntuarioService {
    constructor(private readonly repository: ProntuarioRepository) {}

    async listarTodosProntuarios(pagina?: number, limite?: number) {
        return await this.repository.listarTodosProntuarios(pagina, limite);
    }

    async criarProntuario(dadosProntuario: Record<string, unknown>) {
        const dados = prepararDadosProntuario(dadosProntuario);
        return await this.repository.criarProntuario(dados);
    }

    async buscarProntuarioId(idProntuario: number) {
        return await this.repository.buscarProntuarioId(idProntuario);
    }

    async atualizarProntuario(idProntuario: number, dadosParaAtualizar: Record<string, unknown>) {
        const dados = prepararDadosProntuario(dadosParaAtualizar);
        return await this.repository.atualizarProntuario(idProntuario, dados);
    }

    async deletarProntuario(idProntuario: number) {
        return await this.repository.deletarProntuario(idProntuario);
    }
}

export const prontuarioService = new ProntuarioService(prontuarioRepository);
