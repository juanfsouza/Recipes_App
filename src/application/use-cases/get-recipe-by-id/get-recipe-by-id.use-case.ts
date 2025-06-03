import { Recipe } from '../../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../../domain/interfaces/recipe-repository.interface';
import { NotFoundError } from '../../../shared/errors/custom-error';
import { Inject } from '@nestjs/common';
import { RECIPE_REPOSITORY } from '../../../shared/injection-tokens';

export class GetRecipeByIdUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY) private readonly recipeRepository: RecipeRepository,
  ) {
    if (!recipeRepository) {
      throw new Error('RecipeRepository is undefined in GetRecipeByIdUseCase');
    }
  }

  async execute(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      throw new NotFoundError(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }
}