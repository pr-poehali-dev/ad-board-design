import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const categories = [
  { 
    id: 'tech', 
    name: 'Спецтехника', 
    icon: 'Truck',
    description: 'Аренда и продажа',
    count: 234
  },
  { 
    id: 'materials', 
    name: 'Стройматериалы', 
    icon: 'Package',
    description: 'Доставка материалов',
    count: 156
  },
  { 
    id: 'jobs', 
    name: 'Вакансии', 
    icon: 'Briefcase',
    description: 'Поиск работы',
    count: 89
  },
];

const listings = [
  {
    id: 1,
    title: 'Экскаватор JCB 220X',
    category: 'Спецтехника',
    price: '150 000 ₽/сутки',
    location: 'Москва',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/4afbe986-5989-49a0-98cb-d6a8afe5d3bd.jpg',
    type: 'Аренда',
    date: 'Сегодня, 14:20',
    featured: true,
    description: 'Современный экскаватор в отличном состоянии. Полный бак топлива включён.'
  },
  {
    id: 2,
    title: 'Песок строительный (доставка)',
    category: 'Стройматериалы',
    price: '800 ₽/тонна',
    location: 'Московская обл.',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/67b88fab-a8c0-4d66-aeae-267c4c9b28dc.jpg',
    type: 'Продажа',
    date: 'Сегодня, 12:45',
    featured: false
  },
  {
    id: 3,
    title: 'Крановщик башенного крана',
    category: 'Вакансии',
    price: 'от 120 000 ₽/мес',
    location: 'Москва',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/0454c8cb-e99b-4f20-9381-0550b5cbde12.jpg',
    type: 'Вакансия',
    date: 'Вчера, 18:30',
    featured: false
  },
  {
    id: 4,
    title: 'Бульдозер Caterpillar D6T',
    category: 'Спецтехника',
    price: '200 000 ₽/сутки',
    location: 'Санкт-Петербург',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/4afbe986-5989-49a0-98cb-d6a8afe5d3bd.jpg',
    type: 'Аренда',
    date: 'Вчера, 16:10',
    featured: false
  },
  {
    id: 5,
    title: 'Щебень фракция 20-40мм',
    category: 'Стройматериалы',
    price: '1 200 ₽/тонна',
    location: 'Москва',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/67b88fab-a8c0-4d66-aeae-267c4c9b28dc.jpg',
    type: 'Продажа',
    date: '15 ноября',
    featured: false
  },
  {
    id: 6,
    title: 'Водитель самосвала КАМАЗ',
    category: 'Вакансии',
    price: 'от 100 000 ₽/мес',
    location: 'Московская обл.',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/0454c8cb-e99b-4f20-9381-0550b5cbde12.jpg',
    type: 'Вакансия',
    date: '14 ноября',
    featured: false
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = listings.filter(listing => {
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredListing = filteredListings.find(l => l.featured);
  const regularListings = filteredListings.filter(l => !l.featured);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <Icon name="HardHat" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading text-xl font-bold text-foreground">СтройБиржа</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Доска объявлений</p>
              </div>
            </div>

            <Button variant="outline" className="hidden md:flex items-center gap-2 border-primary/20 hover:bg-primary/5">
              <Icon name="User" className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Профиль</span>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon name="Search" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Найти технику, материалы, вакансии..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base shadow-sm border-border/60 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2 h-14 px-8 shadow-lg shadow-primary/20 font-semibold">
              <Icon name="Plus" className="h-5 w-5" />
              Разместить
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg animate-scale-in ${
                  selectedCategory === cat.name 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border/40 bg-white hover:border-primary/30'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                      selectedCategory === cat.name 
                        ? 'bg-primary text-white' 
                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                    }`}>
                      <Icon name={cat.icon as any} className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{cat.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {cat.count} объявлений
                    </Badge>
                  </div>
                  {selectedCategory === cat.name && (
                    <Icon name="Check" className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            {selectedCategory || 'Актуальные объявления'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredListings.length} шт.
          </p>
        </div>

        <div className="space-y-6">
          {featuredListing && (
            <Card className="overflow-hidden border-2 border-primary/20 shadow-lg animate-fade-in bg-gradient-to-br from-primary/5 to-transparent">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-muted">
                  <img
                    src={featuredListing.image}
                    alt={featuredListing.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute left-4 top-4 bg-primary shadow-lg text-white">
                    ⭐ Топ объявление
                  </Badge>
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                      {featuredListing.type}
                    </Badge>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3 leading-tight">
                      {featuredListing.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{featuredListing.description}</p>
                    <p className="font-heading text-3xl font-bold text-primary mb-6">
                      {featuredListing.price}
                    </p>
                    <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <Icon name="MapPin" className="h-5 w-5 text-primary" />
                        <span className="font-medium">{featuredListing.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon name="Clock" className="h-5 w-5 text-primary" />
                        <span>{featuredListing.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="lg" className="gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                      <Icon name="Phone" className="h-5 w-5" />
                      Позвонить
                    </Button>
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 gap-2 font-semibold shadow-md">
                      <Icon name="MessageCircle" className="h-5 w-5" />
                      Написать
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regularListings.map((listing, index) => (
              <Card 
                key={listing.id} 
                className="overflow-hidden group cursor-pointer animate-fade-in border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${(index + 1) * 80}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute left-3 top-3 bg-white/95 text-foreground shadow-md">
                    {listing.type}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-heading text-lg font-bold leading-tight line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                    {listing.title}
                  </h3>
                  <p className="font-heading text-2xl font-bold text-primary mb-4">
                    {listing.price}
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="h-4 w-4 flex-shrink-0" />
                      <span>{listing.date}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-3 p-5 pt-0">
                  <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-white font-medium">
                    <Icon name="Phone" className="h-4 w-4" />
                    Позвонить
                  </Button>
                  <Button className="bg-secondary hover:bg-secondary/90 gap-2 font-medium">
                    <Icon name="MessageCircle" className="h-4 w-4" />
                    Написать
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {filteredListings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Icon name="SearchX" className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mb-2 font-heading text-2xl font-bold">Ничего не найдено</h3>
            <p className="text-muted-foreground max-w-md">
              Попробуйте изменить параметры поиска или выбрать другую категорию
            </p>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Icon name="HardHat" className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-heading font-bold">СтройБиржа</p>
                <p className="text-muted-foreground">Доска объявлений для профессионалов</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 СтройБиржа. Все права защищены
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
