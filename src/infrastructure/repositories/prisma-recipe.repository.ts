import { Recipe } from '../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../domain/interfaces/recipe-repository.interface';
import { PrismaClient } from '@prisma/client';
import { Inject } from '@nestjs/common';

export class PrismaRecipeRepository implements RecipeRepository {
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {
    if (!this.prisma) {
      throw new Error('PrismaClient is undefined in PrismaRecipeRepository');
    }
  }

  async create(recipe: Recipe): Promise<void> {
    await this.prisma.recipe.create({
      data: {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      },
    });
  }

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.prisma.recipe.findMany();
    return recipes.map(
      (r) =>
        new Recipe(r.id, r.title, r.description, r.ingredients, r.createdAt, r.updatedAt),
    );
  }

  async findById(id: string): Promise<Recipe | null> {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });
    if (!recipe) return null;
    return new Recipe(
      recipe.id,
      recipe.title,
      recipe.description,
      recipe.ingredients,
      recipe.createdAt,
      recipe.updatedAt,
    );
  }

  async update(id: string, recipe: Recipe): Promise<void> {
    await this.prisma.recipe.update({
      where: { id },
      data: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        updatedAt: recipe.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.recipe.delete({ where: { id } });
  }
}