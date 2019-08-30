let maxItemsPerPage = 10;
let listItem = document.querySelectorAll('li');
let docBody = document.body;

let startIndex = 0;
let endIndex = 0;

// This function basically displays 10 items from the list and hides the rest
function showPage(list,page)
{
    
startIndex = page * maxItemsPerPage - maxItemsPerPage;
endIndex = page * maxItemsPerPage;

    
for (let i = 0; i < list.length; i+=1)
    {
        list[i].style.display = 'none';
    }
    

for (let i = startIndex; i < endIndex; i+=1)
    {
        list[i].style.display = 'block';
    }

}

function appendPageLinks(list)
{
    //This is the section that contains the information about each person
    let pageDiv = document.querySelector('.page');
    
    //Round up since if its like 23 links were gonna need 3 pages
    let numberOfLinks = Math.ceil(parseInt (list.length) / maxItemsPerPage) ;
    
    //Create a div tag to clearly indicate the place where the pagination buttons
    //go
    let paginationLinksDiv = document.createElement('DIV');
    paginationLinksDiv.className = 'pagination';
    
    //At the end of the pagination links, the div with the button should be put
    pageDiv.appendChild(paginationLinksDiv);

    //Add the unordered list to the pagination links div
    let paginationLinksUl = document.createElement('UL');
    paginationLinksUl.className = 'UlOfButtons';
    paginationLinksDiv.appendChild(paginationLinksUl);
    
    
    //Go through each link and only activate the li of the page youre on
    for (let i = 1; i <= numberOfLinks; i+=1)
    {
        let paginationLinksLi = document.createElement('LI');
        let paginationLinksA = document.createElement('A');
 
        let liItem = paginationLinksUl.appendChild(paginationLinksLi);           let listItems = paginationLinksUl.children;

        let liA = liItem.appendChild(paginationLinksA);
        liA.textContent = i;
        
        liA.addEventListener('click', () => { 
        showPage(listItem,liItem.textContent);
            
        for (let i = 0; i < numberOfLinks; i += 1)
        {
        listItems[i].className = '';
        }
            
        liItem.className = 'active';
            
        } )
        
    }
    
    //Initialize by setting the first list item to have the class active
    let listItems = paginationLinksUl.children;
    listItems[0].className = 'active';
    
}

showPage(listItem,1);
appendPageLinks(listItem);

//Exceeds expectations part

var searchBar = document.createElement("INPUT");
searchBar.setAttribute("type", "text");
searchBar.style.border = "5px solid blue";
searchBar.style.borderRadius = "5px";
searchBar.style.backgroundColor = "lightgrey";

page = document.querySelector('.page');
page.insertBefore(searchBar,page.firstElementChild);

searchBar.addEventListener('keyup',function(event)
                           {
    //If the search bar is empty, just show the first page
    if (event.target.value === "")
    {
        showPage(listItem,1);
        
    }
    
    else
    
    {
    
    let counter = 0;
    let searchTerm = event.target.value.toLowerCase();

    let people = document.getElementsByClassName('student-item cf');
        
    searchResults = [];    
    Array.from(people).forEach(function(person){
  
    let studentName = person.firstElementChild.textContent;
        
    if (studentName.toLowerCase().indexOf(searchTerm) != -1)
        {
            person.style.display = 'none';
            person.style.boxShadow = '7px';
            counter+=1;
            
            searchResults.push(person);
            
        }
    else 
        { 
            person.style.display = 'none';
            
        }
        
})
    //I need to make a new list of persons only who have block style, and then
    //use the function to make links and do all that shit for it
    //console.log(counter);


    }
    showPage(searchResults,1);
    appendPageLinks(searchResults);
    console.log(searchResults[0].style.display);

})

//while(searchBar.value === '')
//    {
//        
//     showPage(listItem,1);   
//        
//    }



//////////////////////BackupState




