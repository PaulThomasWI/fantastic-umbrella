const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

/*
  ======================================================================
    Get All Tags along with their associated products
  ======================================================================  
*/
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product, as: "tagged_products" }]
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Get One Tag by Id along with their associated products
  ======================================================================  
*/
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product, as: "tagged_products" }]
  })
  .then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: "No Tag found with this id" });
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Create New Tag
  ======================================================================  
*/
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Update Tag Name By Id
  ======================================================================  
*/
router.put('/:id', (req, res) => {
  Tag.update(
    { tag_name: req.body.tag_name },
    { where: { id: req.params.id } }
  )
  .then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: "No Tag with this id was found" });
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Delete Tag By Id
  ======================================================================  
*/
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: "No Tag found with this id" });
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => { res.status(500).json(err); });
});

module.exports = router;