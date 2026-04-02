import { Category } from "../models/Category.js";

const categoryToResponse = (category) => ({
  id: category.code,
  code: category.code,
  name: category.name,
});

export async function listCategories(_request, response, next) {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();
    response.json(categories.map(categoryToResponse));
  } catch (error) {
    next(error);
  }
}

export async function getCategoryByCode(request, response, next) {
  try {
    const { code } = request.params;
    const category = await Category.findOne({ code }).lean();

    if (!category) {
      response.status(404);
      throw new Error("Category not found.");
    }

    response.json(categoryToResponse(category));
  } catch (error) {
    next(error);
  }
}

export async function createCategory(request, response, next) {
  try {
    const { code, name } = request.body;

    if (!code || !name) {
      response.status(400);
      throw new Error("code and name are required.");
    }

    const category = await Category.create({
      code,
      name,
    });

    response.status(201).json(categoryToResponse(category));
  } catch (error) {
    next(error);
  }
}
