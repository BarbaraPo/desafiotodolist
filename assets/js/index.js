const taskInput = document.querySelector('#taskInput');
const btnAdd = document.querySelector('.btn-add');
const totalTodos = document.querySelector('#totalTodos');
const completedTodos = document.querySelector('#completedTodos');

//const tableTodo = document.querySelector('#tableTodo');
//const tableBody = tableTodo.querySelector('tbody');

const tableBody = document.querySelector('#tableTodo tbody');
let todoID = 3;


// Listado de TODOS iniciales
const todoList = [
    {
        id: 1,
        dataId: 1,
        name: 'Pagar las cuentas',
        completed: true
    },
    {
        id: 2,
        dataId: 2,
        name: 'Agendar hora al dentista',
        completed: false
    },
    {
        id: 3,
        dataId: 3,
        name: 'Ir al banco',
        completed: false
    }
];


function plantillaTarea(tarea) {
    // this.checked indica si el checkbox está marcado o no, enviando true o false como parametro
    return `
        <tr>
            <td>${ tarea.id }</td>
            <td>${ tarea.name }</td>
            <td style="width: 7.5rem;">
                <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                        <input
                        id="tarea1"
                        class="form-check-input p-2"
                        type="checkbox"
                        ${ tarea.completed == true ? 'checked' : '' }
                        onchange="tareaCompletada(${tarea.id}, this.checked)"
                        />
                    </div>
                    <button class="btn btn-danger btn-sm btn-remove" type="button" onclick="eliminarTarea(${tarea.id})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

/*--- FUNCIONES PRINCIPALES ---*/

function actualizarContadorTotales() {
    const totalTodosSpan = document.getElementById('totalTodos');
    const completedTodosSpan = document.getElementById('completedTodos');

    totalTodosSpan.innerHTML = todoList.length;
    completedTodosSpan.innerHTML = todoList.filter( todo => todo.completed ).length;
}

function generarTodasLasTareas() {
    tableBody.innerHTML = '';
    todoList.forEach(tarea => {
        tableBody.innerHTML += plantillaTarea(tarea);
    });
    actualizarContadorTotales();
}

generarTodasLasTareas();


/*--- FUNCIONES DE EVENTOS ---*/

function agregarTarea(tareaInput) {

    const nuevaTarea = {
        id: ++todoID,
        name: tareaInput,
        completed: false
    };

    todoList.push(nuevaTarea);
    tableBody.innerHTML += plantillaTarea(nuevaTarea);
    actualizarContadorTotales();
}

function tareaCompletada(id, estado) {

    
    const tarea = todoList.find( todo => todo.id === id);

    if (!tarea) {
        console.error(`Tarea con ID ${id} no encontrada.`);
        return;
    }


    tarea.completed = estado;
    actualizarContadorTotales();

}

function eliminarTarea(tareaID) {

    const index = todoList.findIndex(todo => todo.id === tareaID);

    if (index === -1) {
        console.error(`Tarea con ID ${tareaID} no encontrada.`);
        return;
    }

    todoList.splice(index, 1);
    
    generarTodasLasTareas();
    
}



btnAdd.addEventListener('click', () => {

    // Limpia espacios al inicio y al final
    const tareaInput = taskInput.value.trim();
    if (tareaInput.length === 0) {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    agregarTarea(tareaInput);
    taskInput.value = ''; // Limpia el input
    actualizarContadorTotales();

})