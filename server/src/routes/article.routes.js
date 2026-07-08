const { Router } = require('express')
const articleRepo = require('../repositories/article.repo')
const { authenticate } = require('../middleware/auth.middleware')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { disease_code, page = 1, limit = 20 } = req.query
    const articles = await articleRepo.findAll({ diseaseCode: disease_code, page: Number(page), limit: Number(limit) })
    const total = await articleRepo.countAll({ diseaseCode: disease_code })

    res.json({
      data: articles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const article = await articleRepo.findById(req.params.id)
    if (!article) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' })
    }
    res.json({ data: article })
  } catch (err) {
    next(err)
  }
})

module.exports = router
