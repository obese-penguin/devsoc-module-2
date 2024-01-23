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
				Uname = data.name
				if (Uname === null) {
					Uname = data.login;
				}
				output.innerHTML = 
				`
				<div id="usr-repos">
						
				</div>
				`
				output.insertAdjacentHTML("afterbegin",  
				`
					<div id="usr-name-display">
					<h1 >${Uname}</h1>
					</div>
					<div id="usr-usrname-display">
					</div>
					<div id="usr-img" >
					</div>
				`
				)
				
				var newStyle = document.createElement("style")
					newStyle.innerText =` 
						#usr-name-display{
							position: absolute;
							padding: 50px;
							height: 10%;
							width: 100%;
						}
						#usr-usrname-display{
							position: relative;
							width: 100%
							height: 8%;
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
				let output_repos = document.getElementById("usr-repos")
				output_repos.insertAdjacentHTML('beforeend',
				`
				<div id="repo-title-head">
				<h2>Repositories</h2>
				</div>	
				`)

				var newStyle = document.createElement("style")
				newStyle.innerText = `
				#usr-repos{
					box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset; 
				}
				`
				document.head.appendChild(newStyle);
				for (let i = 0, len = data.length; i < len; i++) 
				{
					// display name, url, description, language

					description = data[i].description
					if (description === null) {
						description = ""
					}
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
						min-height: 95px;
						word-wrap: break-word;
						border-bottom: 1px solid gray;
						overflow-y: scroll;
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
						display: flex;
						padding-bottom: 5px;
						left: 22px;
					}

					.repo-info{
						padding: 20px 0px 0px 20px;
					}
					`
					document.head.appendChild(newStyle)
				}
			})

})
