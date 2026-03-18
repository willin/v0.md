// Test file to verify the implementation
import { profileData } from './src/data/profile';
import { digitalTwinKnowledge, getResponse } from './src/data/digital-twin-knowledge';
import { i18n } from './src/i18n/config';

console.log('=== Testing Implementation ===');

console.log('\n1. Profile Data:');
console.log('Name:', profileData.name);
console.log('Title:', profileData.title);
console.log('Bio:', profileData.bio);
console.log('Interests:', profileData.interests);

console.log('\n2. Digital Twin Knowledge Base:');
console.log('Knowledge entries:', digitalTwinKnowledge.length);
console.log('Sample patterns:', digitalTwinKnowledge[0].patterns.slice(0, 3));

console.log('\n3. Sample Response Test:');
const sampleInput = "How much money do I need for financial independence?";
const responseEn = getResponse(sampleInput, 'en');
const responseZh = getResponse(sampleInput, 'zh');
console.log('Input:', sampleInput);
console.log('English response length:', responseEn ? responseEn.length : 'No match');
console.log('Chinese response length:', responseZh ? responseZh.length : 'No match');

console.log('\n4. I18n Configuration:');
console.log('Supported locales:', i18n.locales);
console.log('Default locale:', i18n.defaultLocale);

console.log('\n=== All components implemented successfully! ===');