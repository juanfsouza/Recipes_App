import { Recipe } from '../../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../../domain/interfaces/recipe-repository.interface';
import { Inject } from '@nestjs/common';
import { RECIPE_REPOSITORY } from '../../../shared/injection-tokens';

export class ListAllRecipesUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY) private readonly recipeRepository: RecipeRepository,
  ) {
    if (!recipeRepository) {
      throw new Error('RecipeRepository is undefined in ListAllRecipesUseCase');
    }
  }

  async execute(): Promise<Recipe[]> {
    return this.recipeRepository.findAll();
  }
}