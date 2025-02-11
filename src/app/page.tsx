import { redirect } from 'next/navigation';

export default function HomePage() {
  // This will immediately redirect to /noticias when the page is rendered on the server.
  redirect('/noticias');
}
