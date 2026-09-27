// main variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Func
function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "Input Field Can't Be Empty";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((repos) => {
        reposData.innerHTML = "";
        repos.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          let infoBox = document.createElement("div");
          let theUrl = document.createElement("a");
          let urlText = document.createTextNode("Visit");
          theUrl.appendChild(urlText);
          theUrl.href = repo.html_url;
          theUrl.setAttribute("target", "_blank");
          infoBox.appendChild(theUrl);
          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars: ${repo.stargazers_count}`,
          );
          starsSpan.appendChild(starsText);
          infoBox.appendChild(starsSpan);
          infoBox.className = "info-box";
          mainDiv.appendChild(infoBox);
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
      });
  }
}
