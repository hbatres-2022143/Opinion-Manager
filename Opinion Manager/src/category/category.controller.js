'use strict'

import Category from './category.model.js'
import Publication from '../category/category.model.js'

export const defaultCategory = async () => {
    try {
        let data = {
            name: 'Estado',
        }
        let existingCategory = await Category.findOne({ name: 'Estado' })
        if (existingCategory) return console.log('Category by default already exist')
        let defCategory = new Category(data)
        await defCategory.save()
        return console.log('Default category created');
    } catch (err) {
        return console.error(err)
    }
}

export const createCategory = async (req, res) => {
    try {
        let data = req.body
        let existingCategory = await Category.findOne({ name: data.name })
        if (existingCategory) return res.status(400).send({ message: 'Category already exist' })
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'Category created successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating category' })
    }
}

export const viewCategories = async (req, res) => {
    try {
        let categories = await Category.find()
        return res.send({ message: 'The categorys: ', categories })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting categories' })
    }
}

export const updateCategory = async (req, res) => {
    try {
        let data = req.body
        let categoryId = req.params.id
        let updatedCategory = await Category.findOneAndUpdate(
            { _id: categoryId },
            data,
            { new: true }
        )
        if (!updatedCategory) return res.status(404).send({ message: 'Category not found and not updated' })
        return res.send({ message: 'Category updated successfully', updatedCategory })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating category' })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        let categoryId = req.params.id
        let defaultCategory = await Category.findOne({ name: 'Estado' })
        if (defaultCategory._id == categoryId) return res.send({ message: 'Default category can not be deleted' })
        await Publication.updateMany(
            { category: categoryId },
            { category: defaultCategory._id }
        )
        let deletedCategory = await Category.findOneAndDelete({ _id: categoryId })
        if (!deletedCategory) return res.status(404).send({ message: 'Category not found and not deleted' })
        return res.send({ message: 'Category deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting category' })
    }
}