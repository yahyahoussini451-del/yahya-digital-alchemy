import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function TestimonialEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    quote_en: '',
    quote_fr: '',
    quote_ar: '',
    author_en: '',
    author_fr: '',
    author_ar: '',
    role_en: '',
    role_fr: '',
    role_ar: '',
    avatar_url: '',
    display_order: 0,
    is_featured: false,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!roleData || roleData.role !== 'admin') {
      navigate('/');
      return;
    }

    if (id && id !== 'new') {
      fetchTestimonial();
    }
  };

  const fetchTestimonial = async () => {
    if (!id || id === 'new') return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to load testimonial",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        .from('app-icons')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('app-icons')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      
      toast({
        title: "Success",
        description: "Avatar uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id && id !== 'new') {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Testimonial ${id && id !== 'new' ? 'updated' : 'created'} successfully`,
      });
      
      navigate('/admin/testimonials');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && id !== 'new') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin/testimonials')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {id && id !== 'new' ? 'Edit' : 'Add'} Testimonial
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Testimonial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>

                <TabsContent value="en" className="space-y-4">
                  <div>
                    <Label htmlFor="quote_en">Quote (English)</Label>
                    <Textarea
                      id="quote_en"
                      value={formData.quote_en}
                      onChange={(e) => setFormData({ ...formData, quote_en: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author_en">Author Name (English)</Label>
                    <Input
                      id="author_en"
                      value={formData.author_en}
                      onChange={(e) => setFormData({ ...formData, author_en: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role_en">Role/Position (English)</Label>
                    <Input
                      id="role_en"
                      value={formData.role_en}
                      onChange={(e) => setFormData({ ...formData, role_en: e.target.value })}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="fr" className="space-y-4">
                  <div>
                    <Label htmlFor="quote_fr">Citation (Français)</Label>
                    <Textarea
                      id="quote_fr"
                      value={formData.quote_fr}
                      onChange={(e) => setFormData({ ...formData, quote_fr: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author_fr">Nom de l'auteur (Français)</Label>
                    <Input
                      id="author_fr"
                      value={formData.author_fr}
                      onChange={(e) => setFormData({ ...formData, author_fr: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role_fr">Rôle/Poste (Français)</Label>
                    <Input
                      id="role_fr"
                      value={formData.role_fr}
                      onChange={(e) => setFormData({ ...formData, role_fr: e.target.value })}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="space-y-4" dir="rtl">
                  <div>
                    <Label htmlFor="quote_ar">الاقتباس (العربية)</Label>
                    <Textarea
                      id="quote_ar"
                      value={formData.quote_ar}
                      onChange={(e) => setFormData({ ...formData, quote_ar: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author_ar">اسم المؤلف (العربية)</Label>
                    <Input
                      id="author_ar"
                      value={formData.author_ar}
                      onChange={(e) => setFormData({ ...formData, author_ar: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role_ar">الدور/المنصب (العربية)</Label>
                    <Input
                      id="role_ar"
                      value={formData.role_ar}
                      onChange={(e) => setFormData({ ...formData, role_ar: e.target.value })}
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div>
                <Label htmlFor="avatar">Avatar Image</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {formData.avatar_url && (
                  <img
                    src={formData.avatar_url}
                    alt="Avatar preview"
                    className="mt-2 w-20 h-20 rounded-full object-cover"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, is_featured: checked as boolean })
                  }
                />
                <Label htmlFor="is_featured">Featured Testimonial</Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading || uploading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Testimonial
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/testimonials')}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}