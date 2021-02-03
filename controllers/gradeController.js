import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { Grade } from '../models/Grade.js'

const create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para criacao vazio',
    });
  }

  try {
    logger.info(`POST /grade - ${JSON.stringify(req.body)}`);
    const gradeParams = {
      ...req.body,
      lastModified: new Date().toISOString()
    }
    const grade = await Grade.create(gradeParams)
    res.send({ message: 'Grade inserido com sucesso' });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    logger.info(`GET /grade`);
    const grades = await Grade.find(condition)
    res.send(grades)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`GET /grade - ${id}`);
    const grade = await Grade.findById(id)
    res.send(grade)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;
  const {name, subject, type, value} = req.body

  try {
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    const grade = await Grade.findById(id)
    if (name) grade.name = name
    if (subject) grade.subject = subject
    if (type) grade.type = type
    if (value) grade.value = value
    await grade.save()
    res.send(grade)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`DELETE /grade - ${id}`);
    const {deletedCount} = await Grade.remove({_id: id})
    if (deletedCount === 1) {
      res.status(200).end()
    } else {
      logger.error(`DELETE /grade - Could not delete grade '${id}'`)
      res.status(418).end() // I'm a teapot
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    logger.info(`DELETE /grade`);
    await Grade.remove()
    res.send(200).end()
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
