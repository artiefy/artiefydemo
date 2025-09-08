import { UserButton, useUser } from '@clerk/nextjs';
import {
  AcademicCapIcon,
  FolderIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { FaCrown } from 'react-icons/fa';

export function UserButtonWrapper() {
  const { user } = useUser();
  const planType = user?.publicMetadata?.planType as string | undefined;
  const subscriptionStatus = user?.publicMetadata?.subscriptionStatus as
    | string
    | undefined;
  const subscriptionEndDate = user?.publicMetadata?.subscriptionEndDate as
    | string
    | undefined;

  // Detectar si la suscripción está vencida o inactiva
  let isExpired = false;
  if (planType === 'Premium' || planType === 'Pro') {
    if (subscriptionStatus !== 'active') {
      isExpired = true;
    }
    if (subscriptionEndDate) {
      const end = new Date(subscriptionEndDate);
      if (end < new Date()) isExpired = true;
    }
  }

  // Badge visual para planType
  const renderPlanBadge = () => {
    if (planType === 'Premium') {
      return (
        <span
          className={`ml-2 inline-flex cursor-pointer items-center rounded px-2 py-0.5 text-xs font-bold text-white ${
            isExpired ? 'bg-gray-500' : 'bg-purple-500'
          }`}
          onClick={
            isExpired ? () => window.open('/planes', '_blank') : undefined
          }
          title={
            isExpired
              ? 'Suscripción vencida. Haz click para renovar.'
              : 'Premium activo'
          }
        >
          <FaCrown className="mr-1 text-yellow-300" />
          <span
            className={isExpired ? 'relative' : ''}
            style={
              isExpired
                ? {
                    textDecoration: 'line-through',
                    textDecorationColor: '#000',
                    textDecorationThickness: '2.5px',
                  }
                : undefined
            }
          >
            PREMIUM
          </span>
        </span>
      );
    }
    if (planType === 'Pro') {
      return (
        <span
          className={`ml-2 inline-flex cursor-pointer items-center rounded px-2 py-0.5 text-xs font-bold text-white ${
            isExpired ? 'bg-gray-500' : 'bg-orange-500'
          }`}
          onClick={
            isExpired ? () => window.open('/planes', '_blank') : undefined
          }
          title={
            isExpired
              ? 'Suscripción vencida. Haz click para renovar.'
              : 'Pro activo'
          }
        >
          <FaCrown className="mr-1 text-yellow-300" />
          <span
            className={isExpired ? 'relative' : ''}
            style={
              isExpired
                ? {
                    textDecoration: 'line-through',
                    textDecorationColor: '#000',
                    textDecorationThickness: '2.5px',
                  }
                : undefined
            }
          >
            PRO
          </span>
        </span>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center">
      <UserButton
        showName
        appearance={{
          elements: {
            rootBox: 'flex items-center justify-end',
            userButtonTrigger: 'focus:shadow-none',
            userButtonPopoverCard: 'z-[100]',
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Mis Cursos"
            labelIcon={<UserCircleIcon className="size-4" />}
            href="/estudiantes/myaccount"
          />
          <UserButton.Link
            label="Mis Certificaciones"
            labelIcon={<AcademicCapIcon className="size-4" />}
            href="/estudiantes/certificados"
          />
          <UserButton.Link
            label="Mis Proyectos"
            labelIcon={<FolderIcon className="size-4" />}
            href="/proyectos/MisProyectos"
          />
        </UserButton.MenuItems>
      </UserButton>
      {/* Badge de planType */}
      {renderPlanBadge()}
    </div>
  );
}
