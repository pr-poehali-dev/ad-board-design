import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const categories = [
  { id: 'tech', name: 'Спецтехника', icon: 'Truck' },
  { id: 'materials', name: 'Стройматериалы', icon: 'Package' },
  { id: 'jobs', name: 'Вакансии', icon: 'Briefcase' },
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
    date: 'Сегодня, 14:20'
  },
  {
    id: 2,
    title: 'Песок строительный (доставка)',
    category: 'Стройматериалы',
    price: '800 ₽/тонна',
    location: 'Московская обл.',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/67b88fab-a8c0-4d66-aeae-267c4c9b28dc.jpg',
    type: 'Продажа',
    date: 'Сегодня, 12:45'
  },
  {
    id: 3,
    title: 'Крановщик башенного крана',
    category: 'Вакансии',
    price: 'от 120 000 ₽/мес',
    location: 'Москва',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/0454c8cb-e99b-4f20-9381-0550b5cbde12.jpg',
    type: 'Вакансия',
    date: 'Вчера, 18:30'
  },
  {
    id: 4,
    title: 'Бульдозер Caterpillar D6T',
    category: 'Спецтехника',
    price: '200 000 ₽/сутки',
    location: 'Санкт-Петербург',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/4afbe986-5989-49a0-98cb-d6a8afe5d3bd.jpg',
    type: 'Аренда',
    date: 'Вчера, 16:10'
  },
  {
    id: 5,
    title: 'Щебень фракция 20-40мм',
    category: 'Стройматериалы',
    price: '1 200 ₽/тонна',
    location: 'Москва',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/67b88fab-a8c0-4d66-aeae-267c4c9b28dc.jpg',
    type: 'Продажа',
    date: '15 ноября'
  },
  {
    id: 6,
    title: 'Водитель самосвала КАМАЗ',
    category: 'Вакансии',
    price: 'от 100 000 ₽/мес',
    location: 'Московская обл.',
    image: 'https://cdn.poehali.dev/projects/4fdf6763-80a4-44ee-84c5-dbd8f6bbab42/files/0454c8cb-e99b-4f20-9381-0550b5cbde12.jpg',
    type: 'Вакансия',
    date: '14 ноября'
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

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Icon name="HardHat" className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-heading text-xl font-bold text-foreground">СтройБиржа</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    selectedCategory === cat.name ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon name={cat.icon as any} className="h-4 w-4" />
                  {cat.name}
                </button>
              ))}
            </nav>

            <Button variant="outline" className="hidden md:flex items-center gap-2">
              <Icon name="User" className="h-4 w-4" />
              Профиль
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по объявлениям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2 h-12 px-6">
              <Icon name="Plus" className="h-5 w-5" />
              Разместить объявление
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
            {categories.map(cat => (
              <Badge
                key={cat.id}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-semibold">
            {selectedCategory || 'Все объявления'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredListings.length} {filteredListings.length === 1 ? 'объявление' : 'объявлений'}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing, index) => (
            <Card 
              key={listing.id} 
              className="overflow-hidden hover-scale cursor-pointer animate-fade-in border-border/50 hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <Badge className="absolute left-3 top-3 bg-white/90 text-foreground hover:bg-white">
                  {listing.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-heading text-lg font-semibold leading-tight line-clamp-2">
                    {listing.title}
                  </h3>
                </div>
                <p className="mb-3 font-heading text-xl font-bold text-primary">
                  {listing.price}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" className="h-4 w-4" />
                    <span>{listing.date}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                <Button variant="outline" className="gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  Позвонить
                </Button>
                <Button className="bg-secondary hover:bg-secondary/90 gap-2">
                  <Icon name="MessageCircle" className="h-4 w-4" />
                  Написать
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Icon name="SearchX" className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 font-heading text-xl font-semibold">Ничего не найдено</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска или категорию
            </p>
          </div>
        )}
      </main>

      <footer className="mt-16 border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 СтройБиржа — доска объявлений для строительной сферы</p>
        </div>
      </footer>
    </div>
  );
}
