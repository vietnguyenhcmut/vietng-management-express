"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/prisma.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
