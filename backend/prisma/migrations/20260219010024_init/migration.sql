-- CreateTable
CREATE TABLE "categorias" (
    "cat_id" SERIAL NOT NULL,
    "cat_nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("cat_id")
);

-- CreateTable
CREATE TABLE "conhecimentos" (
    "con_id" SERIAL NOT NULL,
    "con_titulo" VARCHAR(150) NOT NULL,
    "con_categoria_id" INTEGER NOT NULL,
    "con_nivel_id" INTEGER NOT NULL,
    "con_pessoa_id" INTEGER NOT NULL,
    "con_descricao" VARCHAR(255) NOT NULL,
    "con_ativo" BOOLEAN NOT NULL,
    "con_criado_em" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "conhecimentos_pkey" PRIMARY KEY ("con_id")
);

-- CreateTable
CREATE TABLE "niveis" (
    "niv_id" SERIAL NOT NULL,
    "niv_nome" VARCHAR(50) NOT NULL,

    CONSTRAINT "niveis_pkey" PRIMARY KEY ("niv_id")
);

-- CreateTable
CREATE TABLE "pessoas" (
    "pes_id" SERIAL NOT NULL,
    "pes_nome" VARCHAR(100) NOT NULL,
    "pes_email" VARCHAR(150) NOT NULL,
    "pes_telefone" VARCHAR(20) NOT NULL,
    "pes_descricao" VARCHAR(255) NOT NULL,
    "pes_criado_em" TIMESTAMP(6) NOT NULL,
    "pes_login" VARCHAR(50) NOT NULL,
    "pes_senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("pes_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_cat_nome_key" ON "categorias"("cat_nome");

-- CreateIndex
CREATE UNIQUE INDEX "niveis_niv_nome_key" ON "niveis"("niv_nome");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_pes_email_key" ON "pessoas"("pes_email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_pes_login_key" ON "pessoas"("pes_login");

-- AddForeignKey
ALTER TABLE "conhecimentos" ADD CONSTRAINT "fk_con_categoria" FOREIGN KEY ("con_categoria_id") REFERENCES "categorias"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conhecimentos" ADD CONSTRAINT "fk_con_nivel" FOREIGN KEY ("con_nivel_id") REFERENCES "niveis"("niv_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conhecimentos" ADD CONSTRAINT "fk_con_pessoa" FOREIGN KEY ("con_pessoa_id") REFERENCES "pessoas"("pes_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
