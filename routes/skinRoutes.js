const express = require('express');
const router = express.Router();
const skinController = require('../controllers/skinController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Skin:
 *       type: object
 *       required:
 *         - name
 *         - champion
 *         - theme
 *         - releaseDate
 *         - price
 *         - rarity
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente
 *         name:
 *           type: string
 *           description: Nome da skin
 *         champion:
 *           type: string
 *           description: Campeão da skin
 *         theme:
 *           type: string
 *           description: Tema da skin
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Data de lançamento da skin
 *         price:
 *           type: number
 *           description: Preço da skin
 *         rarity:
 *           type: string
 *           description: Raridade da skin
 *       example:
 *         id: d5fE_asz
 *         name: Akali True Damage
 *         champion: Akali
 *         theme: True Damage
 *         releaseDate: 2019-11-10T00:00:00.000Z
 *         price: 1350
 *         rarity: legendary
 */

/**
 * @swagger
 * /skins/search:
 *   get:
 *     summary: Busca skins com base em critérios dinâmicos
 *     description: Retorna uma lista de skins que correspondem aos critérios de busca fornecidos
 *     parameters:
 *       - in: query
 *         name: field
 *         schema:
 *           type: string
 *         required: true
 *         description: O campo pelo qual buscar
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         required: false
 *         description: O valor a ser buscado (para campos de string)
 *       - in: query
 *         name: min
 *         schema:
 *           type: string
 *         required: false
 *         description: O valor mínimo para busca (para campos numéricos ou data)
 *       - in: query
 *         name: max
 *         schema:
 *           type: string
 *         required: false
 *         description: O valor máximo para busca (para campos numéricos ou data)
 *     responses:
 *       200:
 *         description: Lista de skins que correspondem aos critérios de busca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skin'
 *       400:
 *         description: Parâmetros de busca inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/search', skinController.searchSkins);
// rotas /search devem ser escritas antes de rotas /:id, que esperam um parâmetro de ID


/**
 * @swagger
 * /skins:
 *   get:
 *     summary: Retorna todas as skins
 *     tags: [Skins]
 *     responses:
 *       200:
 *         description: Lista de todas as skins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skin'
 */
router.get('/', skinController.getAllSkins);

/**
 * @swagger
 * /skin/{id}:
 *   get:
 *     summary: Retorna uma skin pelo ID
 *     tags: [Skins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da skin
 *     responses:
 *       200:
 *         description: Skin encontrada pelo ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skin'
 *       404:
 *         description: Skin não encontrada
 */
router.get('/:id', skinController.getSkinById);

/**
 * @swagger
 * /skin:
 *   post:
 *     summary: Adiciona uma nova skin
 *     tags: [Skins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skin'
 *     responses:
 *       201:
 *         description: Skin adicionada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skin'
 *       500:
 *         description: Erro no servidor
 */
router.post('/', skinController.addSkin);

/**
 * @swagger
 * /skin/{id}:
 *   put:
 *     summary: Atualiza uma skin existente
 *     tags: [Skins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da skin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skin'
 *     responses:
 *       200:
 *         description: Skin atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skin'
 *       404:
 *         description: Skin não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.put('/:id', skinController.updateSkin);

/**
 * @swagger
 * /skin/{id}:
 *   delete:
 *     summary: Deleta uma skin existente
 *     tags: [Skins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da skin
 *     responses:
 *       200:
 *         description: Skin deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skin'
 *       404:
 *         description: Skin não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', skinController.deleteSkin);



module.exports = router;
