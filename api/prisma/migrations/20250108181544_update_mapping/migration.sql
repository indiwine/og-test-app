-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
