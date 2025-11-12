import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  tags: string[];
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Космические пейзажи в 4K',
    description: 'Путешествие по галактикам и звездным системам',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=450&fit=crop',
    duration: '12:34',
    views: '1.2M',
    uploadDate: '2 дня назад',
    tags: ['космос', 'природа', '4k']
  },
  {
    id: '2',
    title: 'Современный веб-дизайн 2024',
    description: 'Тренды и лучшие практики UI/UX дизайна',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop',
    duration: '25:10',
    views: '850K',
    uploadDate: '1 неделю назад',
    tags: ['дизайн', 'web', 'обучение']
  },
  {
    id: '3',
    title: 'Расслабляющая природа',
    description: 'Звуки леса и шум воды для медитации',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop',
    duration: '45:00',
    views: '2.5M',
    uploadDate: '3 недели назад',
    tags: ['природа', 'релакс', 'медитация']
  },
  {
    id: '4',
    title: 'Основы TypeScript',
    description: 'Полное руководство для начинающих разработчиков',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
    duration: '1:15:30',
    views: '500K',
    uploadDate: '1 месяц назад',
    tags: ['программирование', 'typescript', 'обучение']
  },
  {
    id: '5',
    title: 'Городские огни в таймлапсе',
    description: 'Ночной город в движении',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop',
    duration: '8:20',
    views: '3.1M',
    uploadDate: '5 дней назад',
    tags: ['город', 'таймлапс', 'ночь']
  },
  {
    id: '6',
    title: 'React Hooks глубокое погружение',
    description: 'Все о хуках React: useState, useEffect и другие',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    duration: '42:15',
    views: '675K',
    uploadDate: '2 недели назад',
    tags: ['react', 'программирование', 'hooks']
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredVideos(mockVideos);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = mockVideos.filter(video => 
      video.title.toLowerCase().includes(lowerQuery) ||
      video.description.toLowerCase().includes(lowerQuery) ||
      video.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    setFilteredVideos(filtered);
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
    { id: 'playlists', label: 'Плейлисты', icon: 'ListVideo' },
    { id: 'history', label: 'История', icon: 'History' },
    { id: 'profile', label: 'Профиль', icon: 'User' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="Play" size={32} className="text-primary" />
              <span className="text-xl font-bold">VideoHub</span>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className="gap-2"
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="text"
                placeholder="Поиск по названию, тегам, описанию..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-4 h-12 bg-card border-border text-base"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-muted-foreground">
                Найдено видео: {filteredVideos.length}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div 
              key={video.id} 
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-card mb-3 transition-transform duration-200 group-hover:scale-[1.02]">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                    <Icon name="Play" size={28} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium">
                  {video.duration}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    {video.views}
                  </span>
                  <span>{video.uploadDate}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {video.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearch(tag);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить запрос или очистить фильтры
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => handleSearch('')}
            >
              Сбросить поиск
            </Button>
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="flex justify-around py-2">
          {navItems.map(item => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(item.id)}
              className={`flex-col h-auto py-2 px-3 gap-1 ${activeTab === item.id ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;
