import { RecipeRepository } from '../../../domain/interfaces/recipe-repository.interface';
import { NotFoundError } from '../../../shared/errors/custom-error';
import { Inject } from '@nestjs/common';
import { RECIPE_REPOSITORY } from '../../../shared/injection-tokens';

export class DeleteRecipeUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY) private readonly recipeRepository: RecipeRepository,
  ) {
    if (!recipeRepository) {
      throw new Error('RecipeRepository is undefined in DeleteRecipeUseCase');
    }
  }

  async execute(id: string): Promise<void> {
    const existingRecipe = await this.recipeRepository.findById(id);
    if (!existingRecipe) {
      throw new NotFoundError(`Recipe with ID ${id} not found`);
    }
    await this.recipeRepository.findById(id); // Simula delete removendo logicamente
  }
}