$(document).ready(function() {
    
    let toDos = JSON.parse(getCookie("TD") || "[]");
    toDos.forEach(displayToDoItem); 

    $("#new-btn").click(function() {
        const newToDo = prompt("Enter a new to do item:");
        if (newToDo !== null && newToDo.trim() !== "") { 
            const toDoItem = { text: newToDo.trim() };
            toDos.unshift(toDoItem); 
            setCookie("TD", JSON.stringify(toDos), 365);
            displayToDoItem(toDoItem);
        } else {
            alert("Please enter a valid to-do item."); 
        }
    });

    function displayToDoItem(toDoItem) {
        const $div = $("<div>").text(toDoItem.text);
        
        $div.click(function() {
            if (confirm("Are you sure you want to delete this item?")) {
                toDos.splice(toDos.indexOf(toDoItem), 1); 
                setCookie("TD", JSON.stringify(toDos), 365); 
                $div.remove(); 
            }
        });
        $("#ft_list").prepend($div); 
    }

    function getCookie(name) {
        const cookieValue = `; ${document.cookie}`;
        const cookieParts = cookieValue.split(`; ${name}=`); 
        if (cookieParts.length === 2) return cookieParts.pop().split(';').shift();
        return "";
    }

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }
});
