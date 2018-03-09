import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Animal Schema
 */
const AnimalSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  weights: [
    {
      weight: {
        type: Number,
        required: true,
      },
      weight_date: {
        type: Date,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
    }
  ]
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
AnimalSchema.method({
});

/**
 * Statics
 */
AnimalSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of animal.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findOne({ id })
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such animal exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  fetch(id) {
    return this.findOne({ id })
      .exec()
      .then((user) => {
        if (user) {
          return user;
        } else {  // eslint-disable-line no-else-return
          return undefined;
        }
      });
  },

  /**
   * List animals in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of animals to be skipped.
   * @param {number} limit - Limit number of animals to be returned.
   * @returns {Promise<Animal[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('Animal', AnimalSchema);
