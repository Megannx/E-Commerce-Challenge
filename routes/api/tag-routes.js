const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }]
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(500).json(err));
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{model: Product, through: ProductTag}]
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'No Tags Found'});
      }
      res.status(200).json(tag);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name 
  })
    .then((newTag) => {
      res.status(201).json(newTag); 
    })
    .catch((err) => {
      res.status(500).json(err); 
    });
});


router.put('/:id', (req, res) => {
  Tag.update(
    { tag_name: req.body.tag_name }, 
    { where: { id: req.params.id } } 
  )
    .then((updatedRows) => {
      if (updatedRows[0] === 0) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(200).json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id }
  })
    .then((deletedRows) => {
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(200).json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});



module.exports = router;