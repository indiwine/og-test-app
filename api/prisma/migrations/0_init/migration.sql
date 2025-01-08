-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "categoryId" INTEGER,

    CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_96152d453aaea425b5afde3ae9f" ON "product_category"("name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

