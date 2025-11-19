import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AppEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    icon_name: '',
    category: '',
    gradient: '',
    display_order: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && !isAdmin) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être administrateur pour accéder à cette page.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (id && id !== 'new' && isAdmin) {
      fetchApp();
    }
  }, [id, isAdmin]);

  const fetchApp = async () => {
    if (!id || id === 'new') return;

    try {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        icon_name: data.icon_name,
        category: data.category,
        gradient: data.gradient,
        display_order: data.display_order,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'application.",
        variant: "destructive"
      });
      navigate('/admin/apps');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id === 'new') {
        const { error } = await supabase
          .from('apps')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Application créée",
          description: "L'application a été créée avec succès.",
        });
      } else {
        const { error } = await supabase
          .from('apps')
          .update(formData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Application mise à jour",
          description: "L'application a été mise à jour avec succès.",
        });
      }

      navigate('/admin/apps');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'application.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link to="/admin/apps">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux applications
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>
              {id === 'new' ? 'Nouvelle application' : 'Modifier l\'application'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: E-commerce Platform"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de l'application"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon_name">Nom de l'icône</Label>
                <Input
                  id="icon_name"
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  placeholder="Ex: ShoppingCart (nom Lucide)"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Utilisez le nom exact de l'icône Lucide (ex: ShoppingCart, BarChart3, Coffee)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: ecommerce, business, ai"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradient">Gradient Tailwind</Label>
                <Input
                  id="gradient"
                  value={formData.gradient}
                  onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                  placeholder="Ex: from-orange-500 to-red-600"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Classes Tailwind pour le dégradé (ex: from-blue-500 to-indigo-600)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Ordre d'affichage</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/admin/apps">Annuler</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AppEditor;
