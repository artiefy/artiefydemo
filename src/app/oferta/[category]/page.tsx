import { useParams } from 'next/navigation';

import OfertaDetalle from '~/components/OfertaDetalle';

export default function OfertaPage() {
  const params = useParams();
  const category = params?.category as string;

  return <OfertaDetalle category={category} />;
}
