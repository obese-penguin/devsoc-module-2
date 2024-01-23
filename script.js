/*
search = "obese-penguin"

info = fetch("https://api.github.com/users/" + search)
	.then(result => result.json())
	.then(data => console.log(data.repos_url))
*/

const URL = "https://api.github.com/users/" 

let form = document.getElementById("search-form")

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let input = document.getElementById("github-username")
	let search = input.value
	let output = document.getElementById("output-page")

	info = fetch(URL + search)
		.then(result => result.json())
		.then(data => 
			{

				output.innerHTML = 
				`
				<div id="usr-repos">
						
				</div>
				`
				output.insertAdjacentHTML("afterbegin",  
				`
					<h1 id="usr-name-display">${data.name}</h1> 
					<div id="usr-img" >
					</div>
				`
				)
				
				var newStyle = document.createElement("style")
					newStyle.innerText =` 
						#usr-name-display{
							position: absolute;
							height: 10%;
							width: 100%;
						}	
					}
					`		

					document.head.appendChild(newStyle)

				let img = document.getElementById("usr-img")
				
				img.innerHTML = 
				`
					<a href="${data.html_url}" target="_blank">
					<img src="${data.avatar_url}">
				`
			}) 

	repo = fetch(URL + search + "/repos")
		.then(result => result.json())
		.then(data => 
			{
				for (let i = 0, len = data.length; i < len; i++) 
				{
					// display name, url, description, language

					description = data[i].description
					if (description === null) {
						description = ""
					}
					let output_repos = document.getElementById("usr-repos")
					output_repos.insertAdjacentHTML('beforeend',
					`
						<div id="repo-${i}" class="repo-info">
						<div class="repo-link">
						<h2><a href="${data[i].html_url}" target="_blank">${data[i].name}</a></h2>
						</div>
						<div class="repo-description">
						<i>${description}</i>
						</div>
						</div>
					`)

					var newStyle = document.createElement("style")
					newStyle.innerText =` 
					#repo-${i}{
						position: relative;
						height: 100px;
						/*border: 2px solid black;*/
					}
					
					.repo-link{
						padding: 20px 0px 0px 20px
						position: relative;
						left: -30%;
						top: 0px;
					}
					
					.repo-link.h2{
						text-align: left;
					}

					.repo-description{
						position: absolute;
						
						text-align: left;
						left: 10px;
					}

					.repo-info{
						padding: 20px 0px 0px 20px;
					}
					`

					
					document.head.appendChild(newStyle)
				}
			})

})
