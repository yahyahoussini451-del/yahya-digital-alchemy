import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Testimonial {
  id: string;
  quote_en: string;
  quote_fr: string;
  quote_ar: string;
  author_en: string;
  author_fr: string;
  author_ar: string;
  role_en: string;
  role_fr: string;
  role_ar: string;
  avatar_url?: string;
  display_order: number;
  is_featured: boolean;
}

export default function AdminTestimonials() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

    fetchTestimonials();
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
      
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Manage Testimonials</h1>
          </div>
          <Button onClick={() => navigate('/admin/testimonial/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </div>

        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No testimonials found</p>
              <Button onClick={() => navigate('/admin/testimonial/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Testimonial
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start justify-between">
                    <span className="line-clamp-1">{testimonial.author_en}</span>
                    {testimonial.is_featured && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testimonial.avatar_url && (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.author_en}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      "{testimonial.quote_en}"
                    </p>
                    <p className="text-sm font-medium mt-2">{testimonial.role_en}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Order: {testimonial.display_order}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/testimonial/${testimonial.id}`)}
                      className="flex-1"
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(testimonial.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}