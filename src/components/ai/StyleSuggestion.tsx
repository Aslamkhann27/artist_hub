"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getStyleSuggestions } from '@/app/actions';
import { Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const formSchema = z.object({
  preferences: z.string().min(10, { message: "Please describe your preferences in at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function StyleSuggestion() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await getStyleSuggestions(data.preferences);
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error("Failed to get style suggestions:", error);
      toast({
        title: "Error",
        description: "Could not fetch suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Wand2 className="text-accent"/>
          Describe Your Aesthetic
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'I love calm, minimalist designs with natural elements and soft, pastel colors.'"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? 'Generating...' : 'Get Suggestions'}
              {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {suggestions.length > 0 && (
        <div className="p-6 pt-0">
          <h3 className="text-lg font-semibold mb-4 font-headline">Suggested Styles</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((style, index) => (
              <Button key={index} variant="outline" asChild>
                <Link href={`/?style=${encodeURIComponent(style)}`}>
                  {style}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
