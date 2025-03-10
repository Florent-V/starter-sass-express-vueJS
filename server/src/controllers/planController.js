import Plan from "../models/planModel.js";
import Feature from "../models/featureModel.js";
import NotFoundError from '../error/notFoundError.js';

// Récupération de tous les Products
export const getAllPlans = async (req, res, next) => {
  try {
    res.data.plans = await Plan.findAll({
      include: [
        {
          model: Feature,
          as: 'features'
        }
      ]
    });

    console.log('res.data.plans', res.data.plans);
    next();
  } catch (error) {
    return next(error);
  }
};

