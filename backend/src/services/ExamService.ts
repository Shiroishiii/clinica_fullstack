import type { Exame } from "../prisma/generated/prisma/client";
import { examRepository, type ExamRepository } from "../repositories/ExamRepository";

type ExameDados = Omit<Exame, "id">;

function prepararDadosExame(dados: Record<string, unknown>): ExameDados {
    let data_exame: Date;

    if (dados.data && dados.hora) {
        data_exame = new Date(`${dados.data}T${dados.hora}`);
    } else {
        data_exame = new Date(dados.data_exame as string);
    }

    return {
        tipo_exame: dados.tipo_exame as string,
        valor: dados.valor as Exame["valor"],
        descricao: dados.descricao as string,
        resultado: dados.resultado as string,
        data_exame,
        pacienteId: Number(dados.pacienteId),
    };
}

export class ExamService {
    constructor(private readonly repository: ExamRepository) {
    }

    async listarTodosExames(pagina?: number, limite?: number) {
        return await this.repository.listarTodosExames(pagina, limite)
    }

    async criarExame(dadosExame: Record<string, unknown>) {
        const dados = prepararDadosExame(dadosExame);
        return await this.repository.criarExame(dados);
    }

    async buscarExameId(idExame: number) {
        return await this.repository.buscarExameId(idExame);
    }

    async atualizarExame(idExame: number, dadosParaAtualizar: Record<string, unknown>) {
        const dados = prepararDadosExame(dadosParaAtualizar);
        return await this.repository.atualizarExame(idExame, dados);
    }

    async deletarExame(idExame: number) {
        return await this.repository.deletarExame(idExame);
    }
}

export const examService = new ExamService(examRepository)
