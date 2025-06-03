export class Recipe {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly ingredients: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id) throw new Error('Recipe ID is required');
    if (!this.title) throw new Error('Recipe title is required');
    if (!this.description) throw new Error('Recipe description is required');
    if (!Array.isArray(this.ingredients) || this.ingredients.length === 0) {
      throw new Error('Recipe must have at least one ingredient');
    }
  }
}