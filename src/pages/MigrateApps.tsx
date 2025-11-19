import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { migrateAppsToDatabase } from '@/utils/migrateApps';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MigrateApps = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleMigrate = async () => {
    setStatus('loading');
    const result = await migrateAppsToDatabase();
    
    if (result.success) {
      setStatus('success');
      setMessage('All 27 apps have been successfully migrated to the database!');
    } else {
      setStatus('error');
      setMessage(`Migration failed: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Migrate Apps to Database</CardTitle>
          <CardDescription>
            This will migrate all 27 existing apps from your hardcoded data to the Supabase database.
            You only need to run this once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'idle' && (
            <>
              <p className="text-sm text-muted-foreground">
                This migration will insert all your portfolio apps into the database so you can manage them
                through the admin dashboard.
              </p>
              <Button onClick={handleMigrate} size="lg" className="w-full">
                Start Migration
              </Button>
            </>
          )}

          {status === 'loading' && (
            <div className="flex items-center justify-center gap-2 py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-lg">Migrating apps...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-8 w-8" />
                <p className="text-lg font-semibold">{message}</p>
              </div>
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link to="/admin/apps">Go to Admin Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/">View Portfolio</Link>
                </Button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="h-8 w-8" />
                <p className="text-lg font-semibold">{message}</p>
              </div>
              <Button onClick={handleMigrate} variant="outline" className="w-full">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MigrateApps;
