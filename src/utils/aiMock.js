export function generateSummary(entries) {
  if (!entries.length) return 'No entries yet!';
  return `This week you added ${entries.length} memories.`;
}