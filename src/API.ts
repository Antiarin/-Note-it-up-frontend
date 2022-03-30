import axios, { AxiosResponse } from 'axios'
const baseUrl: string = 'https://note-it-up-backend.herokuapp.com'

export const getTasks = async (status=""): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const url= baseUrl + '/tasks' + (status?`/${status}`:"")
    console.log(url)
    const tasks: AxiosResponse<ApiDataType> = await axios.get(
     url
    )
    return tasks
  } catch (error) {
    throw error
  }
}

export const addTask = async (
  formData: ITodo): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const task: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: false,
       }
       console.log(task)
    const saveTask: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-task',
      task
    )
    return saveTask
  } catch (error) {
    throw error
  }
}

export const updateTask = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const taskUpdate: Pick<ITodo, 'status'> = {
      status: true,
    }
    const updatedTask: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-task/${todo._id}`,
      taskUpdate
    )
    return updatedTask
  } catch (error) {
    throw error
  }
}

export const deleteTask = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTask: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-task/${_id}`
    )
    return deletedTask
  } catch (error) {
    throw error
  }
}

