"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/prisma.ts
// import { PrismaClient } from "@prisma/client";
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
exports.default = prisma;
