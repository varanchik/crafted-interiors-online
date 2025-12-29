import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import { FacadeCard } from '@/components/facades/FacadeCard';
import { FacadeFilters } from '@/components/facades/FacadeFilters';
import { mockFacades } from '@/data/facades';
import { FacadeFilterState, Facade } from '@/types/facade';

const Facades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FacadeFilterState>({
    priceRange: [0, 15000],
    materials: [],
    coatings: [],
    colors: [],
    inStock: false,
    featured: false,
    sortBy: 'popular',
  });

  // Filter and sort facades
  const filteredFacades = mockFacades
    .filter((facade) => {
      const matchesSearch = facade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           facade.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = facade.pricePerSquareMeter >= filters.priceRange[0] && 
                          facade.pricePerSquareMeter <= filters.priceRange[1];
      const matchesMaterial = filters.materials.length === 0 || 
                             filters.materials.includes(facade.material);
      const matchesCoating = filters.coatings.length === 0 || 
                            facade.coatings.some(c => filters.coatings.includes(c));
      const matchesColor = filters.colors.length === 0 || 
                          facade.colors.some(c => filters.colors.includes(c.id));
      const matchesStock = !filters.inStock || facade.inStock;
      const matchesFeatured = !filters.featured || facade.featured;
      
      return matchesSearch && matchesPrice && matchesMaterial && matchesCoating && 
             matchesColor && matchesStock && matchesFeatured;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.pricePerSquareMeter - b.pricePerSquareMeter;
        case 'price-desc':
          return b.pricePerSquareMeter - a.pricePerSquareMeter;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.reviews - a.reviews; // popular
      }
    });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">
                  Каталог фасадов
                </h1>
                <p className="text-muted-foreground">
                  Найдено {filteredFacades.length} фасадов
                </p>
              </div>
              
              {/* Search and View Controls */}
              <div className="flex flex-col sm:flex-row gap-4 lg:w-auto w-full">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Поиск фасадов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Фильтры
                  </Button>
                  
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block">
              <FacadeFilters
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={true}
                onToggle={() => {}}
              />
            </div>

            {/* Mobile Filters */}
            {filtersOpen && (
              <div className="fixed inset-0 z-50 bg-background lg:hidden">
                <div className="p-4">
                  <FacadeFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    isOpen={true}
                    onToggle={() => setFiltersOpen(false)}
                  />
                </div>
              </div>
            )}

            {/* Facades Grid */}
            <div className="flex-1">
              {filteredFacades.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredFacades.map((facade) => (
                    <FacadeCard 
                      key={facade.id} 
                      facade={facade}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Фасады не найдены</h3>
                  <p className="text-muted-foreground mb-6">
                    Попробуйте изменить параметры поиска или фильтры
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({
                        priceRange: [0, 15000],
                        materials: [],
                        coatings: [],
                        colors: [],
                        inStock: false,
                        featured: false,
                        sortBy: 'popular',
                      });
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facades;
