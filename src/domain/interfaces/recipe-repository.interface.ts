import { Recipe } from '../entities/recipe.entity';

export interface RecipeRepository {
  create(recipe: Recipe): Promise<void>;
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe | null>;
  update(id: string, recipe: Recipe): Promise<void>;
  delete(id: string): Promise<void>;
}