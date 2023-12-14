const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [Product]
    });
    // show data
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne( {
      where: { id: req.params.id },
      include: [
        {
          model: Product,
          through: ProductTag
    }],
    });
    // show data
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    // show data
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // if update fails
    if (!newTagData) {
      res.status(404).json({ message: 'No Tag Data found with that id, update failed' });
      return;
    }
    // show data
    res.status(200).json(newTagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDeleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // if delete fails
    if (!tagDeleted) {
      res.status(404).json({ message: 'No Tag Data found with that id, delete failed' });
      return;
    }
    // show data
    res.status(200).json({message: 'Tag deleted'});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
