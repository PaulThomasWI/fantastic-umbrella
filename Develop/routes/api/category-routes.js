const router = require("express").Router();
const { Category, Product } = require("../../models");

/*
  ======================================================================
    Get All Categories along with their associated products
  ======================================================================  
*/
router.get("/", (req, res) => {
  Category.findAll({})
    .then((dbData) => res.json(dbData))
    .catch((err) => { res.status(500).json(err);  });
});

/*
  ======================================================================
    Get One Category by Id along with their associated products
  ======================================================================  
*/
router.get("/:id", (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: [
      { model: Product, attributes: ["id", "product_name", "price"] }
    ]
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No Category found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Create New Category
  ======================================================================  
*/
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Update Category Name By Id
  ======================================================================  
*/
router.put("/:id", (req, res) => {
  Category.update(
    { category_name: req.body.category_name },
    { where: { id: req.params.id } }
  )
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category with this id was found" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Delete Category By Id
  ======================================================================  
*/
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No Category found with this id" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => { res.status(500).json(err); });
});

module.exports = router;