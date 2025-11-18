import { GoogleGenAI, Modality } from "https://aistudiocdn.com/@google/genai@^1.30.0";

// --- CONFIGURATION & CONSTANTS ---

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  displayError("API_KEY is not set. Please ensure your environment variables are configured correctly.");
  throw new Error("API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const BASE_PROMPT = "Take the user-provided family photo (ensure there are at least two people) and transform it into a photorealistic 'Tet golden moment' that looks like a real-life photograph. It is critical to maintain the exact facial features of the family members from the original photo, though their expressions can change to match the happy context. Enhance their clothing to be festive and appropriate for Vietnamese Tet (like modern 'Áo Dài'). The overall style should be heartwarming, realistic, and full of festive spirit. Do not change the people's faces, bodies, or ethnicity; only enhance their clothes and the background scene.";

const createFinalPrompt = (themePrompt, textOverlay) => {
  return `${BASE_PROMPT} ${themePrompt} The final image MUST include the Vietnamese text "${textOverlay}" beautifully and artistically integrated into the scene. To ensure perfect rendering of all Vietnamese characters and accents, please use a clear, Unicode-compliant font like 'Noto Sans' or 'Arial'. The text should complement the festive atmosphere. The scene must also naturally include a can or bottle of Pepsi. The Pepsi logo should also be subtly visible somewhere in the scene, for example on the product, a calendar, or a poster.`;
};

const LUCKY_LETTER_OPTIONS = [
  { value: 'T', label: 'T - Thêm nữa đi con', description: 'A cozy family meal', textOverlay: 'Thêm nữa đi con', getPrompt: () => createFinalPrompt("The theme is a cozy, happy family meal during Tet. The scene should show the family gathered around a table laden with traditional Tet holiday food like 'bánh chưng', 'giò', and 'dưa hành'. Everyone should look joyful and engaged in the meal.", 'Thêm nữa đi con') },
  { value: 'B', label: 'B - Bên nồi bánh chưng', description: 'Cooking Banh Chung together', textOverlay: 'Bên nồi bánh chưng', getPrompt: () => createFinalPrompt("The theme is the family having fun cooking 'Bánh chưng' together. Place the family outdoors or in a traditional kitchen setting around a large, simmering pot. Show them laughing and working together, with stacks of 'lá dong' (phrynium leaves) and other ingredients nearby. The atmosphere should be warm and communal.", 'Bên nồi bánh chưng') },
  { value: 'D', label: 'Đ - Được chiều như vong', description: 'A moment of happy affection', textOverlay: 'Được chiều như vong', getPrompt: () => createFinalPrompt("The theme is pure happiness and affection. Depict a parent (mother or father) playfully carrying their child (son or daughter) on their shoulders or lifting them up joyfully in their arms. Their expressions should be full of laughter and love. The background should be a beautiful Tet setting with peach blossoms.", 'Được chiều như vong') },
  { value: 'P', label: 'P - Phá mẹ là chính', description: 'A fun prank with mom', textOverlay: 'Phá mẹ là chính', getPrompt: () => createFinalPrompt("The theme is a lighthearted, playful moment between a son and his mother. Show the son playfully riding a broomstick like a hobby horse, pretending to be a wizard or knight, and playing a fun, harmless prank on his mom. His mother should be reacting with amusement and laughter. The scene should be funny, appropriate, and heartwarming, set within a home decorated for Tet.", 'Phá mẹ là chính') },
  { value: 'C', label: 'C - Chụp hình gia đình', description: 'A classic 90s family photo', textOverlay: 'Chụp hình gia đình', getPrompt: () => createFinalPrompt("The theme is a classic, traditional Vietnamese family picture from the 1990s. The family should be posed formally but happily. The background should be a typical 90s studio backdrop, perhaps with a painted landscape or ornate furniture. The image style should have a slightly vintage, nostalgic film feel with warm color tones.", 'Chụp hình gia đình') },
  { value: 'S', label: 'S - Song kiếm hợp bích', description: 'Mother and child cooking', textOverlay: 'Song kiếm hợp bích', getPrompt: () => createFinalPrompt("The theme is a mother and her son/daughter preparing a Tet meal together, symbolizing teamwork ('Song kiếm hợp bích'). Show them in the kitchen, happily collaborating on a dish. One could be chopping vegetables while the other stirs a pot. The atmosphere should be one of bonding and shared tradition.", 'Song kiếm hợp bích') },
];

// --- DOM ELEMENT REFERENCES ---

const uploader = document.getElementById('image-uploader');
const imagePreview = document.getElementById('image-preview');
const imagePreviewPlaceholder = document.getElementById('image-preview-placeholder');
const letterSelector = document.getElementById('lucky-letter-selector');
const letterDescriptionLabel = document.getElementById('letter-description-label');
const letterDescriptionText = document.getElementById('letter-description-text');
const generateButton = document.getElementById('generate-button');
const buttonText = document.getElementById('button-text');
const buttonSpinner = document.getElementById('button-spinner');
const buttonLoadingText = document.getElementById('button-loading-text');
const errorMessageContainer = document.getElementById('error-message');
const imageDisplayPlaceholder = document.getElementById('image-display-placeholder');
const imageDisplayLoading = document.getElementById('image-display-loading');
const generatedImage = document.getElementById('generated-image');
const formElements = [uploader, letterSelector, generateButton];

// --- APPLICATION STATE ---

let appState = {
  uploadedImage: null, // { file, base64, mimeType }
  isLoading: false,
};

// --- GEMINI API SERVICE ---

async function generateTetImage(prompt, imageBase64, mimeType) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { data: imageBase64, mimeType: mimeType } },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    return null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the image generation service.");
  }
}

