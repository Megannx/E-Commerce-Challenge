const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  router.get('/', (req, res) => {
    Category.findAll({ include: Product })
      .then(categories => {
        res.json(categories);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      });
  });
});

router.get('/:id', (req, res) => {
  const categoryId = req.params.id;
  Category.findByPk(categoryId, { include: Product })
    .then(category => {
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(newCategory => {
    res.status(201).json(newCategory);
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ error: 'Failed to create category' });
  });
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
    const categoryId = req.params.id;
    Category.update(req.body, {
      where: { id: categoryId }
    })
      .then(updatedRows => {
        if (updatedRows[0] === 0) {
          return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Failed to update category' });
      });
  });

router.delete('/:id', (req, res) => {
  const categoryId = req.params.id;
  Category.destroy({
    where: { id: categoryId }
  })
    .then(deletedRows => {
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete category' });
    });
});

module.exports = router;
