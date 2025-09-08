'use client';

import { useEffect, useState } from 'react';

import { useUser } from '@clerk/nextjs';

import BuyerInfoForm from '~/components/estudiantes/layout/BuyerInfoForm';
import MiniLoginModal from '~/components/estudiantes/layout/MiniLoginModal';
import { validateFormData } from '~/utils/paygateway/validation';

import type { FormData, Product } from '~/types/payu';

import '~/styles/form.css';

const PaymentForm: React.FC<{
  selectedProduct: Product;
  requireAuthOnSubmit?: boolean;
  redirectUrlOnAuth?: string;
}> = ({
  selectedProduct,
  requireAuthOnSubmit = false,
  redirectUrlOnAuth = '',
}) => {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);

  // Estados locales para email y nombre si no hay usuario autenticado
  const [manualEmail, setManualEmail] = useState('');
  const [manualFullName, setManualFullName] = useState('');

  // Estados para el mini login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Si hay usuario, usar sus datos y bloquear campos; si no, usar los manuales y permitir editar
  const isLoggedIn = !!user;
  const buyerEmail = isLoggedIn
    ? (user.emailAddresses[0]?.emailAddress?.trim().toLowerCase() ?? '')
    : manualEmail;
  const buyerFullName = isLoggedIn ? (user.fullName ?? '') : manualFullName;
  const [telephone, setTelephone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<{
    telephone?: string;
    termsAndConditions?: string;
    privacyPolicy?: string;
  }>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'telephone') setTelephone(value);
    if (name === 'termsAndConditions') setTermsAccepted(checked);
    if (name === 'privacyPolicy') setPrivacyAccepted(checked);

    // Permitir editar email y nombre solo si no hay usuario autenticado
    if (!isLoggedIn) {
      if (name === 'buyerEmail') setManualEmail(value);
      if (name === 'buyerFullName') setManualFullName(value);
    }

    if (showErrors) {
      const newErrors = validateFormData(
        telephone,
        termsAccepted,
        privacyAccepted
      );
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (showErrors) {
      const newErrors = validateFormData(
        telephone,
        termsAccepted,
        privacyAccepted
      );
      setErrors(newErrors);
    }
  }, [telephone, termsAccepted, privacyAccepted, showErrors]);

  const processPayment = async () => {
    setLoading(true);

    try {
      // Determinar el endpoint correcto
      const endpoint = selectedProduct.name.startsWith('Curso:')
        ? '/api/generateCoursePayment'
        : '/api/generatePaymentData';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          amount: selectedProduct.amount,
          description: selectedProduct.description,
          buyerEmail: isLoggedIn ? buyerEmail : manualEmail,
          buyerFullName: isLoggedIn ? buyerFullName : manualFullName,
          telephone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch form data');
      }

      const data: FormData = (await response.json()) as FormData;

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const hiddenField = document.createElement('input');
          hiddenField.type = 'hidden';
          hiddenField.name = key;
          hiddenField.value = String(data[key as keyof FormData]);
          form.appendChild(hiddenField);
        }
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    // Validar formulario primero
    const newErrors = validateFormData(
      telephone,
      termsAccepted,
      privacyAccepted
    );
    if (
      Object.keys(newErrors).length > 0 ||
      !termsAccepted ||
      !privacyAccepted
    ) {
      setErrors(newErrors);
      setShowErrors(true);
      return;
    }

    // Si requiere autenticación y no hay usuario, mostrar modal de login
    if (requireAuthOnSubmit && !isLoggedIn) {
      // Guardar los datos manuales en sessionStorage para recuperarlos después del login
      sessionStorage.setItem('pendingBuyerEmail', manualEmail);
      sessionStorage.setItem('pendingBuyerFullName', manualFullName);
      sessionStorage.setItem('pendingTelephone', telephone);
      sessionStorage.setItem('pendingTermsAccepted', termsAccepted.toString());
      sessionStorage.setItem(
        'pendingPrivacyAccepted',
        privacyAccepted.toString()
      );

      setShowLoginModal(true);
      return;
    }

    // Si está autenticado o no requiere autenticación, procesar el pago
    await processPayment();
  };

  const handleLoginSuccess = async () => {
    setShowLoginModal(false);
    // Procesar el pago después del login exitoso
    await processPayment();
  };

  // Recuperar datos manuales después del login y limpiar sessionStorage
  useEffect(() => {
    if (isLoggedIn && !manualEmail && !manualFullName) {
      const pendingEmail = sessionStorage.getItem('pendingBuyerEmail');
      const pendingFullName = sessionStorage.getItem('pendingBuyerFullName');
      const pendingTelephone = sessionStorage.getItem('pendingTelephone');
      const pendingTermsAccepted = sessionStorage.getItem(
        'pendingTermsAccepted'
      );
      const pendingPrivacyAccepted = sessionStorage.getItem(
        'pendingPrivacyAccepted'
      );

      if (pendingEmail) setManualEmail(pendingEmail);
      if (pendingFullName) setManualFullName(pendingFullName);
      if (pendingTelephone) setTelephone(pendingTelephone ?? '');
      if (pendingTermsAccepted)
        setTermsAccepted(pendingTermsAccepted === 'true');
      if (pendingPrivacyAccepted)
        setPrivacyAccepted(pendingPrivacyAccepted === 'true');

      // Limpiar sessionStorage
      sessionStorage.removeItem('pendingBuyerEmail');
      sessionStorage.removeItem('pendingBuyerFullName');
      sessionStorage.removeItem('pendingTelephone');
      sessionStorage.removeItem('pendingTermsAccepted');
      sessionStorage.removeItem('pendingPrivacyAccepted');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <form className="form">
        <h3 className="payer-info-title">Datos del pagador</h3>
        <BuyerInfoForm
          formData={{ buyerEmail, buyerFullName, telephone }}
          termsAndConditions={termsAccepted}
          privacyPolicy={privacyAccepted}
          onChangeAction={handleInputChange}
          showErrors={showErrors}
          errors={errors}
          onSubmitAction={handleSubmit}
          loading={loading}
          readOnly={isLoggedIn} // Solo lectura si hay usuario autenticado
        />
        {error && <p className="error">{error}</p>}
      </form>

      {/* Mini Login Modal */}
      <MiniLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        redirectUrl={redirectUrlOnAuth}
      />
    </>
  );
};

export default PaymentForm;
