const produtos = [
    // Ternos
    {
        id: 1,
        nome: "Terno Slim Fit Liso Castanho Claro",
        estoque: 12,
        categoria: "terno",
        valor: 7499.90,
        imagem: "1.webp"
    },
    {
        id: 2,
        nome: "Terno Slim Fit Listrado Azul escuro",
        estoque: 0,
        categoria: "terno",
        valor: 7999.90,
        imagem: "2.webp"
    },
    {
        id: 3,
        nome: "Terno Slim Fit Liso cinza",
        estoque: 8,
        categoria: "terno",
        valor: 7499.90,
        imagem: "3.webp"
    },
    {
        id: 4,
        nome: "Terno Slim Fit Liso Azul escuro",
        estoque: 0,
        categoria: "terno",
        valor: 7499.90,
        imagem: "4.webp"
    },
    {
        id: 5,
        nome: "Terno Slim Fit Risca de giz Azul escuro",
        estoque: 5,
        categoria: "terno",
        valor: 8299.90,
        imagem: "5.webp"
    },
    {
        id: 6,
        nome: "Terno Regular Fit Bege claro",
        estoque: 18,
        categoria: "terno",
        valor: 6999.90,
        imagem: "6.webp"
    },
    {
        id: 7,
        nome: "Terno Mistura de lã elástica Preto",
        estoque: 0,
        categoria: "terno",
        valor: 8999.90,
        imagem: "7.webp"
    },
    {
        id: 8,
        nome: "Terno Regular Fit Tecido elastico Azul escuro",
        estoque: 7,
        categoria: "terno",
        valor: 6999.90,
        imagem: "8.webp"
    },
    {
        id: 9,
        nome: "Terno Slim Fit Xadrez Azul escuro",
        estoque: 21,
        categoria: "terno",
        valor: 8499.90,
        imagem: "9.webp"
    },
    {
        id: 10,
        nome: "Terno Slim Fit Estampa Preto",
        estoque: 3,
        categoria: "terno",
        valor: 8799.90,
        imagem: "10.webp"
    },
    // Cintos
    {
        id: 11,
        nome: "Cinto Couro vegetal Ferrugem",
        estoque: 0,
        categoria: "cinto",
        valor: 899.90,
        imagem: "11.webp"
    },
    {
        id: 12,
        nome: "Cinto Couro vegetal Marrom escuro",
        estoque: 30,
        categoria: "cinto",
        valor: 899.90,
        imagem: "12.webp"
    },
    {
        id: 13,
        nome: "Cinto Couro vegetal Preto",
        estoque: 15,
        categoria: "cinto",
        valor: 899.90,
        imagem: "13.webp"
    },
    {
        id: 14,
        nome: "Cinto Couro italiano Fivela de pino",
        estoque: 0,
        categoria: "cinto",
        valor: 1199.90,
        imagem: "14.webp"
    },
    {
        id: 15,
        nome: "Cinto Couro italiano Granulado Fivela polida Preto",
        estoque: 9,
        categoria: "cinto",
        valor: 1299.90,
        imagem: "15.webp"
    },
    {
        id: 16,
        nome: "Cinto Couro italiano Invernizado Preto",
        estoque: 2,
        categoria: "cinto",
        valor: 1399.90,
        imagem: "16.webp"
    },
    {
        id: 17,
        nome: "Cinto Couro italiano Granulado Fivela cromado",
        estoque: 0,
        categoria: "cinto",
        valor: 1299.90,
        imagem: "17.webp"
    },
    {
        id: 18,
        nome: "Cinto Couro italiano logotipo marcado Preto",
        estoque: 6,
        categoria: "cinto",
        valor: 1499.90,
        imagem: "18.webp"
    },
    {
        id: 19,
        nome: "Cinto Couro Italiano Escovado Preto",
        estoque: 1,
        categoria: "cinto",
        valor: 1499.90,
        imagem: "19.webp"
    },
    {
        id: 20,
        nome: "Cinto Couro Estampado Pino de metal Escovado",
        estoque: 0,
        categoria: "cinto",
        valor: 1599.90,
        imagem: "20.webp"
    },
    // Sapatos Sociais
    {
        id: 21,
        nome: "Sapato Oxford Couro Preto",
        estoque: 11,
        categoria: "sapato",
        valor: 2999.90,
        imagem: "21.webp"
    },
    {
        id: 22,
        nome: "Sapato Derby Couro Preto",
        estoque: 0,
        categoria: "sapato",
        valor: 2899.90,
        imagem: "22.webp"
    },
    {
        id: 23,
        nome: "Sapato Mouge Couro Fivela rolo Preto",
        estoque: 8,
        categoria: "sapato",
        valor: 3199.90,
        imagem: "23.webp"
    },
    {
        id: 24,
        nome: "Sapato Derby Couro Napa Castanho escuro",
        estoque: 2,
        categoria: "sapato",
        valor: 2899.90,
        imagem: "24.webp"
    },
    {
        id: 25,
        nome: "Sapato Derby Couro Sola Emborrachada Preto",
        estoque: 0,
        categoria: "sapato",
        valor: 2699.90,
        imagem: "25.webp"
    },
    {
        id: 26,
        nome: "Sapato Derby Couro Sola Emborrachada Marrom",
        estoque: 13,
        categoria: "sapato",
        valor: 2699.90,
        imagem: "26.webp"
    },
    {
        id: 27,
        nome: "Sapato Derby Couro Sola Biqueira Emborrachada Preto",
        estoque: 0,
        categoria: "sapato",
        valor: 2799.90,
        imagem: "27.webp"
    },
    {
        id: 28,
        nome: "Sapato Derby Couro Sola Biqueira Emborrachada Preto polido",
        estoque: 4,
        categoria: "sapato",
        valor: 2799.90,
        imagem: "28.webp"
    },
    {
        id: 29,
        nome: "Sapato Derby Couro Sola Marrom",
        estoque: 0,
        categoria: "sapato",
        valor: 2599.90,
        imagem: "29.webp"
    },
    {
        id: 30,
        nome: "Sapato Derby Couro Detalhe Brogue",
        estoque: 17,
        categoria: "sapato",
        valor: 3199.90,
        imagem: "30.webp"
    }
];

module.exports = produtos;
