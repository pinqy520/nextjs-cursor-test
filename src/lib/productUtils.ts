export const productUtils = {
  parseTags: (tagsJson: string): string[] => {
    try {
      return JSON.parse(tagsJson);
    } catch {
      return [];
    }
  },

  stringifyTags: (tags: string[]): string => {
    return JSON.stringify(tags);
  },

  parseSupplementalDocs: (docsJson: string): string[] => {
    try {
      return JSON.parse(docsJson);
    } catch {
      return [];
    }
  }
}; 