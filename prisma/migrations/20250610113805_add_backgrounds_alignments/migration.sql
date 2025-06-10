-- CreateTable
CREATE TABLE "Background" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillProficiencies" JSONB NOT NULL,
    "languages" JSONB NOT NULL,
    "equipment" JSONB NOT NULL,
    "feature" TEXT NOT NULL,
    "featureDescription" TEXT NOT NULL,
    "suggestedCharacteristics" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Alignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ethicalAxis" TEXT NOT NULL,
    "moralAxis" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Background_name_key" ON "Background"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Alignment_name_key" ON "Alignment"("name");
