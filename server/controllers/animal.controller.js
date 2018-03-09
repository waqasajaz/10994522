import Animal from '../models/animal.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Animal.get(id)
    .then((animal) => {
      req.animal = animal; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get animal
 * @returns {Animal}
 */
function get(req, res) {
  return res.json(req.animal);
}


/**
 * Check If animal already exists
 * @property {Number} req.body.id - The id of animal.
 * @returns {}
 */
function checkDuplicateID(req, res, next) {
  Animal.fetch(req.body.id)
  .then((animal) => { // eslint-disable-line consistent-return
    if (animal) {
      res.json({ error: 'ID already exist' });
    } else {
      return next();
    }
  })
  .catch(e => next(e));
}

/**
 * Create new animal
 * @property {Number} req.body.id - The id of animal.
 * @returns {Animal}
 */
function create(req, res, next) {
  const animal = new Animal({
    id: req.body.id
  });

  animal.save()
    .then(savedAnimal => res.json(savedAnimal))
    .catch(e => next(e));
}

/**
 * Get animal list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Animal[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Animal.list({ limit, skip })
    .then(animals => res.json(animals))
    .catch(e => next(e));
}

/**
 * Add weight of existing animal
 * @property {Number} req.body.weight - Weight of animal.
 * @property {Date} req.body.weight_date - Date of weight.
 * @returns {Animal}
 */
function addWeight(req, res, next) {
  const animal = req.animal;
  animal.weights.push({
    weight: req.body.weight,
    weight_date: req.body.weight_date
  });

  animal.save()
    .then(savedAnimal => res.json(savedAnimal))
    .catch(e => next(e));
}

/**
 * Add weight of existing animal
 * @property {Date} req.query.date - Date to perform search upon
 * @returns {Object}
 */
function estimatedWeight(req, res, next) {
  Animal.list()
    .then((animals) => {
      const numAnimals = animals.length;
      const estimatedTotalWeight = 0.0;
      res.json({
        num_animals: numAnimals,
        estimated_total_weight: estimatedTotalWeight,
        remarks: 'Incorrect results'
      });
    })
    .catch(e => next(e));
}

/**
 * Delete animal.
 * @returns {Animal}
 */
function remove(req, res, next) {
  const animal = req.animal;
  animal.remove()
    .then(deletedAnimal => res.json(deletedAnimal))
    .catch(e => next(e));
}

export default { load, get, create, addWeight, list, estimatedWeight, remove, checkDuplicateID };
