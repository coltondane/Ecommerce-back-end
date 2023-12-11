const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
    return;
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne( {
      where: {id:req.params.id},
      include: [Product],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category Data found for that ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
    return;
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
    return;
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
 try {
  const categoryUpdated = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    if(!categoryUpdated){
      return res.status(404).json({message: 'Category not found'});
    }
    const updatedCategoryData = await Category.findByPk(req.params.id);
  return res.json(updatedCategoryData);
 } catch (err) {
  res.status(400).json(err);
  console.log(err);
  return;
 }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that ID' });
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
    return;
  }
});

module.exports = router;