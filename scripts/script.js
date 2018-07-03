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




//////make a call to user info API
//function fetchUser(user) {
//
//    fetch("https://api.github.com/users/" + user, {
//
//        method: "GET",
//
//    }).then(function (response) {
//
//        if (response.ok) {
//            return response.json();
//        }
//
//        throw new Error(response.statusText);
//
//    }).then(function (json) {
//
//        console.log(json);
//
//        //hide and show what it is required
//        document.getElementById("alertContainer").style.display = "none";
//        document.getElementById("user").style.display = "block";
//
//        //print info about user
//        bioUser(data);
//
//
//    }).catch(function (error) {
//        console.log("Request failed: " + error.message);
//
//        //        //show the alert div and hide the info about user (no user, no info)
//        //        document.getElementById("alertContainer").style.display = "flex";
//        //        document.getElementById("alert").style.display = "block";
//        //        document.getElementById("user").style.display = "none";
//        errorUser();
//
//    });
//};
//
//
////make a call to user repo info 
//function fetchRepos(user) {
//
//    fetch("https://api.github.com/users/" + user + "/repos", {
//
//            method: "GET",
//
//        }).then(function (response) {
//
//            if (response.ok) {
//                return response.json();
//            }
//
//            throw new Error(response.statusText);
//
//        })
//        .then(userRepos)
//        .catch(function (error) {
//            console.log("Request failed: " + error.message);
//
//        });
//};



//take and print main info of user's bio
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


//    if (dataFullName != null) {
//        fullName.appendChild(document.createTextNode(dataFullName));
//        
//    } else {
//        fullName.appendChild(document.createTextNode("No name saved"));
//        
//    }
//  Cuando tenemos un escenario con tres situaciones una línia muy elegante es el uso de TERNARY; ternary tiene la sintaxi: 
//  "var z = (condicional) ? x : y" --> funcionamiento = a la var z, si la condicion se cumple, aplicale X, sino, aplicale Y. 
// Ejemplo: aquí debajo: a fullName le daremos un texto = "fullName.textContent"; (dataFullName es Null)? sí-aplicale "No name saved" : no-aplicale dataFullName;
    fullName.textContent = (dataFullName == null) ? "No name saved" : dataFullName;
    
    
//    if (dataBio != null) {
//        bio.appendChild(document.createTextNode(dataBio));
//        
//    } else {
//        bio.appendChild(document.createTextNode("No bio saved"));
//        
//    }
//  Otro caso igual de ternary
    bio.textContent = (dataBio == null) ? "No bio saved" : dataBio; 


    //Es mejor praxis no aplicar CSS des de el JS. Mejor seria asignar una o otra clase y que sea la clase la que contempla el estilo deseado. 
    document.getElementById("alertContainer").style.display = "none";
    document.getElementById("user").style.display = "block";


}


//print info about repos of the user. Print the name of the repo directly in this function; 
//call the functions to print Stars and Forks
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


//print star image and number of it of the singular repo
function repoStars(repo, div) {
    var numberStars = repo.stargazers_count;

    var img = createImg("style/images/stars.png", "star");

    div.appendChild(img);
    div.appendChild(document.createTextNode(numberStars));

}


//print fork image and number of it of this singular repo
function repoForks(repo, div) {
    var numberForks = repo.forks;

    var img = createImg("style/images/forks.png", "fork");

    div.append(img);
    div.appendChild(document.createTextNode(numberForks));

}


//print an error message if there is no result from the search
function errorUser() {
    document.getElementById("alertContainer").style.display = "flex";
    document.getElementById("user").style.display="none";
    
//  Si el text no canvia mai no cal que el fem a través de DOM, ho deixem ja preparat al HTML.
//    var alert = document.getElementById("alert");
//    alert.textContent="Does not exist";

}


//ANOTACIONES SOBRE TERNARY
//var name="A";
//    var count;
//    if (name == "A") {
//        count = 1;
//    } else {
//        count = 3;
//    }
//    
//    function ternary(a, b, c){
//        if (a){ 
//            return b;
//        }else{
//            return c;
//        }
//    }
//        
//    a ? b : c;
//    count = (name == "A") ? 1 : 3;
//    count = ternary(name == "A", 1, 3);
