import type { Exame, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

type ExameDados = Omit<Exame, "id">;

export class ExamRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async listarTodosExames(pagina?: number, limite?: number) {
        const existePaginacao = pagina! && limite!
        if (!existePaginacao) return await this.prisma.exame.findMany()
        const exames = await this.prisma.exame.findMany({
            skip: (pagina - 1) * limite,
            take: limite
        })

        const total = await this.prisma.exame.count();
        const totalPaginas = Math.ceil(total / limite)
        return {
            exames,
            total,
            totalPaginas
        }
    }

    async buscarExameId(idExame: number) {
        return await this.prisma.exame.findUnique({
            where: { id: idExame }
        })
    }

    async criarExame(dadosExame: ExameDados) {
        return await this.prisma.exame.create({
            data: {
                nome_exame: dadosExame.nome_exame,
                tipo_exame: dadosExame.tipo_exame,
                valor: dadosExame.valor,
                laboratorio: dadosExame.laboratorio,
                descricao: dadosExame.descricao,
                data_exame: dadosExame.data_exame,
                resultado: dadosExame.resultado,
                documentURL: dadosExame.documentURL,
                pacienteId: dadosExame.pacienteId,
            }
        })
    }

    async atualizarExame(idExame: number, dadosParaAtualizar: ExameDados) {
        return await this.prisma.exame.update({
            data: {
                nome_exame: dadosParaAtualizar.nome_exame,
                tipo_exame: dadosParaAtualizar.tipo_exame,
                valor: dadosParaAtualizar.valor,
                laboratorio: dadosParaAtualizar.laboratorio,
                descricao: dadosParaAtualizar.descricao,
                data_exame: dadosParaAtualizar.data_exame,
                resultado: dadosParaAtualizar.resultado,
                documentURL: dadosParaAtualizar.documentURL,
                pacienteId: dadosParaAtualizar.pacienteId,
            },
            where: { id: idExame }
        })
    }

    async deletarExame(idExame: number) {
        return await this.prisma.exame.delete({
            where: { id: idExame }
        })
    }
}

export const examRepository = new ExamRepository(prisma)
