import type { LetterOption } from './types';

const BASE_PROMPT = "Take the user-provided family photo (ensure there are at least two people) and transform it into a photorealistic 'Tet golden moment' that looks like a real-life photograph. It is critical to maintain the exact facial features of the family members from the original photo, though their expressions can change to match the happy context. Enhance their clothing to be festive and appropriate for Vietnamese Tet (like modern 'Áo Dài'). The overall style should be heartwarming, realistic, and full of festive spirit. Do not change the people's faces, bodies, or ethnicity; only enhance their clothes and the background scene.";

const createFinalPrompt = (themePrompt: string, textOverlay: string): string => {
  return `${BASE_PROMPT} ${themePrompt} The final image MUST include the Vietnamese text "${textOverlay}" beautifully and artistically integrated into the scene. It's crucial to use a font that correctly displays all Vietnamese characters and accents (e.g., a clear, elegant script or sans-serif font). The text should complement the festive atmosphere. The scene must also naturally include a can or bottle of Pepsi. The Pepsi logo should also be subtly visible somewhere in the scene, for example on the product, a calendar, or a poster.`;
};

export const LUCKY_LETTER_OPTIONS: LetterOption[] = [
  {
    value: 'T',
    label: 'T - Thêm nữa đi con',
    description: 'A cozy family meal',
    textOverlay: 'Thêm nữa đi con',
    getPrompt: () => createFinalPrompt(
      "The theme is a cozy, happy family meal during Tet. The scene should show the family gathered around a table laden with traditional Tet holiday food like 'bánh chưng', 'giò', and 'dưa hành'. Everyone should look joyful and engaged in the meal.",
      'Thêm nữa đi con'
    ),
  },
  {
    value: 'B',
    label: 'B - Bên nồi bánh chưng',
    description: 'Cooking Banh Chung together',
    textOverlay: 'Bên nồi bánh chưng',
    getPrompt: () => createFinalPrompt(
      "The theme is the family having fun cooking 'Bánh chưng' together. Place the family outdoors or in a traditional kitchen setting around a large, simmering pot. Show them laughing and working together, with stacks of 'lá dong' (phrynium leaves) and other ingredients nearby. The atmosphere should be warm and communal.",
      'Bên nồi bánh chưng'
    ),
  },
  {
    value: 'D',
    label: 'Đ - Được chiều như vong',
    description: 'A moment of happy affection',
    textOverlay: 'Được chiều như vong',
    getPrompt: () => createFinalPrompt(
      "The theme is pure happiness and affection. Depict a parent (mother or father) playfully carrying their child (son or daughter) on their shoulders or lifting them up joyfully in their arms. Their expressions should be full of laughter and love. The background should be a beautiful Tet setting with peach blossoms.",
      'Được chiều như vong'
    ),
  },
  {
    value: 'P',
    label: 'P - Phá mẹ là chính',
    description: 'A fun prank with mom',
    textOverlay: 'Phá mẹ là chính',
    getPrompt: () => createFinalPrompt(
      "The theme is a lighthearted, playful moment between a son and his mother. Show the son playfully riding a broomstick like a hobby horse, pretending to be a wizard or knight, and playing a fun, harmless prank on his mom. His mother should be reacting with amusement and laughter. The scene should be funny, appropriate, and heartwarming, set within a home decorated for Tet.",
      'Phá mẹ là chính'
    ),
  },
  {
    value: 'C',
    label: 'C - Chụp hình gia đình',
    description: 'A classic 90s family photo',
    textOverlay: 'Chụp hình gia đình',
    getPrompt: () => createFinalPrompt(
      "The theme is a classic, traditional Vietnamese family picture from the 1990s. The family should be posed formally but happily. The background should be a typical 90s studio backdrop, perhaps with a painted landscape or ornate furniture. The image style should have a slightly vintage, nostalgic film feel with warm color tones.",
      'Chụp hình gia đình'
    ),
  },
  {
    value: 'S',
    label: 'S - Song kiếm hợp bích',
    description: 'Mother and child cooking',
    textOverlay: 'Song kiếm hợp bích',
    getPrompt: () => createFinalPrompt(
      "The theme is a mother and her son/daughter preparing a Tet meal together, symbolizing teamwork ('Song kiếm hợp bích'). Show them in the kitchen, happily collaborating on a dish. One could be chopping vegetables while the other stirs a pot. The atmosphere should be one of bonding and shared tradition.",
      'Song kiếm hợp bích'
    ),
  },
];