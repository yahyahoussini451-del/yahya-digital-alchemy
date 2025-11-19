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
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    icon_name: '',
    icon_url: '',
    category: '',
    gradient: '',
    gradient_start: '#667eea',
    gradient_end: '#764ba2',
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
        icon_url: data.icon_url || '',
        category: data.category,
        gradient: data.gradient,
        gradient_start: data.gradient_start || '#667eea',
        gradient_end: data.gradient_end || '#764ba2',
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

  const handleFileUpload = async (file: File, bucket: 'app-icons' | 'app-covers') => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le fichier.",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleFileUpload(file, 'app-icons');
    if (url) {
      setFormData({ ...formData, icon_url: url });
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.webp')) {
      toast({
        title: "Format invalide",
        description: "Veuillez télécharger une image au format .webp",
        variant: "destructive"
      });
      return;
    }

    const url = await handleFileUpload(file, 'app-covers');
    if (url) {
      setFormData({ ...formData, image_url: url });
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
                <Label htmlFor="cover_upload">Image de couverture (.webp)</Label>
                <Input
                  id="cover_upload"
                  type="file"
                  accept=".webp"
                  onChange={handleCoverUpload}
                  disabled={uploading}
                />
                {formData.image_url && (
                  <div className="mt-2">
                    <img src={formData.image_url} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon_upload">Icône (image)</Label>
                <Input
                  id="icon_upload"
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  disabled={uploading}
                />
                {formData.icon_url && (
                  <div className="mt-2">
                    <img src={formData.icon_url} alt="Icon preview" className="w-16 h-16 object-cover rounded-lg" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Si vous uploadez une icône, elle sera utilisée à la place de l'icône Lucide
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon_name">Nom de l'icône Lucide (optionnel)</Label>
                <Input
                  id="icon_name"
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  placeholder="Ex: ShoppingCart (nom Lucide)"
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

              <div className="space-y-4">
                <Label>Gradient (HEX Colors)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradient_start">Couleur de début</Label>
                    <div className="flex gap-2">
                      <Input
                        id="gradient_start"
                        type="color"
                        value={formData.gradient_start}
                        onChange={(e) => setFormData({ ...formData, gradient_start: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={formData.gradient_start}
                        onChange={(e) => setFormData({ ...formData, gradient_start: e.target.value })}
                        placeholder="#667eea"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradient_end">Couleur de fin</Label>
                    <div className="flex gap-2">
                      <Input
                        id="gradient_end"
                        type="color"
                        value={formData.gradient_end}
                        onChange={(e) => setFormData({ ...formData, gradient_end: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input
                        value={formData.gradient_end}
                        onChange={(e) => setFormData({ ...formData, gradient_end: e.target.value })}
                        placeholder="#764ba2"
                      />
                    </div>
                  </div>
                </div>
                <div 
                  className="w-full h-20 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${formData.gradient_start}, ${formData.gradient_end})`
                  }}
                />
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
                <Button type="submit" disabled={loading || uploading}>
                  {loading || uploading ? (
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
