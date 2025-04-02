// Array of adjectives and nouns for codename generation
const adjectives = [
    "Silent",
    "Phantom",
    "Shadow",
    "Stealth",
    "Covert",
    "Midnight",
    "Rogue",
    "Ghost",
    "Enigma",
    "Mystic",
    "Crimson",
    "Obsidian",
    "Onyx",
    "Sapphire",
    "Emerald",
    "Diamond",
    "Golden",
    "Silver",
    "Iron",
    "Steel",
    "Titanium",
  ]
  
  const nouns = [
    "Hawk",
    "Eagle",
    "Falcon",
    "Raven",
    "Wolf",
    "Fox",
    "Panther",
    "Tiger",
    "Lion",
    "Cobra",
    "Viper",
    "Dragon",
    "Phoenix",
    "Griffin",
    "Hydra",
    "Kraken",
    "Specter",
    "Wraith",
    "Sentinel",
    "Guardian",
    "Warden",
  ]
  
  // Generate a random codename
  export const generateCodename = () => {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    return `The ${adjective} ${noun}`
  }
  
  // Generate a random confirmation code for self-destruct
  export const generateConfirmationCode = () => {
    // Generate a 6-character alphanumeric code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
  
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }
  
    return code
  }
  
  