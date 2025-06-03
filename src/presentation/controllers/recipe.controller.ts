import { Controller, Get, Post, Body, Param, Put, Delete, HttpException } from '@nestjs/common';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe/create-recipe.use-case';
import { ListAllRecipesUseCase } from '../../application/use-cases/list-all-recipes/list-all-recipes.use-case';
import { GetRecipeByIdUseCase } from '../../application/use-cases/get-recipe-by-id/get-recipe-by-id.use-case';
import { RecipePresenter } from '../presenters/recipe.presenter';
import { CreateRecipeDto } from '../../application/use-cases/create-recipe/create-recipe.dto';
import { UpdateRecipeUseCase } from '../../application/use-cases/update-recipe/update-recipe.use-case';
import { DeleteRecipeUseCase } from 'src/application/use-cases/delete-recipe/delete.recipe.use-case';
import { UpdateRecipeDto } from 'src/application/use-cases/update-recipe/dto/update-recipe.dto';
import { CustomError } from '../../shared/errors/custom-error';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly listAllRecipesUseCase: ListAllRecipesUseCase,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase,
    private readonly updateRecipeUseCase: UpdateRecipeUseCase,
    private readonly deleteRecipeUseCase: DeleteRecipeUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateRecipeDto) {
    try {
      const recipe = await this.createRecipeUseCase.execute(body);
      return RecipePresenter.toHTTP(recipe);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  @Get()
  async findAll() {
    try {
      const recipes = await this.listAllRecipesUseCase.execute();
      return RecipePresenter.toHTTPList(recipes);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const recipe = await this.getRecipeByIdUseCase.execute(id);
      return RecipePresenter.toHTTP(recipe);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateRecipeDto) {
    try {
      const recipe = await this.updateRecipeUseCase.execute(id, body);
      return RecipePresenter.toHTTP(recipe);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.deleteRecipeUseCase.execute(id);
      return { message: `Recipe with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException('Internal server error', 500);
    }
  }
}