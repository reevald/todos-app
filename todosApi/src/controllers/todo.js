const { todo } = require("../../models");
const Joi = require("Joi");

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const dataAllTodos = await todo.findAll({
      attributes: ["id", "title", "label", "priority", "status"]
    });

    res.status(200).send({
      status: "success",
      data: {
        todos: dataAllTodos
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error"
    });
  }
}

// Get todo by id
exports.getDetailTodo = async (req, res) => {
  const { todoId } = req.params;
  try {
    const dataTodo = await todo.findOne({
      where: { id: todoId },
      attributes: ["id", "title", "label", "priority", "status"]
    });

    if (!dataTodo) return res.status(400).send({
      status: "failed",
      message: "credential is invalid"
    });

    res.status(200).send({
      status: "success",
      data: {
        todo: dataTodo
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error"
    });
  }
}

// Create todo
exports.createTodo = async (req, res) => {
  // our validation
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    label: Joi.string().min(2).max(200).required(),
    priority: Joi.string().min(3).max(200).required()
  });
  console.log("body", req.body);

  // do validation
  const { error } = schema.validate(req.body);

  // if error send validation error message
  if (error) return res.status(400).send({
    status: "failed",
    message: error.details[0].message
  });

  try {
    const newTodo = await todo.create({
      title: req.body.title.trim(),
      label: req.body.label,
      priority: req.body.priority,
      status: "pending"
    });

    if (!newTodo) return res.status(500).send({
      status: "failed",
      message: "server error"
    });

    res.status(200).send({
      status: "success",
      message: "successfully added one todo"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error"
    });
  }
}

// Update todo
exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;

  if (Object.keys(req.body).length === 0) return res.status(400).send({
    status: "failed",
    message: "credential is invalid"
  });

  // First check todo id
  const checkTodo = await todo.findOne({
    where: { id: todoId }
  });

  if (!checkTodo) return res.status(400).send({
    status: "failed",
    message: "credential is invalid"
  });

  // Our validation
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200),
    label: Joi.string().min(2).max(200),
    priority: Joi.string().min(3).max(200),
    status: Joi.string().min(2).max(200)
  });

  // Do validation
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send({
    error: {
      message: error.details[0].message
    }
  });

  // Do update data todo
  try {
    await todo.update(
      req.body,
      {
        where: {
          id: todoId
        }
      }
    );

    res.status(200).send({
      status: "success",
      message: "successfully update todo"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error"
    });
  }
}

// Delet todo
exports.deleteTodo = async (req, res) => {
  const {todoId} = req.params;

  // First check todo id
  const checkTodo = await todo.findOne({
    where: { id: todoId }
  });

  if (!checkTodo) return res.status(400).send({
    status: "failed",
    message: "credential is invalid"
  });

  await todo.destroy({
    where: {id: todoId}
  });

  res.status(200).send({
    status: "success",
    message: "successfully delete todo"
  });
}