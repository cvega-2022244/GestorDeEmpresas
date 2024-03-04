'use strict'

import Company from './company.model.js '
import Category from '../category/category.model.js'
import { checkUpdate } from '../utils/validator.js'
import ExcelJS from 'exceljs'

export const test = (req, res) => {
    res.send('Hello world')
}

export const createCompany = async(req,res)=>{
    try{
        let data = req.body
        let category = await Category.findOne({ _id: data.category })
        if(!category) return res.send({message: 'Category not found or not exist'})
        let company = new Company(data)
        await company.save()
        return res.send({message: 'Company saved successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'Error saving company'})
    }
}

export const orderCompanyAZ = async (req, res) => {
    try {
        let companies = await Company.find().sort({name: 1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordering companies' })
    }
}

export const orderCompanyZA = async (req, res) => {
    try {
        let companies = await Company.find().sort({name: -1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordering companiesD' })
    }
}

export const orderCompanyOrAge = async (req, res) => {
    try {
        let companies = await Company.find().sort({age: 1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordering companies' })
    }
}


export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const update = checkUpdate(data, false);
        if (!update) {return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })}
        const updateCompany = await Company.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('category', ['category']);
        if (!updateCompany) {
            return res.status(404).send({ message: 'Company not found and not updated' });
        }
        return res.send({ message: 'Company updated successfully', updateCompany });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating company' });
    }
};


export const report = async (req, res) => {
    try {
        const companies = await Company.find();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies');

        worksheet.addRow(['Name', 'Level of Impact', 'Years', 'Category']);
        companies.forEach(company => {
            worksheet.addRow([
                company.name,
                company.impact,
                company.age,
                company.category
            ]);
        });

        let excel = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=empresas.xlsx');

        res.send(excel);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'error generating excel report' });
    }
};