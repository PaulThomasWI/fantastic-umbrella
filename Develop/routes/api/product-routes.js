const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

/*
  ======================================================================
    Get All Products along with their associated category and tags.
  ======================================================================  
*/
router.get("/", (req, res) => {
  Product.findAll({
    include: [
      { model: Category, attributes: ["id", "category_name"] },
      { model: Tag, as: "tagged_products" }
    ]
  })
  .then((dbProductData) => {
    if (!dbProductData) {
      res.status(404).json({ message: "No Product found with this id" });
      return;
    }
    res.json(dbProductData);
  })
  .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Get Product along with their associated category and tags.
  ======================================================================  
*/
router.get("/:id", (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
    include: [
      { model: Category, attributes: ["id", "category_name"] },
      { model: Tag, as: "tagged_products" },
    ],
  })
  .then((dbProductData) => {
    if (!dbProductData) {
      res.status(404).json({ message: "No Product found with this id" });
      return;
    }
    res.json(dbProductData);
  })
  .catch((err) => { res.status(500).json(err); });
});

/*
  ======================================================================
    Create Product, insert Product Tags.
  ======================================================================  
*/
router.post("/", (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tagIds
  })
    .then((product) => {
      if (req.body.tagIds.length >= 0) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return { product_id: product.id, tag_id, };
        });
        console.log('Array: ' + productTagIdArr);
        return ProductTag.bulkCreate(productTagIdArr);
      }

      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => { res.status(400).json(err); });
});

/*
  ======================================================================
    Update Product, reset Product Tags.
  ======================================================================  
*/
router.put("/:id", (req, res) => {
  Product.update(
    {
      product_name: req.body.product_name, 
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      tagIds: req.body.tagIds
    },
    { where: { id: req.params.id } }
  )
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return { product_id: req.params.id, tag_id };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags)
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => { res.status(400).json(err); });
});

/*
  ======================================================================
    Delete Product by Id.
  ======================================================================  
*/
router.delete("/:id", (req, res) => {
  Product.destroy({
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