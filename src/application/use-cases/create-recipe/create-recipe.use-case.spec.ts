import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipeUseCase } from './create-recipe.use-case';
import { RECIPE_REPOSITORY } from '../../../shared/injection-tokens';
import { CreateRecipeDto } from './create-recipe.dto';
import { BadRequestError } from '../../../shared/errors/custom-error';
import { Recipe } from '../../../domain/entities/recipe.entity';
import { RecipeRepository } from 'src/domain/interfaces/recipe-repository.interface';

describe('CreateRecipeUseCase', () => {
  let createRecipeUseCase: CreateRecipeUseCase;
  let mockRecipeRepository: jest.Mocked<RecipeRepository>;

  beforeEach(async () => {
    mockRecipeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRecipeUseCase,
        {
          provide: RECIPE_REPOSITORY,
          useValue: mockRecipeRepository,
        },
      ],
    }).compile();

    createRecipeUseCase = module.get<CreateRecipeUseCase>(CreateRecipeUseCase);
  });

  it('should create a recipe successfully', async () => {
    const dto: CreateRecipeDto = {
      title: 'Bolo de Cenoura',
      description: 'Delicioso bolo de cenoura com cobertura',
      ingredients: ['cenoura', 'farinha', 'açúcar'],
    };

    const mockRecipe = new Recipe(
      'uuid-123',
      dto.title,
      dto.description,
      dto.ingredients,
      new Date(),
      new Date(),
    );

    mockRecipeRepository.create.mockResolvedValue(undefined);

    const recipe = await createRecipeUseCase.execute(dto);

    expect(recipe.id).toBeDefined();
    expect(recipe.title).toBe(dto.title);
    expect(recipe.description).toBe(dto.description);
    expect(recipe.ingredients).toEqual(dto.ingredients);
    expect(recipe.createdAt).toBeInstanceOf(Date);
    expect(recipe.updatedAt).toBeInstanceOf(Date);
    expect(mockRecipeRepository.create).toHaveBeenCalledWith(expect.any(Recipe));
  });

  it('should throw BadRequestError if title is missing', async () => {
    const dto: CreateRecipeDto = {
      title: '',
      description: 'Delicioso bolo de cenoura',
      ingredients: ['cenoura', 'farinha', 'açúcar'],
    };

    await expect(createRecipeUseCase.execute(dto)).rejects.toThrow(BadRequestError);
  });

  it('should throw BadRequestError if ingredients are empty', async () => {
    const dto: CreateRecipeDto = {
      title: 'Bolo de Cenoura',
      description: 'Delicioso bolo de cenoura',
      ingredients: [],
    };

    await expect(createRecipeUseCase.execute(dto)).rejects.toThrow(BadRequestError);
  });
});