export function getMoodFromText(text) {
  if (text.includes('happy') || text.includes('fun')) return { mood: 'happy', emoji: '😊' };
  if (text.includes('sad') || text.includes('tired')) return { mood: 'sad', emoji: '😔' };
  return { mood: 'neutral', emoji: '😐' };
}