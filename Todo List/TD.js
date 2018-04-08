var log = console.log.bind(console)

var e = function(sel) {
    return document.querySelector(sel)
}

var es = function(sel) {
    return document.querySelectorAll(sel)
}

var templetTodo = function(todo) {
    log('todo', todo)
    var t =`
    <div class='todo-cell'>
        <span>
            ${todo.time}
        </span>
        <span class="fa-stack fa-lg">
            <i class="todo-done fa fa-circle-o"></i>
        </span>
        <span class='todo-text'>
            ${todo.task}
        </span>
        <i class="todo-delete fa fa-trash" id='delete'></i>
        </span>
        <hr>
    </div>
    `
    return t
}



var loadTodos = function() {
    var s = localStorage.savedTodos
    log('ll', s)
    if (s == undefined) {
        var s = []
        return s
    }else {
        var ts = JSON.parse(s)
        return ts
    }
}

var deleteTodo = function(todoCell, todoAll) {
        for (var i = 0; i < todoAll.children.length; i++) {
            var cell = todoAll.children[i]
            if (cell == todoCell) {
                log('i', i)
                var todos = loadTodos()
                todos.splice(i, 1)
                var s = JSON.stringify(todos)
                localStorage.savedTodos = s
                todoCell.remove()
            }
        }
}

var saveTodo = function(todo) {
    var todos = loadTodos()
    todos.push(todo)
    var s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

var insertTodos = function(todos) {
    var todoAll = e('#id-todoAll')
    for (var i = 0; i < todos.length; i++) {
        var html = templetTodo(todos[i])
        todoAll.insertAdjacentHTML('beforeend', html)
    }
}


// 给+绑定事件
var bindAdd = function() {
    var addButton = e('#id-button-add')
    addButton.addEventListener('click', function() {
        // log('dianji')
        var todoInput = e('#id-todo-input')
        var value = todoInput.value
        // 获取创建时间
        var myDate = new Date()
        var h = myDate.getHours()
        var m = myDate.getMinutes()
        var time = `${h}:${m}`
        // todo
        var todo = {
            task: value,
            time: time
        }
        // 加载 todo 到当前页面
        var html = templetTodo(todo)
        var todoAll = e('#id-todoAll')
        todoAll.insertAdjacentHTML('beforeend', html)
        // 加载 todo 到 localStorage
        saveTodo(todo)
    })
}

var bindTodoAll = function() {
    var todoAll = e('#id-todoAll')
    todoAll.addEventListener('click', function(event) {
        // log('dianji cell')
        target = event.target
        var todoCell = target.parentElement
        if (target.classList.contains('todo-delete')) {
            log('delete')
            todoAll = todoCell.parentElement
            deleteTodo(todoCell, todoAll)
        }else if (target.classList.contains('todo-done')) {
            var todoDone = target.parentElement
            var todoCell = todoDone.parentElement
            todoCell.classList.toggle('done')
        }
    })
}

var bindTheme = function() {
    var colors = e('.color')
        colors.addEventListener('click', function(event){
            var target = event.target
            th = e('#themes')
            if (target.classList.contains('yellow')) {
                th.className = 'yellow'
            }else if (target.classList.contains('orange')) {
                th.className = 'orange'
            }else if (target.classList.contains('blue')) {
                th.className = 'blue'
            }
        })
}

var toggleClass = function(container, classname) {
    if (container.classList.contains(classname)) {
        container.classList.remove(classname)
    }
    container.classList.add(classname)
}

var bindZhuti = function() {
    var zh = e('.zhuti')
    zh.addEventListener('click', function(){
        log('dianji')
        var color = e('#id-color')
        color.classList.toggle('col')
    })
}

var other = function() {
    var todos = loadTodos()
    insertTodos(todos)
}

var bindAlls = function() {
    bindAdd()
    bindTodoAll()
    bindTheme()
    bindZhuti()
}

var __main = function() {
    other()
    bindAlls()
}

__main()
