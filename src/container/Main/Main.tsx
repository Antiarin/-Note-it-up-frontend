import { AnimatePresence,motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { addTask, deleteTask, getTasks, updateTask } from '../../API';
import AddTask from '../../component/addTask/AddTask';
import TaskItem from '../../component/taskItems/TaskItem';
import styles from './Main.module.css';


const Main = () => {
    const [tasks, setTasks] = useState<ITodo[] | null>();
    const [selected, setSelected] = useState('');


    useEffect(() => {
        const fetchTasks = (): void => {

            getTasks(selected)
                .then(({ data: { todos } }: ITodo[] | any) => setTasks(todos))
                .catch((err: Error) => console.log(err));
        }
        fetchTasks();

    }, [selected]);

    const handleSaveTask = (e: React.FormEvent, formData: ITodo): void => {
        e.preventDefault()
        console.log(formData);
        addTask(formData)
            .then(({ status, data }) => {
                if (status !== 201) {
                    throw new Error('Error! Todo not saved')
                }
                setTasks(data.todos);
            })
            .catch((err) => console.log(err));
    }
    const handleUpdateTask = (todo: ITodo): void => {
        updateTask(todo)
            .then(({ status, data }) => {
                if (status !== 200) {
                    throw new Error('Error!Todo not updated');
                }
                setTasks(data.todos);
            })
            .catch((err) => console.log(err));
    }
    const handleDeletedTask = (_id: string): void => {
        deleteTask(_id)
            .then(({ status, data }) => {
                if (status !== 200) {
                    throw new Error('Error !Todo not deleted')
                }
                setTasks(data.todos);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles.container}>
            <h1> Note-it-up?</h1>
            <h2> My Tasks</h2>
            <div className={styles.notes}>
                <div className={styles.filter}>
                    <button className={`${styles.button} ${selected === '' ? styles.selected : ''}`} onClick={() => setSelected('')}>All</button>
                    <button className={`${styles.button} ${selected === 'incomplete' ? styles.selected : ''}`} onClick={() => setSelected('incomplete')}>Incomplete</button>
                    <button className={`${styles.button} ${selected === 'completed' ? styles.selected : ''}`} onClick={() => setSelected('completed')}>Completed</button>

                </div>
                <AddTask saveTask={handleSaveTask} />
                <div>
                    { tasks?.length===0?<>
                         <div className={styles.nothing}>
                             <h2> No tasks yet</h2>
                             <p className={styles.p}> <h3>+</h3> Add Some tasks..................</p>
                         </div>
                    </>:
                    <motion.div layout className={styles.body}>
                        <AnimatePresence>
                            {tasks?.map((task: ITodo) => (
                                <TaskItem
                                    key={task._id}
                                    updateTask={handleUpdateTask}
                                    deleteTask={handleDeletedTask}
                                    todo={task}
                                />
                            ))}
                        </AnimatePresence>

                    </motion.div>}
                </div>
            </div>
        </div>
    );
};

export default Main;