let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos(todos);

function renderTodos(items){
    statusCheck(items);
    if(!items.length < 1){
        clearList();
        showList(todos);
    } else {
        clearList()
        document.getElementById('list-rencana').innerHTML = '<p class="text-center" id="empty">Seems that you have not any plan, create new one!</p>'
    }
}

function statusCheck(items){
    let finished = 0;
    let unfinished = 0;
    for(let i=0;i<items.length;i++){
        if(items[i].isDone==true){
            finished += 1;
        } else {
            unfinished += 1;
        }
    }
    document.getElementById('doneCount').innerHTML = finished;
    document.getElementById('undoneCount').innerHTML = unfinished;
}

function clearList(){
    //document.getElementById('empty').style.display = 'none';
    let list = document.getElementById('list-rencana');
    for(let i = 0;i<list.childElementCount;i++){
        list.firstElementChild.remove();
    }
}

function showList(){
    let list = document.getElementById('list-rencana');
    let item = '';
    for(let i = 0;i<todos.length;i++){
        item += createListChild(i,todos[i].name,todos[i].priority,todos[i].isDone);
    }
    list.innerHTML = item;
}

function createListChild(index,text,priority,isDone){
    let style = '';
    if(priority == 1){
        style += ' important'
    }
    if(isDone == true ){
        style += ' done'
    }
    let item = '<div class="list '+ style +'" onclick="isDone('+ index +')"><div class="teks">' + text + '</div><div class="action">' +
        '<button class="btn btn-sm btn-danger mx-1" onclick="destroy('+ index +')"><i class="fas fa-trash"></i></button></div></div>';
    
    return item;
}

function addPlan(){
    event.preventDefault()
    let input = document.getElementById('input').value;
    let priority = 0;
    if(document.getElementsByName('priority')[0].checked){
        priority = 1;
        document.getElementsByName('priority')[0].checked = false;
        document.getElementsByName('priority')[1].checked = false;
    }
    if( isEmpty(input) ) {
        alert('Plan name could not be empty')
    } else {
        let item = {
            name: input,
            priority: priority,
            isDone: false
        }
        todos.push(item);
        localStorage.setItem('todos',JSON.stringify(todos))
        document.getElementById('input').value = ''
        renderTodos(todos);
    }
}

function isEmpty(str) {
    return !str.trim().length;
}

function destroy(index){
    todos.splice(index,1);
    localStorage.setItem('todos',JSON.stringify(todos))
    renderTodos(todos)
}

function isDone(index){
    todos[index].isDone = !todos[index].isDone;
    localStorage.setItem('todos',JSON.stringify(todos))
    renderTodos(todos);
}