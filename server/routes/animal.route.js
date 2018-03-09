import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import animalCtrl from '../controllers/animal.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/animal - Create new animal */
  .post(validate(paramValidation.createAnimal), animalCtrl.checkDuplicateID, animalCtrl.create)

  /** GET /api/animal - Get list of animals */
  .get(animalCtrl.list);

router.route('/estimated_weight')
  .get(validate(paramValidation.estimatedWeight), animalCtrl.estimatedWeight);

router.route('/:animalId')
  /** GET /api/animal/:animalId - Get all details of a animals */
  .get(validate(paramValidation.getAnimal), animalCtrl.get);

router.route('/:animalId/weight')
  /** POST /api/animal/:animalId/weight - Add weight of animal */
  .post(validate(paramValidation.addWeight), animalCtrl.addWeight);


/** Load user when API with userId route parameter is hit */
router.param('animalId', animalCtrl.load);

export default router;
