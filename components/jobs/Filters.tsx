interface FiltersProps {
  countries: string[];
  categories: string[];
  selectedCountry: string;
  selectedCategory: string;
  onCountryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function Filters({
  countries,
  categories,
  selectedCountry,
  selectedCategory,
  onCountryChange,
  onCategoryChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        aria-label="Filter by country"
        className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 sm:w-48"
      >
        <option value="">All Countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
        className="rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 sm:w-48"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
