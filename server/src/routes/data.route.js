import express from 'express';
import { getAllCategories, getCompanies } from '../controller/data.controller.js';
const router = express.Router();
router.get('/category', getAllCategories);
router.get('/company/:id', getCompanies);
export default router;