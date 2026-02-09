/**
 * Document Categorization
 * Maps companies to business categories
 */

export interface CategoryInfo {
  name: string;
  folder: string;
  companies: string[];
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  'Telekommunikation': {
    name: 'Telekommunikation',
    folder: '11_Telekommunikation',
    companies: ['Vodafone', 'Telekom', 'O2', 'Telefónica', '1&1']
  },
  'Versicherung': {
    name: 'Versicherung',
    folder: '04_Versicherungen',
    companies: [
      'Allianz', 'AXA', 'Generali', 'HUK-Coburg', 'ERGO', 'Gothaer',
      'R+V Versicherung', 'VHV', 'Debeka', 'Signal Iduna',
      'Württembergische', 'LVM', 'Provinzial'
    ]
  },
  'Gesundheit': {
    name: 'Gesundheit',
    folder: '02_Gesundheit',
    companies: [
      'Techniker Krankenkasse', 'TK', 'AOK', 'Barmer', 'DAK',
      'IKK', 'KKH'
    ]
  },
  'Finanzen': {
    name: 'Finanzen',
    folder: '01_Finanzen',
    companies: [
      'Sparkasse', 'Volksbank', 'Postbank', 'Commerzbank',
      'Deutsche Bank', 'PayPal', 'N26', 'ING', 'DKB'
    ]
  },
  'Logistik': {
    name: 'Logistik',
    folder: '12_Logistik',
    companies: [
      'DHL', 'Deutsche Post', 'Hermes', 'UPS', 'FedEx', 'DPD', 'GLS'
    ]
  },
  'Online': {
    name: 'Online',
    folder: '13_Online',
    companies: ['Amazon', 'eBay', 'Otto', 'Zalando']
  },
  'Reisen': {
    name: 'Reisen',
    folder: '06_Reisen',
    companies: ['Lufthansa', 'Deutsche Bahn', 'Booking.com', 'Airbnb']
  },
  'Auto': {
    name: 'Auto',
    folder: '09_Auto',
    companies: ['ADAC', 'TÜV', 'DEKRA']
  }
};

/**
 * Get category for a company name
 */
export function getCategoryForCompany(companyName: string): CategoryInfo | null {
  for (const category of Object.values(CATEGORIES)) {
    for (const company of category.companies) {
      if (companyName.includes(company) || company.includes(companyName)) {
        return category;
      }
    }
  }
  return null;
}

/**
 * Get all available categories
 */
export function getAllCategories(): CategoryInfo[] {
  return Object.values(CATEGORIES);
}

/**
 * Find category by folder name
 */
export function getCategoryByFolder(folder: string): CategoryInfo | null {
  for (const category of Object.values(CATEGORIES)) {
    if (category.folder === folder) {
      return category;
    }
  }
  return null;
}
