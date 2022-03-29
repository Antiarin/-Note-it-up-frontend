import React from 'react';
import styles from './TaskItem.module.css';
import { motion } from 'framer-motion'

type Props = TodoProps & {
    updateTask: (todo: ITodo) => void
    deleteTask: (_id: string) => void
}

const TaskItem = ({ todo, updateTask, deleteTask }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.card}>
            <div className={styles.text}>
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>
            </div>
            <div className={styles.buttons}>
                <button type="button" onClick={() => updateTask(todo)} className={`${todo.status ? styles.hide : ""} ${styles.complete}`} >Complete</button>
                <button type="button" onClick={() => deleteTask(todo._id)} className={styles.delete}> <span className={styles.minus}>-</span> Delete</button>
            </div>
        </motion.div>
    );
};

export default TaskItem;