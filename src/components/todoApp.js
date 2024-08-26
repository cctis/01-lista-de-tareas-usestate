import { useState } from 'react';
import Todo from './todo';

import './todoApp.css';

export default function TodoApp(){
    //reactivo-actualiza el nuevo valor del estado donde esté mostrándolo
    const [title,setTitle] = useState("");
    //para guardar la lista de tareas
    const [todos,setTodos]= useState([]);

    function handleChange(e){
        //para escribir en el input y se actualice el estado
        const value = e.target.value;
        setTitle(value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed:false
        };

        //para agregar la lista se debe usar el estado, copiamos primero lo que ya venga en el objeto con la expresion ...todos y agregamos el nuevo
        setTodos([...todos,newTodo]);
        //reiniciar el campo
        setTitle('');

        /*
        o se puede hacer de otra manera: mas legible (se hace la copia, se agrega a la lista y se actualiza el estado)
        const temp = [...todos]
        temp.unshift(newTodo)
        setTodos[temp] 
        */
    }
    
    function handleUpdate(id,value){
        const temp = [...todos];
        const item = temp.find(item => item.id === id);
        item.title= value;
        setTodos(temp);
    }

    function handleDelete(id){
        const temp = todos.filter(item => item.id != id);
        setTodos(temp);
    }

    return <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" value={title} placeholder='Lista de tareas'/>
            <input onClick={handleSubmit} type="submit" value="Create todo" className="buttonCreate"/>
        </form>
        <div className='todosContainer'>
        {
            //para recorre los elementos y regrese una operacion-los datos a renderizar
            todos.map(item => (
                <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
            ))
        }
        </div>
    </div>;
}