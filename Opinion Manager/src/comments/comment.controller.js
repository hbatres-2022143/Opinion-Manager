'use strict'

import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'

export const createComment = async (req, res) => {
    try {
        let { text } = req.body
        let userId = req.user._id
        let publicationId = req.params.pid
        let publication = await Publication.findOne({ _id: publicationId })
        if (!publication) return res.status(404).send({ message: 'Publication not found' })
        let comment = new Comment({
            user: userId,
            text
        })
        await comment.save()
        if (comment) {
            if (!publication) return res.status(404).send({ message: 'Publication not found' })
            publication.comments.push(comment._id)
            await publication.save()
        }
        return res.send({ message: 'Comment saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving comment' })
    }
}

export const updateComment = async (req, res) => {
    try {
        let commentId = req.params.cid
        let existingComment = await Comment.findOne({ _id: commentId })
        let publication = await Publication.findOne({ comments: commentId })
        if (!publication) return res.status(404).send({ message: 'Publication or comment not found' })
        let userId = req.user._id
        let data = req.body
        if (existingComment.user.toString() !== userId.toString()) return res.status(404).send({
            message: 'You are not authorized to update another users comments'
        })
        let updateComment = await Comment.findOneAndUpdate(
            { _id: commentId },
            data,
            { new: true }
        )
        if (!updateComment) return res.status(404).send({ message: 'Comment not found and not updated' })
        return res.send({ message: 'Comment updated successfully', updateComment })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error editing comment' })
    }
}


export const deleteComment = async (req, res) => {
    try {
        let commentId = req.params.cid
        let existingComment = await Comment.findOne({ _id: commentId })
        let publication = await Publication.findOne({ comments: commentId })
        if (!publication) return res.status(404).send({ message: 'Publication or comment not found' })
        let userId = req.user._id
        if (existingComment.user.toString() !== userId.toString()) return res.status(404).send({
            message: 'You are not authorized to delete other users comments'
        })
        let deleteComment = await Comment.findOneAndDelete({ _id: commentId })
        if (!deleteComment) return res.status(404).send({ message: 'Comment not found and not deleted' })
        if (deleteComment) {
            publication.comments.pull(commentId)
            await publication.save()
        }
        return res.send({ message: 'Comment deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting comment' })
    }
}

export const viewComments = async (req, res) => {
    try {
        let comments = await Comment.find()
        return res.send({ comments })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting comments' })
    }
}