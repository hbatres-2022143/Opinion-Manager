'use strict'

import Publication from './publication.model.js'

export const createPublication = async (req, res) => {
    try {
        let { title, category, text } = req.body
        let userId = req.user._id
        let newPublication = new Publication({
            user: userId,
            title,
            category,
            text,
        })
        await newPublication.save()
        return res.send({ message: 'Publication created succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating Publication' })
    }
}

export const updatePublication = async (req, res) => {
    try {
        let publicationId = req.params.id
        let existingPublication = await Publication.findOne({ _id: publicationId })
        let userId = req.user._id
        let data = req.body
        if (existingPublication.user.toString() !== userId.toString()) return res.status(404).send({
            message: 'You are not authorized to update another users publication'
        })
        let updatePublication = await Publication.findOneAndUpdate(
            { _id: publicationId },
            data,
            { new: true }
        )
        if (!updatePublication) return res.status(404).send({ message: 'Publication not found and not updated' })
        return res.send({ message: 'Publication updated succesfully', updatePublication })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating publication' })
    }
}

export const deletePublication = async (req, res) => {
    try {
        let publicationId = req.params.id
        let existingPublication = await Publication.findOne({ _id: publicationId })
        let userId = req.user._id
        if (existingPublication.user.toString() !== userId.toString()) return res.status(404).send({
            message: 'You are not authorized to delete another users publication.'
        })
        let deletePublication = await Publication.findOneAndDelete({ _id: publicationId })
        if (!deletePublication) return res.status(404).send({ message: 'Publication not found and not deleted' })
        return res.send({ message: 'Publication deleted succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting publication' })
    }
}

export const viewPublications = async (req, res) => {
    try {
        let publications = await Publication.find().populate({
            path: 'comments',
            select: 'text'
        })
        return res.send({ publications })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting Publications' })
    }
}