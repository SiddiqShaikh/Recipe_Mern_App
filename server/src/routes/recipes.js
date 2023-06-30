import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/User.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const response = await RecipeModel.find({});
		res.json(response);
	} catch (err) {
		res.json(err);
	}
});
router.post('/', verifyToken, async (req, res) => {
	const recipe = new RecipeModel(req.body);
	try {
		const response = await recipe.save();
		res.json(response);
	} catch (err) {
		res.json(err);
	}
});
// saved Receipe
router.put('/', verifyToken, async (req, res) => {
	const recipe = await RecipeModel.findById(req.body.recipeID);
	const user = await UserModel.findById(req.body.userID);
	try {
		user.savedRecipes.push(recipe);
		await user.save();
		res.json({ savedRecipes: user.savedRecipes });
	} catch (err) {
		res.json(err);
	}
});
// get all saved recipes IDS FROM USER MODEL
router.get('/savedRecipes/ids/:userID', async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userID);
		res.json({ savedRecipes: user?.savedRecipes });
	} catch (err) {
		res.json(err);
	}
});

// GET ALL SAVED RECEIPES
router.get('/savedRecipes/:userID', async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userID);
		const savedRecipes = await RecipeModel.find({
			_id: { $in: user.savedRecipes },
		});
		res.json({ savedRecipes });
	} catch (err) {
		res.json(err);
	}
});

export { router as recipesRouter };
