
/**
 * Utility functions for language detection and code editor
 */

/**
 * Get the language for Monaco Editor based on file extension
 */
export function getLanguageFromFilename(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  switch (extension) {
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'javascript';
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'typescript';
    case 'json':
      return 'json';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'md':
      return 'markdown';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'py':
      return 'python';
    default:
      return 'plaintext';
  }
}

/**
 * Get file icon class based on file extension
 */
export function getFileIconClass(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'text-yellow-400';
    case 'ts':
    case 'tsx':
      return 'text-blue-400';
    case 'json':
      return 'text-green-400';
    case 'html':
      return 'text-orange-400';
    case 'css':
    case 'scss':
      return 'text-purple-400';
    case 'md':
      return 'text-gray-400';
    default:
      return 'text-gray-400';
  }
}
