export function formatString(input) {
    // Reemplazar acentos y caracteres especiales
    const withAccent = "áéíóúüñÁÉÍÓÚÜÑ";
    const withoutAccent = "aeiouunAEIOUUÑ";
    const accentRegex = new RegExp(`[${withAccent}]`, 'g');
    const accentMap = {};
    for (let i = 0; i < withAccent.length; i++) {
      accentMap[withAccent.charAt(i)] = withoutAccent.charAt(i);
    }
  
    // Convertir a minúsculas y quitar acentos
    const formattedInput = input
      .toLowerCase()
      .replace(accentRegex, (match) => accentMap[match] || match)
      .replace(/ /g, "-");
  
    return formattedInput;
  }
