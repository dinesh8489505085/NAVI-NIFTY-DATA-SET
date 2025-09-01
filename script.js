class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    bindEvents() {
        // Add todo
        document.getElementById('addTodo').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed
        document.getElementById('clearCompleted').addEventListener('click', () => {
            this.clearCompleted();
        });
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            this.todos.unshift(todo);
            this.saveToStorage();
            this.render();
            this.updateStats();
            input.value = '';
            input.focus();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.add('removing');
            setTimeout(() => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveToStorage();
                this.render();
                this.updateStats();
            }, 300);
        }
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.saveToStorage();
        this.render();
        this.updateStats();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        todoList.innerHTML = filteredTodos.map(todo => this.createTodoElement(todo)).join('');
        
        // Bind events to new elements
        this.bindTodoEvents();
    }

    createTodoElement(todo) {
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="todoApp.toggleTodo(${todo.id})"></div>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="todo-delete" onclick="todoApp.deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </li>
        `;
    }

    bindTodoEvents() {
        // Additional event bindings if needed
    }

    updateStats() {
        const activeTodos = this.todos.filter(t => !t.completed).length;
        const totalTodos = this.todos.length;
        
        let countText = '';
        if (totalTodos === 0) {
            countText = 'No tasks';
        } else if (activeTodos === 0) {
            countText = 'All tasks completed!';
        } else if (activeTodos === 1) {
            countText = '1 task remaining';
        } else {
            countText = `${activeTodos} tasks remaining`;
        }
        
        document.getElementById('todoCount').textContent = countText;
        
        // Show/hide clear completed button
        const clearBtn = document.getElementById('clearCompleted');
        const completedTodos = this.todos.filter(t => t.completed).length;
        clearBtn.style.display = completedTodos > 0 ? 'block' : 'none';
    }

    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
let todoApp;
document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoList();
});

// Add some sample todos for demonstration
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (todoApp.todos.length === 0) {
            const sampleTodos = [
                'Welcome to your new Todo List!',
                'Click the checkbox to mark tasks as complete',
                'Use the filters to view different task states',
                'Your tasks are automatically saved locally'
            ];
            
            sampleTodos.forEach(text => {
                const todo = {
                    id: Date.now() + Math.random(),
                    text: text,
                    completed: false,
                    createdAt: new Date().toISOString()
                };
                todoApp.todos.push(todo);
            });
            
            todoApp.saveToStorage();
            todoApp.render();
            todoApp.updateStats();
        }
    }, 500);
});