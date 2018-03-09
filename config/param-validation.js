import Joi from 'joi';

export default {
  // POST /api/users
  createAnimal: {
    body: {
      id: Joi.number().required(),
    }
  },

  // UPDATE /api/animal/:animalId
  addWeight: {
    body: {
      weight: Joi.number().required(),
      weight_date: Joi.date().iso(),
    },
    params: {
      animalId: Joi.string().hex().required()
    }
  },

  estimatedWeight: {
    query: {
      date: Joi.date().iso().required(),
    }
  },

  getAnimal: {
    params: {
      animalId: Joi.string().hex().required()
    }
  }
};
