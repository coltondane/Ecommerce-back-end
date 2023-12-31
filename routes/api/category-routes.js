const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
    return;
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne( {
      where: { id: req.params.id },
      include: [Product],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category Data found with that id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
    return;
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
    return;
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryUpdated = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryUpdated) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const updatedCategoryData = await Category.findByPk(req.params.id);
    return res.json(updatedCategoryData);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
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
      res.status(404).json({ message: 'No Category found with that id' });
      return;
    }
    res.status(200).json({message: "Category Deleted"});
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
    return;
  }
});

module.exports = router;