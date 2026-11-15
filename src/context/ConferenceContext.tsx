import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BRAND_DATA as DEFAULT_BRAND_DATA,
  FOUNDERS as DEFAULT_FOUNDERS,
  COMMITTEES as DEFAULT_COMMITTEES,
  EXPERIENCE_ITEMS as DEFAULT_EXPERIENCE_ITEMS,
  FAQS as DEFAULT_FAQS,
  IMPORTANT_DATES as DEFAULT_IMPORTANT_DATES,
  DEFAULT_GLOBE_SETTINGS,
  LEGACY_IMAGE_MAP,
  Committee,
  FounderProfile,
  ExperienceItem,
  FaqItem,
  GlobeSettings,
} from '../data/conferenceData';

interface ConferenceContextType {
  brandData: typeof DEFAULT_BRAND_DATA;
  founders: FounderProfile[];
  committees: Committee[];
  experienceItems: ExperienceItem[];
  faqs: FaqItem[];
  importantDates: Array<{ date: string; event: string; status: string }>;
  globeSettings: GlobeSettings;
  updateBrandData: (newData: Partial<typeof DEFAULT_BRAND_DATA>) => void;
  updateFounder: (id: string, updated: Partial<FounderProfile>) => void;
  updateCommittee: (id: string, updated: Partial<Committee>) => void;
  addCommittee: (committee: Committee) => void;
  deleteCommittee: (id: string) => void;
  updateExperienceItem: (id: string, updated: Partial<ExperienceItem>) => void;
  updateFaq: (id: string, updated: Partial<FaqItem>) => void;
  addFaq: (faq: FaqItem) => void;
  deleteFaq: (id: string) => void;
  updateImportantDate: (index: number, updated: { date: string; event: string; status: string }) => void;
  updateGlobeSettings: (updated: Partial<GlobeSettings>) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'HORIZON_MUN_CUSTOM_DATA_V3';

const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

export function ConferenceProvider({ children }: { children: React.ReactNode }) {
  const [brandData, setBrandData] = useState<typeof DEFAULT_BRAND_DATA>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_BRAND`);
      if (!saved) return DEFAULT_BRAND_DATA;
      const parsed = { ...DEFAULT_BRAND_DATA, ...JSON.parse(saved) };
      if (parsed.dates === 'January 3 – 5, 2027') {
        parsed.dates = DEFAULT_BRAND_DATA.dates;
      }
      if (
        !parsed.logoUrl ||
        parsed.logoUrl === './assets/aistudio/Gemini_Generated_Image_9j9k5v9j9k5v9j9k_6db230c7.png'
      ) {
        parsed.logoUrl = DEFAULT_BRAND_DATA.logoUrl;
      }
      if (!parsed.aboutText) {
        parsed.aboutText = DEFAULT_BRAND_DATA.aboutText;
      }
      return parsed;
    } catch {
      return DEFAULT_BRAND_DATA;
    }
  });

  const [founders, setFounders] = useState<FounderProfile[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_FOUNDERS`);
      if (!saved) return DEFAULT_FOUNDERS;
      const parsed: FounderProfile[] = JSON.parse(saved);
      return parsed.map((f) => {
        const def = DEFAULT_FOUNDERS.find((d) => d.id === f.id);
        // If migrating from an older schema without `name`, sync name & remove old invented badges/highlights
        if (!f.name && def) {
          return {
            ...f,
            name: def.name,
            title: def.title,
            experienceBadge: '',
            highlights: [],
            photo: f.photo || def.photo || '',
          };
        }
        return {
          ...f,
          name: f.name || def?.name || '',
          photo: f.photo || def?.photo || '',
        };
      });
    } catch {
      return DEFAULT_FOUNDERS;
    }
  });

  const [committees, setCommittees] = useState<Committee[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_COMMITTEES`);
      return saved ? JSON.parse(saved) : DEFAULT_COMMITTEES;
    } catch {
      return DEFAULT_COMMITTEES;
    }
  });

  const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_EXPERIENCE`);
      if (!saved) return DEFAULT_EXPERIENCE_ITEMS;
      const parsed: ExperienceItem[] = JSON.parse(saved);
      return parsed.map((item) => ({
        ...item,
        image: LEGACY_IMAGE_MAP[item.image] || item.image,
      }));
    } catch {
      return DEFAULT_EXPERIENCE_ITEMS;
    }
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_FAQS`);
      if (!saved) return DEFAULT_FAQS;
      const parsed: FaqItem[] = JSON.parse(saved);
      return parsed.map((faq) =>
        faq.id === 'faq-5' && faq.answer.includes('January 3 to January 5, 2027')
          ? { ...faq, answer: DEFAULT_FAQS.find((d) => d.id === 'faq-5')?.answer || faq.answer }
          : faq
      );
    } catch {
      return DEFAULT_FAQS;
    }
  });

  const [importantDates, setImportantDates] = useState<Array<{ date: string; event: string; status: string }>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_DATES`);
      if (!saved) return DEFAULT_IMPORTANT_DATES;
      const parsed: Array<{ date: string; event: string; status: string }> = JSON.parse(saved);
      const hasLegacyMultiDay = parsed.some(
        (d) => d.date === 'January 4, 2027' || d.date === 'January 5, 2027'
      );
      return hasLegacyMultiDay ? DEFAULT_IMPORTANT_DATES : parsed;
    } catch {
      return DEFAULT_IMPORTANT_DATES;
    }
  });

  const [globeSettings, setGlobeSettings] = useState<GlobeSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_GLOBE`);
      return saved ? { ...DEFAULT_GLOBE_SETTINGS, ...JSON.parse(saved) } : DEFAULT_GLOBE_SETTINGS;
    } catch {
      return DEFAULT_GLOBE_SETTINGS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_BRAND`, JSON.stringify(brandData));
      localStorage.setItem(`${STORAGE_KEY}_FOUNDERS`, JSON.stringify(founders));
      localStorage.setItem(`${STORAGE_KEY}_COMMITTEES`, JSON.stringify(committees));
      localStorage.setItem(`${STORAGE_KEY}_EXPERIENCE`, JSON.stringify(experienceItems));
      localStorage.setItem(`${STORAGE_KEY}_FAQS`, JSON.stringify(faqs));
      localStorage.setItem(`${STORAGE_KEY}_DATES`, JSON.stringify(importantDates));
      localStorage.setItem(`${STORAGE_KEY}_GLOBE`, JSON.stringify(globeSettings));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [brandData, founders, committees, experienceItems, faqs, importantDates, globeSettings]);

  const updateBrandData = (newData: Partial<typeof DEFAULT_BRAND_DATA>) => {
    setBrandData((prev) => ({ ...prev, ...newData }));
  };

  const updateFounder = (id: string, updated: Partial<FounderProfile>) => {
    setFounders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updated } : f))
    );
  };

  const updateCommittee = (id: string, updated: Partial<Committee>) => {
    setCommittees((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const addCommittee = (committee: Committee) => {
    setCommittees((prev) => [...prev, committee]);
  };

  const deleteCommittee = (id: string) => {
    setCommittees((prev) => prev.filter((c) => c.id !== id));
  };

  const updateExperienceItem = (id: string, updated: Partial<ExperienceItem>) => {
    setExperienceItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, ...updated } : faq))
    );
  };

  const addFaq = (faq: FaqItem) => {
    setFaqs((prev) => [...prev, faq]);
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const updateImportantDate = (
    index: number,
    updated: { date: string; event: string; status: string }
  ) => {
    setImportantDates((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  const updateGlobeSettings = (updated: Partial<GlobeSettings>) => {
    setGlobeSettings((prev) => ({ ...prev, ...updated }));
  };

  const resetToDefaults = () => {
    setBrandData(DEFAULT_BRAND_DATA);
    setFounders(DEFAULT_FOUNDERS);
    setCommittees(DEFAULT_COMMITTEES);
    setExperienceItems(DEFAULT_EXPERIENCE_ITEMS);
    setFaqs(DEFAULT_FAQS);
    setImportantDates(DEFAULT_IMPORTANT_DATES);
    setGlobeSettings(DEFAULT_GLOBE_SETTINGS);
    localStorage.clear();
  };

  return (
    <ConferenceContext.Provider
      value={{
        brandData,
        founders,
        committees,
        experienceItems,
        faqs,
        importantDates,
        globeSettings,
        updateBrandData,
        updateFounder,
        updateCommittee,
        addCommittee,
        deleteCommittee,
        updateExperienceItem,
        updateFaq,
        addFaq,
        deleteFaq,
        updateImportantDate,
        updateGlobeSettings,
        resetToDefaults,
      }}
    >
      {children}
    </ConferenceContext.Provider>
  );
}

export function useConference() {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error('useConference must be used within a ConferenceProvider');
  }
  return context;
}
