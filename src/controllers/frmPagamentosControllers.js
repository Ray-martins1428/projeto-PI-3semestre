const formas = require('../models/frmPagamentos')

class FrmPagamentosControllers {
    async listAll(req, res) {
        const result = await formas.findAll()
        !result.validated
            ? res.status(404).json({ success: false, error: result.error })
            : res.status(200).json({ success: true, values: result.values })
    }

// ----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID-----------------

    async findById(req, res) {
        const id = req.params.id
        const result = await formas.findById(id)
        !result.validated
            ? res.status(404).json({ success: false, error: result.error })
            : res.status(200).json({ success: true, values: result.values })
    }
}

module.exports = new FrmPagamentosControllers()