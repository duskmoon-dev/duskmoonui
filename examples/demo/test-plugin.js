import duskmoonui from '../../packages/core/dist/index.js';

console.log('DuskMoonUI Plugin loaded successfully!');
console.log('Plugin:', typeof duskmoonui);
console.log('Themes:', duskmoonui.themes);

// Test theme generation
const plugin = duskmoonui({
  themes: ['sunshine', 'moonlight'],
  darkTheme: 'moonlight',
});

console.log('\nPlugin configured successfully!');
console.log('Plugin function:', typeof plugin);
