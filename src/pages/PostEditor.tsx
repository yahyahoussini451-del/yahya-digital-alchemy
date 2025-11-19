import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  slug: z.string().min(1, "Le slug est requis").max(200).regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets"),
  content: z.string().min(1, "Le contenu est requis"),
  excerpt: z.string().max(300).optional(),
  cover_image: z.string().url("URL d'image invalide").optional().or(z.literal('')),
  seo_title: z.string().max(60).optional(),
  seo_description: z.string().max(160).optional(),
  author_name: z.string().min(1).max(100),
  category: z.string().max(50).optional()
});

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [authorName, setAuthorName] = useState('Yahya Houssini');
  const [category, setCategory] = useState('');
  const [publishedAt, setPublishedAt] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && !isAdmin) {
      navigate('/');
    }
  }, [user, authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (id && id !== 'new' && isAdmin) {
      fetchPost();
    }
  }, [id, isAdmin]);

  const fetchPost = async () => {
    if (!id || id === 'new') return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
      setExcerpt(data.excerpt || '');
      setCoverImage(data.cover_image || '');
      setSeoTitle(data.seo_title || '');
      setSeoDescription(data.seo_description || '');
      setAuthorName(data.author_name || 'Yahya Houssini');
      setCategory(data.category || '');
      setPublishedAt(data.published_at ? new Date(data.published_at).toISOString().slice(0, 16) : '');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'article.",
        variant: "destructive"
      });
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!id || id === 'new') {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (publish: boolean = false) => {
    setSaving(true);

    try {
      const postData = {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        cover_image: coverImage || null,
        seo_title: seoTitle || title,
        seo_description: seoDescription || excerpt || null,
        author_name: authorName,
        category: category || null,
        published_at: publish ? (publishedAt || new Date().toISOString()) : publishedAt || null
      };

      postSchema.parse(postData);

      let error;
      if (id && id !== 'new') {
        const { error: updateError } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('posts')
          .insert([postData]);
        error = insertError;
      }

      if (error) {
        if (error.message.includes('unique')) {
          toast({
            title: "Erreur",
            description: "Ce slug existe déjà. Veuillez en choisir un autre.",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }

      toast({
        title: publish ? "Article publié !" : "Article sauvegardé",
        description: publish ? "Votre article est maintenant visible." : "Votre brouillon a été sauvegardé.",
      });

      navigate('/admin');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder l'article.",
          variant: "destructive"
        });
      }
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sauvegarder brouillon
            </Button>
            <Button onClick={() => handleSave(true)} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Publier
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>
              {id === 'new' ? 'Nouvel article' : 'Modifier l\'article'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Le titre de votre article"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="mon-article-genial"
                required
              />
              <p className="text-sm text-muted-foreground">
                URL: /blog/{slug}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="AI, Development, Business..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Extrait (résumé court)</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Un court résumé de votre article (max 300 caractères)"
                rows={3}
                maxLength={300}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_image">Image de couverture (URL)</Label>
              <Input
                id="cover_image"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenu *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Écrivez votre article ici..."
                rows={15}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Auteur *</Label>
              <Input
                id="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Yahya Houssini"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="published_at">Date de publication</Label>
              <Input
                id="published_at"
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Laissez vide pour un brouillon
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">SEO & Métadonnées</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo_title">Titre SEO (max 60 caractères)</Label>
                  <Input
                    id="seo_title"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={title || "Titre optimisé pour Google"}
                    maxLength={60}
                  />
                  <p className="text-sm text-muted-foreground">
                    {seoTitle.length}/60 caractères
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_description">Description SEO (max 160 caractères)</Label>
                  <Textarea
                    id="seo_description"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder={excerpt || "Description optimisée pour les résultats de recherche"}
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-sm text-muted-foreground">
                    {seoDescription.length}/160 caractères
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PostEditor;
