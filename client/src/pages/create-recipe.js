import React, { useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const CreateRecipe = () => {
	const userID = useGetUserID();
	const [cookies, _] = useCookies(['access-token']);
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState({
		name: '',
		description: '',
		ingredients: [],
		instructions: '',
		imageUrl: '',
		cookingTime: 0,
		userOwner: userID,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setRecipe({ ...recipe, [name]: value });
	};

	const handleIngredientChange = (event, idx) => {
		const { value } = event.target;
		const ingredients = [...recipe.ingredients];
		ingredients[idx] = value;
		setRecipe({ ...recipe, ingredients });
	};

	const handleAddIngredients = () => {
		const ingredients = [...recipe.ingredients, ''];
		setRecipe({ ...recipe, ingredients });
	};
	const handleDeleteIngredients = (index) => {
		const ingredients = [...recipe.ingredients];
		ingredients.splice(index, 1);
		setRecipe({ ...recipe, ingredients });
		console.log(recipe);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post('http://localhost:3001/recipes', recipe, {
				headers: { authorization: cookies['access-token'] },
			});
			alert('Recipe Created');
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='create-recipe'>
			<h2>Create Recipe</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name' name='name' value={recipe.name} onChange={handleChange} />
				<label htmlFor='description'>Description</label>
				<textarea
					id='description'
					name='description'
					value={recipe.description}
					onChange={handleChange}
				></textarea>
				<label htmlFor='ingredients'>Ingredients</label>
				{recipe.ingredients.map((ingredient, idx) => (
					<>
						<input
							key={idx}
							type='text'
							name='ingredients'
							value={ingredient}
							onChange={(event) => handleIngredientChange(event, idx)}
						/>
						<button type='button' onClick={() => handleDeleteIngredients(idx)}>
							Delete ingredient
						</button>
					</>
				))}
				<button type='button' onClick={handleAddIngredients}>
					Add ingredient
				</button>

				<label htmlFor='instructions'>Instructions</label>
				<textarea
					id='instructions'
					name='instructions'
					value={recipe.instructions}
					onChange={handleChange}
				></textarea>
				<label htmlFor='imageUrl'>Image URL</label>
				<input
					type='text'
					id='imageUrl'
					name='imageUrl'
					value={recipe.imageUrl}
					onChange={handleChange}
				/>
				<label htmlFor='cookingTime'>Cooking Time (minutes)</label>
				<input
					type='number'
					id='cookingTime'
					name='cookingTime'
					value={recipe.cookingTime}
					onChange={handleChange}
				/>
				<button type='submit'>Create Recipe</button>
			</form>
		</div>
	);
};

export default CreateRecipe;