// --- UI UPDATE FUNCTIONS ---

function displayError(message) {
  errorMessageContainer.textContent = `Error: ${message}`;
  errorMessageContainer.classList.remove('hidden');
}

function clearError() {
  errorMessageContainer.classList.add('hidden');
}

function updateLetterDescription() {
  const selectedValue = letterSelector.value;
  const selectedOption = LUCKY_LETTER_OPTIONS.find(opt => opt.value === selectedValue);
  if (selectedOption) {
    letterDescriptionLabel.textContent = selectedOption.label;
    letterDescriptionText.textContent = selectedOption.description;
  }
}

function setLoadingState(isLoading) {
  appState.isLoading = isLoading;
  
  // Update button state
  buttonText.classList.toggle('hidden', isLoading);
  buttonSpinner.classList.toggle('hidden', !isLoading);
  buttonLoadingText.classList.toggle('hidden', !isLoading);

  // Update image display state
  imageDisplayPlaceholder.classList.add('hidden');
  generatedImage.classList.add('hidden');
  imageDisplayLoading.classList.toggle('hidden', !isLoading);
  
  // Disable form elements
  formElements.forEach(el => el.disabled = isLoading);

  // Re-enable generate button only if an image is uploaded
  if (!isLoading && appState.uploadedImage) {
      generateButton.disabled = false;
  }
}

// --- EVENT HANDLERS ---

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  clearError();

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    displayError('Please upload a JPG or PNG image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result.toString().split(',')[1] || '';
    appState.uploadedImage = { file, base64, mimeType: file.type };
    
    imagePreview.src = URL.createObjectURL(file);
    imagePreview.classList.remove('hidden');
    imagePreviewPlaceholder.classList.add('hidden');
    
    generateButton.disabled = false;
    // Clear previous generation
    generatedImage.src = '';
    generatedImage.classList.add('hidden');
    imageDisplayPlaceholder.classList.remove('hidden');
  };
  reader.onerror = () => {
    displayError('Could not read the image file.');
  };
  reader.readAsDataURL(file);
}

async function handleGenerateClick() {
  if (!appState.uploadedImage) {
    displayError('Please upload a family photo first!');
    return;
  }

  setLoadingState(true);
  clearError();

  const selectedOption = LUCKY_LETTER_OPTIONS.find(opt => opt.value === letterSelector.value);
  if (!selectedOption) {
    displayError('Invalid lucky letter selected.');
    setLoadingState(false);
    return;
  }

  try {
    const prompt = selectedOption.getPrompt();
    const resultBase64 = await generateTetImage(prompt, appState.uploadedImage.base64, appState.uploadedImage.mimeType);
    
    if (resultBase64) {
      generatedImage.src = `data:image/png;base64,${resultBase64}`;
      generatedImage.classList.remove('hidden');
      imageDisplayLoading.classList.add('hidden');
    } else {
      displayError('Failed to generate image. The API did not return image data.');
      imageDisplayPlaceholder.classList.remove('hidden');
    }
  } catch (err) {
    console.error('Error during image generation:', err);
    displayError(err.message || 'An unknown error occurred.');
    imageDisplayPlaceholder.classList.remove('hidden');
  } finally {
    setLoadingState(false);
  }
}


// --- INITIALIZATION ---

function initialize() {
  // Populate selector
  LUCKY_LETTER_OPTIONS.forEach(option => {
    const optElement = document.createElement('option');
    optElement.value = option.value;
    optElement.textContent = option.label;
    optElement.className = "bg-[#001f40] text-white";
    letterSelector.appendChild(optElement);
  });
  
  // Set initial description
  updateLetterDescription();

  // Attach event listeners
  uploader.addEventListener('change', handleImageUpload);
  letterSelector.addEventListener('change', updateLetterDescription);
  generateButton.addEventListener('click', handleGenerateClick);
}

// Start the application
initialize();
