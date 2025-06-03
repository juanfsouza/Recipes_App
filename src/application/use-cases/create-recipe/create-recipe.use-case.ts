import { Recipe } from '../../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../../domain/interfaces/recipe-repository.interface';
import { CreateRecipeDto } from './create-recipe.dto';
import { BadRequestError } from '../../../shared/errors/custom-error';
import { v4 as uuidv4 } from 'uuid';
import { Inject } from '@nestjs/common';
import { RECIPE_REPOSITORY } from '../../../shared/injection-tokens';

export class CreateRecipeUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY) private readonly recipeRepository: RecipeRepository,
  ) {
    if (!recipeRepository) {
      throw new Error('RecipeRepository is undefined in CreateRecipeUseCase');
    }
  }

  async execute(dto: CreateRecipeDto): Promise<Recipe> {
    if (!dto.title || !dto.description || !dto.ingredients?.length) {
      throw new BadRequestError('All fields are required');
    }

    const recipe = new Recipe(
      uuidv4(),
      dto.title,
      dto.description,
      dto.ingredients,
      new Date(),
      new Date(),
    );

    await this.recipeRepository.create(recipe);
    return recipe;
  }
}