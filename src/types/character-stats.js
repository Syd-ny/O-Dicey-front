const defaultStats = {
  "info": {
    "level": 0,
    "class": "",
    "background": "",
    "player_name": "",
    "race": "",
    "alignment": "",
    "experience": 0,
    "age": 0,
    "height": 0,
    "weight": 0,
    "eyes": "",
    "skin": "",
    "hair": ""
  },
  "characteristics": {
    "strength": 0,
    "dexterity": 0,
    "constitution": 0,
    "intelligence": 0,
    "wisdom": 0,
    "charisma": 0
  },
  "inspiration": 0,
  "proficiency": 0,
  "saving_throws": {
    "type": "CheckValue",
    "items": [
      {
        "name": "Force",
        "checked": false,
        "value": 0
      },
      {
        "name": "Dextérité",
        "checked": false,
        "value": 0
      },
      {
        "name": "Constitution",
        "checked": false,
        "value": 0
      },
      {
        "name": "Intelligence",
        "checked": false,
        "value": 0
      },
      {
        "name": "Sagesse",
        "checked": false,
        "value": 0
      },
      {
        "name": "Charisme",
        "checked": false,
        "value": 0
      }
    ]
  },
  "skills": {
    "type": "CheckValue",
    "items": [
      {
        "name": "Acrobaties",
        "checked": false,
        "value": 0,
        "characteristic": "Dex"
      },
      {
        "name": "Arcanes",
        "checked": false,
        "value": 0,
        "characteristic": "Int"
      },
      {
        "name": "Athlétisme",
        "checked": false,
        "value": 0,
        "characteristic": "For"
      },
      {
        "name": "Discrétion",
        "checked": false,
        "value": 0,
        "characteristic": "Dex"
      },
      {
        "name": "Dressage",
        "checked": false,
        "value": 0,
        "characteristic": "Sag"
      },
      {
        "name": "Escamotage",
        "checked": false,
        "value": 0,
        "characteristic": "Dex"
      },
      {
        "name": "Histoire",
        "checked": false,
        "value": 0,
        "characteristic": "Int"
      },
      {
        "name": "Intimidation",
        "checked": false,
        "value": 0,
        "characteristic": "Cha"
      },
      {
        "name": "Investigation",
        "checked": false,
        "value": 0,
        "characteristic": "Int"
      },
      {
        "name": "Médecine",
        "checked": false,
        "value": 0,
        "characteristic": "Sag"
      },
      {
        "name": "Nature",
        "checked": false,
        "value": 0,
        "characteristic": "Int"
      },
      {
        "name": "Perception",
        "checked": false,
        "value": 0,
        "characteristic": "Sag"
      },
      {
        "name": "Perspicacité",
        "checked": false,
        "value": 0,
        "characteristic": "Sag"
      },
      {
        "name": "Persuasion",
        "checked": false,
        "value": 0,
        "characteristic": "Sag"
      },
      {
        "name": "Religion",
        "checked": false,
        "value": 0,
        "characteristic": "Int"
      },
      {
        "name": "Représentation",
        "checked": false,
        "value": 0,
        "characteristic": "Sag"
      },
      {
        "name": "Survie",
        "checked": false,
        "value": 0,
        "characteristic": "Sag"
      },
      {
        "name": "Tromperie",
        "checked": false,
        "value": 0,
        "characteristic": "Cha"
      }
    ]
  },
  "armor_class": 0,
  "initiative": 0,
  "speed": 0,
  "hp": {
    "max": 0,
    "current": 0
  },
  "temporary_hp": 0,
  "hit_dice": "",
  "death_saves": {
    "successes": 0,
    "failures": 0
  },
  "attacks": [],
  "spells": [],
  "proficiencies": [],
  "money": {
    "cp": 0,
    "sp": 0,
    "ep": 0,
    "gp": 0,
    "pp": 0
  },
  "traits": [],
  "ideals": [],
  "bonds": [],
  "flaws": [],
  "features": [],
  "appearence": "",
  "backstory": "",
  "allies": [],
  "symbol": {
    "name": "",
    "picture": ""
  },
  "treasure": [],
  "spellcasting": {
    "class": "",
    "ability": 0,
    "save": 0,
    "bonus": 0
  }
};

export default defaultStats;
