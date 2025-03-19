/**
 * Utilitário para gerenciar caminhos de imagens no aplicativo
 * Centraliza a lógica de formatação de caminhos de imagem para evitar duplicidade
 */

/**
 * Formata o caminho da imagem para usar apenas a pasta assets/images
 * @param {string} imageUrl - O caminho relativo da imagem
 * @returns {string} - O caminho formatado para a imagem
 */
export function formatImagePath(imageUrl) {
  // Remove any leading slashes or 'images/' prefix
  const cleanPath = imageUrl.replace(/^\/+|^images\//g, '');
  
  // Use the correct path for Vite assets
  return `/src/assets/images/${cleanPath}`;
}