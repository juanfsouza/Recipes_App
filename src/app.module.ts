import { Module } from '@nestjs/common';
import { RecipeController } from './presentation/controllers/recipe.controller';
import { CreateRecipeUseCase } from './application/use-cases/create-recipe/create-recipe.use-case';
import { ListAllRecipesUseCase } from './application/use-cases/list-all-recipes/list-all-recipes.use-case';
import { GetRecipeByIdUseCase } from './application/use-cases/get-recipe-by-id/get-recipe-by-id.use-case';
import { PrismaRecipeRepository } from './infrastructure/repositories/prisma-recipe.repository';
import { RECIPE_REPOSITORY } from './shared/injection-tokens';
import { PrismaClient } from '@prisma/client';
import { UpdateRecipeUseCase } from './application/use-cases/update-recipe/update-recipe.use-case';
import { DeleteRecipeUseCase } from './application/use-cases/delete-recipe/delete.recipe.use-case';

const prismaClient = new PrismaClient();

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [
    CreateRecipeUseCase,
    ListAllRecipesUseCase,
    GetRecipeByIdUseCase,
    UpdateRecipeUseCase,
    DeleteRecipeUseCase,
    {
      provide: RECIPE_REPOSITORY,
      useClass: PrismaRecipeRepository,
    },
    {
      provide: PrismaClient,
      useValue: prismaClient,
    },
  ],
})
export class AppModule {}