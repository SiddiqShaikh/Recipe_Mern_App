import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';

function SavedRecipe() {
	const userID = useGetUserID();
	const [savedRecipes, setSavedRecipes] = useState([]);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
				setSavedRecipes(response.data.savedRecipes);
				console.log(response.data.savedRecipes);
			} catch (err) {
				console.log(err);
			}
		};
		fetchRecipes();
	}, []);
	return (
		<div>
			<h1>Saved Recipes</h1>
			<ul>
				{savedRecipes?.map((recipe) => (
					<li key={recipe._id}>
						<div>
							<h2>{recipe.name}</h2>
						</div>
						<div className='instructions'>
							<p>{recipe.instructions}</p>
						</div>
						<img src={recipe.imageUrl} alt={recipe.name} />
						<p>Cooking Time: {recipe.cookingTime} minutes</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SavedRecipe;
