import React, { useState } from 'react';
import styles from './AddTask.module.css';

interface Props {
    saveTask: (e: React.FormEvent, formData: ITodo | any) => void
}

const AddTask = ({ saveTask }: Props) => {
    const [formData, setFormData] = useState<ITodo | {}>();
    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData, [e.currentTarget.name]: e.currentTarget.value, 
        })
    }

    return (
        <>
            <form className={styles.form} onSubmit={(e) => saveTask(e, formData)}>
                <div className={styles.taskname}>
                    <label className={styles.label} htmlFor='name'>Name</label>
                    <input onChange={handleForm} type="text" className={styles.input} name="name" placeholder="add task name" />
                </div>
                <div className={styles.taskdescriptions}>
                    <label className={styles.label}htmlFor='name'>Description</label>
                    <input onChange={handleForm} type="text" className={styles.input} name="description" placeholder="add task description" />
                </div>
                <button type="submit" className={styles.button} > <span className={styles.plus}>+</span> Add</button>

            </form>

        </>
    );
};

export default AddTask;