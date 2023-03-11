const router = require('express').Router();
const {Category, Product} = require('../../models');

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Product data
   Category.findAll({
    include: [{
      model: Product
    }]
  })
  .then((categoryData) => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Product data
   Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({message: 'No product found with this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(categoryData => {
    if (! categoryData) {
      res.status(404).json({message:'No category found with this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(catagoryData => {
    if (!catagoryData){
    res.status(404).json({message: "No category found with that id."});
    return;
  }
  res.json(catagoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
  });
});

module.exports = router;
