let maxItemsPerPage = 10;
let list = document.querySelectorAll('li');

//It takes in the list, and shows you the desired page
function showPage(list,page)
{
    
let startIndex = ( (page-1)*10 ) ;
let endIndex = (page*10 -1) ;
    
    
//Only show the list items between the two indexes
for (let i = 0; i < list.length; i+=1) 
    {
        if ( (i >= startIndex) && (i <= endIndex) )
            { 
                list[i].style.display = 'block'; 
            }
        else
            {
                list[i].style.display = 'none';
            }
    }
    
}

function appendPageLinks(list)
{      
    //Create and append the div tag for the pagination buttons
    let pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    let page = document.querySelector(".page");
    page.append(pagination);
    
    //Create the ul tag and append the li's to it.
    let ul = document.createElement('ul');
    
    pagination.append(ul);
    
    for (let i = 1; i <= Math.ceil(parseInt (list.length) / maxItemsPerPage); i+= 1)
    {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = "#";
        a.textContent = i;
        li.append(a);
        ul.append(li);
    }
    
    let paginationLinks = ul.children;
        

for (let i = 0; i < Math.ceil(parseInt (list.length) / maxItemsPerPage); i+= 1)
{

//Change the active button each time a new link is clicked
paginationLinks[i].addEventListener('click', (event) => {
    
    
    showPage(list,event.target.textContent);
    for (let i = 0; i < Math.ceil( parseInt (list.length) / maxItemsPerPage ); i+=1)
        {
            paginationLinks[i].className = '';
        }
            
            event.target.className = 'active';
} );   
  
}
    
}


//For the search functionality, so it doesn't keep creating more and more links without clearing 
//Previously created ones
function clearLinks()
{
    let pagination = document.querySelector(".pagination");
    while (pagination.hasChildNodes()) 
    {
      pagination.removeChild(pagination.firstChild);
    }
    
    pagination.remove();
}


let pageHeader = document.querySelector('.page-header');

let searchBarDiv = document.createElement('div');
searchBarDiv.className = "search-bar";


pageHeader.append(searchBarDiv);

//Create the dynamic search bar and set its attributes
let searchBar = document.createElement('input');
searchBar.setAttribute("type", "text");
searchBar.id = "sbid"
searchBar.style.border = "5px solid black";
searchBar.style.borderRadius = "5px 10px";
searchBar.style.backgroundColor = "lightgrey";
searchBar.style.marginLeft="1300px";
searchBar.placeholder = "Search for a user";

searchBarDiv.append(searchBar);

showPage(list,1);
appendPageLinks(list);


searchBar.addEventListener('keyup',function(event)
                           {
    
    if (document.querySelector(".noResults") != undefined)
    {
    document.querySelector(".noResults").remove();
    }
    
    //If the search bar is empty, just show the first page
    if (event.target.value === "")
    {      
        clearLinks();
        showPage(list,1);
        appendPageLinks(list,1);
        
    }
    
    else
    
    {
    
    let counter = 0;
    let searchTerm = event.target.value.toLowerCase();

    let people = document.getElementsByClassName('student-item cf');
    
    //Store search results in an array, if the string exists in any of the users
    searchResults = [];    
    Array.from(people).forEach(function(person){
  
    let studentName = person.firstElementChild.textContent;
        
    if (studentName.toLowerCase().indexOf(searchTerm) != -1)
        {
            person.style.display = 'none';
            counter+=1;
            
            searchResults.push(person);
            
        }
    else 
        { 
            person.style.display = 'none';
            
        }
              
})
    if (searchResults === undefined || searchResults.length == 0) 
    {
        
        let p = document.createElement("p");
        p.textContent = "Sorry. No results were found.";
        p.className = "noResults";
        let page = document.querySelector(".page");
        page.append(p);
        
        
    // array empty or does not exist
    }    
        
        
    clearLinks();
    showPage(searchResults,1);
    appendPageLinks(searchResults);
    }
    

})
                       
