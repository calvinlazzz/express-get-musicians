const express = require('express');
const router = express.Router();
const  {Musician}  = require('../models/index');
const { check, validationResult } = require("express-validator");

router.get('/', async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

router.get('/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
}
);
// router.post('/', async (req, res) => {
//     const musician = await Musician.create(req.body);
//     res.json(musician);
// }
// );

router.post('/', 
    [
        check('name').notEmpty().withMessage("Name is required"),
        check('instrument').notEmpty().withMessage("Instrument is required")
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const musician = await Musician.create(req.body);
    res.json(musician);
}
)
router.put('/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.json(musician);
}
);
router.delete('/:id', async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    await musician.destroy();
    res.json({ message: `Musician ${req.params.id} deleted` });
}
);

module.exports = router;