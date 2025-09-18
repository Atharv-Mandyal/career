
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, MessageSquare, UserPlus } from 'lucide-react';
import { placeholderUsers } from '@/lib/placeholder-users';
import type { PlaceholderUser } from '@/lib/placeholder-users';

export default function ConnectPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<PlaceholderUser[]>(placeholderUsers);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = placeholderUsers.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.interests.some(interest => interest.toLowerCase().includes(term))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(placeholderUsers);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Connect with Peers</h1>
        <p className="text-muted-foreground">
          Find and form study groups with learners near you.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name or interest (e.g., 'React', 'UX Design')..."
            className="pl-10"
            aria-label="Search users"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="flex flex-col">
            <CardHeader className="items-center text-center">
              <Image
                src={user.imageUrl}
                alt={`${user.name}'s profile picture`}
                width={80}
                height={80}
                className="rounded-full border-2 border-primary/50 p-1"
                data-ai-hint="profile picture"
              />
              <CardTitle className="font-headline text-xl">{user.name}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-sm">
                <MapPin className="size-4" /> {user.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="font-semibold text-sm mb-2">Interests:</p>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2"/> Message
                </Button>
                <Button className="w-full">
                    <UserPlus className="mr-2"/> Connect
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed col-span-full">
            <Search className="size-16 text-muted-foreground mb-4" />
            <CardTitle>No Users Found</CardTitle>
            <CardDescription className="mt-2 max-w-md mx-auto">
                No users matched your search term. Try a different search.
            </CardDescription>
        </Card>
      )}
    </div>
  );
}
