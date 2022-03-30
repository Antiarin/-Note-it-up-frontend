import React from 'react';
import styles from './TaskItem.module.css';
import { motion } from 'framer-motion'

type Props = TodoProps & {
    updateTask: (todo: ITodo) => void
    deleteTask: (_id: string) => void
}

const TaskItem = ({ todo, updateTask, deleteTask }: Props) => {
    const checkTodo: string = todo.status ? `line-through` : ''
    return (
        <motion.div
            initial={{ opacity: 0, y:30 }}
            animate={{ opacity: 1 }}
            whileInView={{opacity:1,y:0}}
            exit={{ opacity: 0 }}
            className={styles.card}>
            <div className={styles.text}>
                <h3 className={checkTodo}>{todo.name}</h3>
                <p className={checkTodo}>{todo.description}</p>
            </div>
            <div className={styles.buttons}>
                <button type="button" onClick={() => updateTask(todo)} className={`${todo.status ? styles.hide : ""} ${styles.complete}`} >Complete</button>
                <button type="button" onClick={() => deleteTask(todo._id)} className={styles.delete}> <span className={styles.minus}>-</span> Delete</button>
            </div>
        </motion.div>
    );
};

export default TaskItem;