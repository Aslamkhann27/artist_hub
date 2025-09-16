import StyleSuggestion from '@/components/ai/StyleSuggestion';

export default function StyleSuggestionPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
       <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl">Find Your Perfect Style</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Not sure what you're looking for? Describe your aesthetic preferences, and our AI-powered tool will suggest art styles that match your taste.
        </p>
      </div>
      <StyleSuggestion />
    </div>
  );
}
