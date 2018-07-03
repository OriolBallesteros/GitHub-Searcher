document.getElementById("searchBtn").addEventListener("click", function () {
    var user = getUserName();
    
    var urlUser = "https://api.github.com/users/"+user;
    var urlRepos = "https://api.github.com/users/"+user+"/repos";
    
    fetchCompleted(urlUser, bioUser, errorUser);
    fetchCompleted(urlRepos, userRepos, errorUser);
    
});

function getUserName() {
    var userSearch = document.getElementById("searchBar").value;

    userSearch = userSearch.split(" ").join("");

    return userSearch;

};

function createImg(archive, descrip) {
    var img = document.createElement("img");
    img.setAttribute("src", archive);
    img.setAttribute("alt", descrip);
    img.setAttribute("class", descrip);

    return img;

}

function fetchCompleted(url, successHandler, error) {

    fetch(url, {

            method: "GET",

        }).then(function (response) {

            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);

        }).then(successHandler)

        .catch(error);
};

function bioUser(data) {
    var avatar = document.getElementById("avatar");
    var nickName = document.getElementById("nickName");
    var fullName = document.getElementById("fullName");
    var bio = document.getElementById("bio");
    
    nickName.innerHTML="";
    fullName.innerHTML="";
    bio.innerHTML="";

    var dataAvatar = data.avatar_url;
    var dataNickName = data.login;
    var dataFullName = data.name;
    var dataBio = data.bio;

    avatar.setAttribute("src", dataAvatar);
   
    nickName.appendChild(document.createTextNode("@" + dataNickName));

    fullName.textContent = (dataFullName == null) ? "No name saved" : dataFullName;
    
    bio.textContent = (dataBio == null) ? "No bio saved" : dataBio; 

    document.getElementById("alertContainer").style.display = "none";
    document.getElementById("user").style.display = "block";

}

function userRepos(data) {
    console.log(data);
    
    var listRepos = document.getElementById("listRepos");
    listRepos.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "divStarFork");

        var li = document.createElement("li");
        li.setAttribute("class", "list")
        
        var repo = data[i];
        var repoName = repo.name;


        li.textContent = repoName;
        repoStars(repo, div);
        repoForks(repo, div);

        li.appendChild(div);
        listRepos.appendChild(li);

    }
}

function repoStars(repo, div) {
    var numberStars = repo.stargazers_count;

    var img = createImg("style/images/stars.png", "star");

    div.appendChild(img);
    div.appendChild(document.createTextNode(numberStars));

}

function repoForks(repo, div) {
    var numberForks = repo.forks;

    var img = createImg("style/images/forks.png", "fork");

    div.append(img);
    div.appendChild(document.createTextNode(numberForks));

}

function errorUser() {
    document.getElementById("alertContainer").style.display = "flex";
    document.getElementById("user").style.display="none";
    
}