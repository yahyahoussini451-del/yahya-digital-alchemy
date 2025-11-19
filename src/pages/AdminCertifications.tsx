import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
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

interface Certification {
  id: string;
  title_en: string;
  title_fr: string;
  title_ar: string;
  issuer_en: string;
  issuer_fr: string;
  issuer_ar: string;
  image_url: string;
  credential_url?: string;
  display_order: number;
  is_featured: boolean;
}

const AdminCertifications = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
    if (isAdmin) {
      fetchCertifications();
    }
  }, [isAdmin]);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCertifications(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load certifications.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Certification deleted successfully.",
      });
      
      fetchCertifications();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete certification.",
        variant: "destructive"
      });
    }
    setDeleteId(null);
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Manage Certifications</h1>
          </div>
          <Button asChild>
            <Link to="/admin/certification/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {certifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">No certifications found</p>
              <Button asChild>
                <Link to="/admin/certification/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Certification
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{cert.title_en}</span>
                    {cert.is_featured && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={cert.image_url} 
                    alt={cert.title_en}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Issuer:</strong> {cert.issuer_en}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Order:</strong> {cert.display_order}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <Link to={`/admin/certification/${cert.id}`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setDeleteId(cert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the certification.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCertifications;
