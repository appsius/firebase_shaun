const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe) => {
	let time = recipe.created_at.toDate();
	let html = `
      <li>
         <div>${recipe.title}</div>
         <div>${time}</div>
      </li>
   `;

	list.innerHTML += html;
};

db.collection('recipes')
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			console.log(doc.data());
			addRecipe(doc.data());
		});
	})
	.catch((err) => {
		console.log(err);
	});

// Add documents
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const now = new Date();
	const recipe = {
		title: form.recipe.value,
		created_at: firebase.firestore.Timestamp.fromDate(now),
	};

	db.collection('recipes')
		.add(recipe)
		.then(() => {
			console.log('Recipe added...');
		})
		.catch((err) => {
			console.log(err);
		});
});
