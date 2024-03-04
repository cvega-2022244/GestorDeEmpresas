'use strict'

import Category from './category.model.js'

export const test = (req, res)=>{
    res.send('Hello world')
}

export const createCategory = async(req,res)=>{
    try{
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message:'Category created successfully'})

    }catch(err){
        console.error(err)
        return res.status(500).send({message:'Error creating category'})
    }
}
export const getCategory = async(req, res)=>{
    try{
        let categories = await Category.find()
        if(!categories) return res.status(404).send({message:'Categories not found '})
        return res.send({message: 'Categories found ', categories})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'Error listing categories'})
    }
}
export const updateCategory = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }
        return res.send({ message: 'Category updated successfully', updatedCategory });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating category' });
    }
};

export const deleteCategory = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteCategory = await Category.findOneAndDelete({_id: id})
        if(!deleteCategory) return res.status(404).send({message:'Category not found and not deleted'})
        return res.send({message: `Category with name ${deleteCategory.category} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'Error deleting category'})
    }
}
