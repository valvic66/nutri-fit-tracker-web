'use client';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

function Loader({ text }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  );
}

export function SubmitButton({
  text,
  loadingText,
  loading,
  className,
  onClick,
}) {
  const status = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
      className={cn(className)}
      onClick={onClick}
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </button>
  );
}
