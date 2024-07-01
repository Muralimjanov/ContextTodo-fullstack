import TodoModel from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { text, userId } = req.body;
    const todo = new TodoModel({
      text,
      owner: userId,
      completed: false,
      important: false,
    });
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.log(err);
  }
};

export const getTodo = async (req, res) => {
  try {
    const { userId } = req.query;
    const todo = await TodoModel.find({ owner: userId });
    res.json(todo);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findOneAndDelete({ _id: req.params.id });
    res.json({
      message: "Successfully deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

export const completed = async (req, res) => {
  try {
    const todo = await TodoModel.findOne({ _id: req.params.id });
    todo.completed=!todo.completed
    await todo.save()
    res.json(todo)
  } catch (err) {
    console.log(err);
  }
};
export const important = async (req, res) => {
  try {
    const todo = await TodoModel.findOne({ _id: req.params.id });
    todo.important=!todo.important
    await todo.save()
    res.json(todo)
  } catch (err) {
    console.log(err);
  }
};
