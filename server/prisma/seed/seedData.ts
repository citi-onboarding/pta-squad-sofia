import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function main() {
    await prisma.emprestimo.deleteMany();
    await prisma.livro.deleteMany();

    await prisma.livro.createMany({
        data: [
            {
                titulo: "O Pequeno Príncipe",
                autor: "Antoine de Saint-Exupéry",
                isbn: "9788522031429",
                editora: "Agir",
                quantidadeTotal: 8,
                quantidadeDisponivel: 8,
                categoria: "INFANTIL",
                ano: 1943,
            },
            {
                titulo: "Código Limpo: Habilidades Práticas do Agile Software",
                autor: "Robert C. Martin",
                isbn: "9788576082675",
                editora: "Alta Books",
                quantidadeTotal: 5,
                quantidadeDisponivel: 5,
                categoria: "TECNOLOGIA",
                ano: 2009,
            },
            {
                titulo: "Orgulho e Preconceito",
                autor: "Jane Austen",
                isbn: "9788544001820",
                editora: "Martin Claret",
                quantidadeTotal: 3,
                quantidadeDisponivel: 3,
                categoria: "ROMANCE",
                ano: 1813,
            },
            {
                titulo: "Sapiens: Uma Breve História da Humanidade",
                autor: "Yuval Noah Harari",
                isbn: "9788525432186",
                editora: "L&PM",
                quantidadeTotal: 12,
                quantidadeDisponivel: 12,
                categoria: "HISTORIA",
                ano: 2011,
            },
            {
                titulo: "Harry Potter e a Pedra Filosofal",
                autor: "J.K. Rowling",
                isbn: "9788532530783",
                editora: "Rocco",
                quantidadeTotal: 15,
                quantidadeDisponivel: 15,
                categoria: "INFANTIL",
                ano: 1997,
            },
            {
                titulo: "Arquitetura Limpa",
                autor: "Robert C. Martin",
                isbn: "9788550804606",
                editora: "Alta Books",
                quantidadeTotal: 6,
                quantidadeDisponivel: 6,
                categoria: "TECNOLOGIA",
                ano: 2019,
            },
            {
                titulo: "O Universo Numa Casca de Noz",
                autor: "Stephen Hawking",
                isbn: "9788551000961",
                editora: "Intrínseca",
                quantidadeTotal: 4,
                quantidadeDisponivel: 4,
                categoria: "CIENCIAS",
                ano: 2001,
            },
            
        ]
    })
}

main()
    .catch((e) => {
        console.error("Erro ao popular o banco de dados:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });