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
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CertificationEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title_en: '',
    title_fr: '',
    title_ar: '',
    issuer_en: '',
    issuer_fr: '',
    issuer_ar: '',
    description_en: '',
    description_fr: '',
    description_ar: '',
    image_url: '',
    credential_url: '',
    display_order: 0,
    is_featured: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && !isAdmin) {
      toast({
        title: "Access denied",
        description: "You must be an admin to access this page.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (id && id !== 'new' && isAdmin) {
      fetchCertification();
    }
  }, [id, isAdmin]);

  const fetchCertification = async () => {
    if (!id || id === 'new') return;

    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title_en: data.title_en,
        title_fr: data.title_fr,
        title_ar: data.title_ar,
        issuer_en: data.issuer_en,
        issuer_fr: data.issuer_fr,
        issuer_ar: data.issuer_ar,
        description_en: data.description_en || '',
        description_fr: data.description_fr || '',
        description_ar: data.description_ar || '',
        image_url: data.image_url,
        credential_url: data.credential_url || '',
        display_order: data.display_order,
        is_featured: data.is_featured,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load certification.",
        variant: "destructive"
      });
      navigate('/admin/certifications');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('app-covers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('app-covers')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id === 'new') {
        const { error } = await supabase
          .from('certifications')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Certification created",
          description: "The certification was created successfully.",
        });
      } else {
        const { error } = await supabase
          .from('certifications')
          .update(formData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Certification updated",
          description: "The certification was updated successfully.",
        });
      }

      navigate('/admin/certifications');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save certification.",
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
            <Link to="/admin/certifications">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Certifications
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>
              {id === 'new' ? 'New Certification' : 'Edit Certification'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>

                <TabsContent value="en" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title_en">Title (English)</Label>
                    <Input
                      id="title_en"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      placeholder="e.g., Google Business Intelligence Certificate"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issuer_en">Issuer (English)</Label>
                    <Input
                      id="issuer_en"
                      value={formData.issuer_en}
                      onChange={(e) => setFormData({ ...formData, issuer_en: e.target.value })}
                      placeholder="e.g., Google"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description_en">Description (English)</Label>
                    <Textarea
                      id="description_en"
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      placeholder="Brief description..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="fr" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title_fr">Titre (Français)</Label>
                    <Input
                      id="title_fr"
                      value={formData.title_fr}
                      onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })}
                      placeholder="ex: Certificat Google Business Intelligence"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issuer_fr">Émetteur (Français)</Label>
                    <Input
                      id="issuer_fr"
                      value={formData.issuer_fr}
                      onChange={(e) => setFormData({ ...formData, issuer_fr: e.target.value })}
                      placeholder="ex: Google"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description_fr">Description (Français)</Label>
                    <Textarea
                      id="description_fr"
                      value={formData.description_fr}
                      onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                      placeholder="Description brève..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title_ar">العنوان (العربية)</Label>
                    <Input
                      id="title_ar"
                      value={formData.title_ar}
                      onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                      placeholder="مثال: شهادة Google Business Intelligence"
                      required
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issuer_ar">المصدر (العربية)</Label>
                    <Input
                      id="issuer_ar"
                      value={formData.issuer_ar}
                      onChange={(e) => setFormData({ ...formData, issuer_ar: e.target.value })}
                      placeholder="مثال: Google"
                      required
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description_ar">الوصف (العربية)</Label>
                    <Textarea
                      id="description_ar"
                      value={formData.description_ar}
                      onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                      placeholder="وصف مختصر..."
                      rows={3}
                      dir="rtl"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="image_upload">Certificate Image</Label>
                <Input
                  id="image_upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {formData.image_url && (
                  <div className="mt-2">
                    <img src={formData.image_url} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="credential_url">Credential URL (optional)</Label>
                <Input
                  id="credential_url"
                  type="url"
                  value={formData.credential_url}
                  onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
                />
                <Label htmlFor="is_featured" className="cursor-pointer">
                  Featured certification
                </Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading || uploading}>
                  {loading || uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Certification
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/admin/certifications')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CertificationEditor;
