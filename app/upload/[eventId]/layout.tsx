export async function generateStaticParams() {
  // Generate static params for common event IDs
  // In production, this would fetch from your database
  return [
    { eventId: 'evt_001' },
    { eventId: 'evt_002' },
    { eventId: 'evt_003' },
    { eventId: 'evt_004' },
    { eventId: 'demo' },
    { eventId: 'sample' },
  ];
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}