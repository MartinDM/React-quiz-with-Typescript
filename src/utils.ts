export const randomise = (array: any[]) => 
  [...array].sort( () => Math.random() - 0.5 );

