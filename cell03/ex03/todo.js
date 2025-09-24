function setCookie(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

class TodoManager {
    constructor() {
        this.ftList = document.getElementById('ft_list');
        this.newBtn = document.getElementById('new-btn');
        this.tasks = [];
        
        this.init();
    }
    
    init() {
        this.loadTasks();
        
        this.newBtn.addEventListener('click', () => this.addNewTask());
        
        this.renderTasks();
    }
    
    addNewTask() {
        const taskText = prompt("Enter a new TO DO:");
        
        if (taskText !== null && taskText.trim() !== '') {
            const task = {
                id: Date.now(), 
                text: taskText.trim()
            };
            
            this.tasks.unshift(task);
            
            this.saveTasks();
            
            this.renderTasks();
        }
    }
    
    removeTask(taskId) {
        const confirmed = confirm("Do you want to remove this TO DO?");
        
        if (confirmed) {
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            
            if (taskElement) {
                taskElement.classList.add('fade-out');
                
                setTimeout(() => {
                    this.tasks = this.tasks.filter(task => task.id !== taskId);
                    
                    this.saveTasks();
                    
                    this.renderTasks();
                }, 300);
            }
        }
    }
    
    renderTasks() {
        this.ftList.innerHTML = '';
        
        if (this.tasks.length === 0) {
            return;
        }
        
        this.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'todo-item fade-in';
            taskDiv.textContent = task.text;
            taskDiv.setAttribute('data-task-id', task.id);
            
            taskDiv.addEventListener('click', () => {
                this.removeTask(task.id);
            });
            
            this.ftList.appendChild(taskDiv);
        });
    }
    
    saveTasks() {
        if (this.tasks.length > 0) {
            setCookie('ft_list_tasks', JSON.stringify(this.tasks));
        } else {
            deleteCookie('ft_list_tasks');
        }
    }
    
    loadTasks() {
        const savedTasks = getCookie('ft_list_tasks');
        
        if (savedTasks) {
            try {
                this.tasks = JSON.parse(savedTasks);
            } catch (e) {
                console.error('Error parsing saved tasks:', e);
                this.tasks = [];
                deleteCookie('ft_list_tasks');
            }
        } else {
            this.tasks = [];
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoManager();
});