import { Recipe } from '../../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../../domain/interfaces/recipe-repository.interface';
import { NotFoundError } from '../../../shared/errors/custom-error';
import { Inject } from '@nestjs/common';
import { RECIPE_REPOSITORY } from '../../../shared/injection-tokens';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

export class UpdateRecipeUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY) private readonly recipeRepository: RecipeRepository,
  ) {
    if (!recipeRepository) {
      throw new Error('RecipeRepository is undefined in UpdateRecipeUseCase');
    }
  }

  async execute(id: string, dto: UpdateRecipeDto): Promise<Recipe> {
    const existingRecipe = await this.recipeRepository.findById(id);
    if (!existingRecipe) {
      throw new NotFoundError(`Recipe with ID ${id} not found`);
    }

    const updatedRecipe = new Recipe(
      id,
      dto.title || existingRecipe.title,
      dto.description || existingRecipe.description,
      dto.ingredients || existingRecipe.ingredients,
      existingRecipe.createdAt,
      new Date(),
    );

    await this.recipeRepository.create(updatedRecipe);
    return updatedRecipe;
  }
}