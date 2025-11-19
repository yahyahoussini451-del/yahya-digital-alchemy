import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PlusCircle, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react';
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
} from '@/components/ui/alert-dialog';

interface App {
  id: string;
  title: string;
  description: string;
  image_url: string;
  icon_name: string;
  category: string;
  gradient: string;
  display_order: number;
  created_at: string;
}

const AdminApps = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
    if (isAdmin) {
      fetchApps();
    }
  }, [isAdmin]);

  const fetchApps = async () => {
    try {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setApps(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les applications.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('apps')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      toast({
        title: "Application supprimée",
        description: "L'application a été supprimée avec succès.",
      });

      fetchApps();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'application.",
        variant: "destructive"
      });
    } finally {
      setDeleteId(null);
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
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Gérer les Applications</h1>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">
              <Eye className="mr-2 h-4 w-4" />
              Voir le site
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Applications Portfolio</h2>
            <p className="text-muted-foreground mt-1">
              Gérez vos applications et projets
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/app/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle application
            </Link>
          </Button>
        </div>

        {apps.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">Aucune application pour le moment</p>
              <Button asChild>
                <Link to="/admin/app/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Créer votre première application
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {apps.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      <img
                        src={app.image_url}
                        alt={app.title}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <CardTitle>{app.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {app.description}
                        </CardDescription>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Catégorie: {app.category}</span>
                          <span>Ordre: {app.display_order}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/app/${app.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(app.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette application ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminApps;
